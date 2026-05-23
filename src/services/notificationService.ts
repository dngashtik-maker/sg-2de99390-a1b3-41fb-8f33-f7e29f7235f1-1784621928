import { supabase } from "@/integrations/supabase/client";

export interface Notification {
  id: string;
  member_id: string;
  type: "cpd_milestone" | "password_reset" | "profile_update" | "admin_message";
  title: string;
  message: string;
  email_sent: boolean;
  email_sent_at: string | null;
  read: boolean;
  read_at: string | null;
  created_at: string;
}

export const notificationService = {
  /**
   * Get all notifications for the current user
   */
  async getMyNotifications(): Promise<Notification[]> {
    const { data, error } = await supabase
      .from("notifications")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
  },

  /**
   * Get unread notification count for the current user
   */
  async getUnreadCount(): Promise<number> {
    const { count, error } = await supabase
      .from("notifications")
      .select("*", { count: "exact", head: true })
      .eq("read", false);

    if (error) throw error;
    return count || 0;
  },

  /**
   * Mark a notification as read
   */
  async markAsRead(notificationId: string): Promise<void> {
    const { error } = await supabase
      .from("notifications")
      .update({ read: true, read_at: new Date().toISOString() })
      .eq("id", notificationId);

    if (error) throw error;
  },

  /**
   * Mark all notifications as read
   */
  async markAllAsRead(): Promise<void> {
    const { error } = await supabase
      .from("notifications")
      .update({ read: true, read_at: new Date().toISOString() })
      .eq("read", false);

    if (error) throw error;
  },

  /**
   * Create a manual notification (admin only)
   */
  async createNotification(
    memberId: string,
    type: Notification["type"],
    title: string,
    message: string
  ): Promise<void> {
    const { error } = await supabase
      .from("notifications")
      .insert({
        member_id: memberId,
        type,
        title,
        message,
      });

    if (error) throw error;
  },

  /**
   * Subscribe to real-time notification updates
   */
  subscribeToNotifications(callback: (notification: Notification) => void) {
    return supabase
      .channel("notifications")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "notifications",
        },
        (payload) => {
          callback(payload.new as Notification);
        }
      )
      .subscribe();
  },
};