-- Create notifications table for CPD milestones and other alerts
CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  member_id uuid REFERENCES members(id) ON DELETE CASCADE,
  type text NOT NULL CHECK (type IN ('cpd_milestone', 'password_reset', 'profile_update', 'admin_message')),
  title text NOT NULL,
  message text NOT NULL,
  email_sent boolean DEFAULT false,
  email_sent_at timestamptz,
  read boolean DEFAULT false,
  read_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_notifications_member_id ON notifications(member_id);
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON notifications(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_notifications_email_sent ON notifications(email_sent) WHERE email_sent = false;

-- Enable RLS
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Members can view their own notifications
CREATE POLICY "Members can view own notifications"
  ON notifications FOR SELECT
  USING (
    member_id IN (
      SELECT id FROM members WHERE user_id = auth.uid()
    )
  );

-- Members can mark their own notifications as read
CREATE POLICY "Members can update own notifications"
  ON notifications FOR UPDATE
  USING (
    member_id IN (
      SELECT id FROM members WHERE user_id = auth.uid()
    )
  );

-- System can insert notifications (via service role)
CREATE POLICY "System can insert notifications"
  ON notifications FOR INSERT
  WITH CHECK (true);

-- Function to check CPD milestones and create notifications
CREATE OR REPLACE FUNCTION check_cpd_milestones()
RETURNS TRIGGER AS $$
DECLARE
  total_points integer;
  milestone_values integer[] := ARRAY[50, 100, 150, 200, 250, 300];
  milestone integer;
  notification_exists boolean;
BEGIN
  -- Calculate total CPD points
  SELECT SUM((value)::integer)
  INTO total_points
  FROM jsonb_each_text(NEW.cpd_points);

  -- Check each milestone
  FOREACH milestone IN ARRAY milestone_values
  LOOP
    IF total_points >= milestone THEN
      -- Check if notification already exists for this milestone
      SELECT EXISTS(
        SELECT 1 FROM notifications
        WHERE member_id = NEW.id
        AND type = 'cpd_milestone'
        AND title = 'CPD Milestone: ' || milestone || ' Points Achieved!'
      ) INTO notification_exists;

      -- Create notification if it doesn't exist
      IF NOT notification_exists THEN
        INSERT INTO notifications (member_id, type, title, message)
        VALUES (
          NEW.id,
          'cpd_milestone',
          'CPD Milestone: ' || milestone || ' Points Achieved!',
          'Congratulations ' || NEW.name || '! You have reached ' || milestone || ' CPD points. Your total is now ' || total_points || ' points. Keep up the excellent professional development work!'
        );
      END IF;
    END IF;
  END LOOP;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to check milestones when CPD points are updated
DROP TRIGGER IF EXISTS trigger_check_cpd_milestones ON members;
CREATE TRIGGER trigger_check_cpd_milestones
  AFTER INSERT OR UPDATE OF cpd_points ON members
  FOR EACH ROW
  EXECUTE FUNCTION check_cpd_milestones();

-- Function to get pending email notifications (for background job/cron)
CREATE OR REPLACE FUNCTION get_pending_email_notifications()
RETURNS TABLE (
  notification_id uuid,
  member_email text,
  member_name text,
  notification_type text,
  notification_title text,
  notification_message text
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    n.id,
    m.email,
    m.name,
    n.type,
    n.title,
    n.message
  FROM notifications n
  JOIN members m ON n.member_id = m.id
  WHERE n.email_sent = false
  AND n.created_at > now() - interval '7 days'
  ORDER BY n.created_at ASC
  LIMIT 100;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to mark notification as email sent
CREATE OR REPLACE FUNCTION mark_notification_email_sent(notification_id uuid)
RETURNS void AS $$
BEGIN
  UPDATE notifications
  SET email_sent = true, email_sent_at = now()
  WHERE id = notification_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;