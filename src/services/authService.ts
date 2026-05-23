import { supabase } from "@/integrations/supabase/client";

export interface AuthUser {
  id: string;
  email: string;
  member?: {
    id: string;
    name: string;
    isAdmin: boolean;
    photoUrl: string | null;
  };
}

export const authService = {
  /**
   * Sign in with email and password
   */
  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    // Fetch member profile
    if (data.user) {
      const member = await this.getMemberProfile(data.user.id);
      return {
        user: data.user,
        session: data.session,
        member,
      };
    }

    return { user: data.user, session: data.session, member: null };
  },

  /**
   * Sign out current user
   */
  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  /**
   * Send password reset email
   */
  async resetPassword(email: string) {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) throw error;
  },

  /**
   * Update password (for logged-in users)
   */
  async updatePassword(newPassword: string) {
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });
    if (error) throw error;
  },

  /**
   * Get current session
   */
  async getSession() {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;
    return data.session;
  },

  /**
   * Get current user
   */
  async getCurrentUser(): Promise<AuthUser | null> {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error || !user) return null;

    const member = await this.getMemberProfile(user.id);

    return {
      id: user.id,
      email: user.email!,
      member: member || undefined,
    };
  },

  /**
   * Get member profile by user_id
   */
  async getMemberProfile(userId: string) {
    const { data, error } = await supabase
      .from("members")
      .select("id, name, is_admin, photo_url")
      .eq("user_id", userId)
      .single();

    if (error || !data) return null;

    return {
      id: data.id,
      name: data.name,
      isAdmin: data.is_admin || false,
      photoUrl: data.photo_url,
    };
  },

  /**
   * Listen to auth state changes
   */
  onAuthStateChange(callback: (user: AuthUser | null) => void) {
    return supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const member = await this.getMemberProfile(session.user.id);
        callback({
          id: session.user.id,
          email: session.user.email!,
          member: member || undefined,
        });
      } else {
        callback(null);
      }
    });
  },
};