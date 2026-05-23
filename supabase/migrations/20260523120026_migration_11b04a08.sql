-- Create members table
CREATE TABLE IF NOT EXISTS members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  credentials text NOT NULL,
  role text NOT NULL,
  company text NOT NULL,
  country text NOT NULL,
  primary_branch text NOT NULL,
  category text NOT NULL CHECK (category IN ('Staff', 'Board', 'Volunteer')),
  email text NOT NULL UNIQUE,
  phone text,
  photo_url text,
  join_date date NOT NULL DEFAULT CURRENT_DATE,
  status text NOT NULL DEFAULT 'Active' CHECK (status IN ('Active', 'Inactive')),
  cpd_points jsonb DEFAULT '{"2024": 0, "2025": 0}'::jsonb,
  bio text,
  committees text[],
  skills text[],
  is_admin boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE members ENABLE ROW LEVEL SECURITY;

-- Members can view all active members (public directory)
CREATE POLICY "Anyone can view active members"
  ON members FOR SELECT
  USING (status = 'Active');

-- Members can update their own profile
CREATE POLICY "Members can update own profile"
  ON members FOR UPDATE
  USING (auth.uid() = user_id);

-- Admins can do everything
CREATE POLICY "Admins can do everything"
  ON members FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM members
      WHERE user_id = auth.uid() AND is_admin = true
    )
  );

-- Create index on user_id for faster lookups
CREATE INDEX IF NOT EXISTS members_user_id_idx ON members(user_id);
CREATE INDEX IF NOT EXISTS members_email_idx ON members(email);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_members_updated_at
  BEFORE UPDATE ON members
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();