import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { LogIn, Mail, Lock, AlertCircle, User, Settings, LogOut, Shield } from "lucide-react";
import { authService, type AuthUser } from "@/services/authService";
import { NotificationBell } from "@/components/NotificationBell";
import { useToast } from "@/hooks/use-toast";

export function Navigation() {
  const router = useRouter();
  const { toast } = useToast();
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [resetEmail, setResetEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingReset, setIsLoadingReset] = useState(false);

  useEffect(() => {
    // Check for existing session on mount
    authService.getCurrentUser().then(setCurrentUser);

    // Listen to auth state changes
    const { data: authListener } = authService.onAuthStateChange((user) => {
      setCurrentUser(user);
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await authService.signIn(email, password);
      
      toast({
        title: "Welcome back!",
        description: `Signed in as ${result.member?.name || email}`,
      });

      setIsLoginOpen(false);
      setEmail("");
      setPassword("");
      
      // Redirect based on role
      if (result.member?.isAdmin) {
        router.push("/admin/dashboard");
      } else {
        router.push(`/members/${result.member?.id}`);
      }
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message || "Invalid email or password",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoadingReset(true);

    try {
      await authService.resetPassword(resetEmail);
      
      toast({
        title: "Reset email sent",
        description: "Check your inbox for password reset instructions",
      });

      setShowForgotPassword(false);
      setResetEmail("");
    } catch (error: any) {
      toast({
        title: "Reset failed",
        description: error.message || "Could not send reset email",
        variant: "destructive",
      });
    } finally {
      setIsLoadingReset(false);
    }
  };

  const handleLogout = async () => {
    try {
      await authService.signOut();
      
      toast({
        title: "Signed out",
        description: "You have been logged out successfully",
      });

      router.push("/");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Could not sign out",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <nav className="bg-white border-b border-border sticky top-0 z-50">
        <div className="container">
          <div className="flex items-center justify-between h-16">
            <a
              href="https://ciarbkenya.org"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
              <img
                src="/ciarb-kenya-logo.jpg"
                alt="CIArb Kenya"
                className="h-10 w-auto"
              />
            </a>

            {currentUser ? (
              <div className="flex items-center gap-2">
                <NotificationBell userId={currentUser.id} />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center gap-2 hover:bg-muted">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={currentUser.member?.photoUrl || undefined} alt={currentUser.member?.name} />
                        <AvatarFallback className="bg-accent text-white font-sans font-semibold">
                          {currentUser.member?.name?.charAt(0) || currentUser.email.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-sans font-medium text-sm hidden md:inline">
                        {currentUser.member?.name || currentUser.email}
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel className="font-sans">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {currentUser.member?.name || "Member"}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {currentUser.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {currentUser.member && (
                      <DropdownMenuItem onClick={() => router.push(`/members/${currentUser.member?.id}`)} className="font-sans cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        <span>My Profile</span>
                      </DropdownMenuItem>
                    )}
                    {currentUser.member?.isAdmin && (
                      <DropdownMenuItem onClick={() => router.push("/admin/dashboard")} className="font-sans cursor-pointer">
                        <Shield className="mr-2 h-4 w-4" />
                        <span>Admin Dashboard</span>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="font-sans cursor-pointer text-red-600">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Sign Out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <Button 
                onClick={() => setIsLoginOpen(true)}
                className="bg-accent hover:bg-accent/90 text-white font-sans font-semibold rounded-full px-6"
              >
                <LogIn className="w-4 h-4 mr-2" />
                Member Login
              </Button>
            )}
          </div>
        </div>
      </nav>

      <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-sans font-bold text-xl">Member Login</DialogTitle>
            <DialogDescription className="font-sans text-sm text-muted-foreground">
              Access your member profile and update your information
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleLogin} className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="font-sans text-sm font-semibold">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="member@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 font-sans"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="font-sans text-sm font-semibold">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 font-sans"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-accent hover:bg-accent/90 font-sans font-semibold"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>

            <button
              type="button"
              onClick={() => setShowForgotPassword(!showForgotPassword)}
              className="w-full text-center text-sm text-accent hover:text-accent/80 font-sans font-medium transition-colors"
              disabled={isLoading}
            >
              Forgot Password?
            </button>
          </form>

          {showForgotPassword && (
            <div className="mt-4 p-4 bg-muted/30 rounded-lg border border-border space-y-4 animate-in slide-in-from-top-2">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-sans font-semibold text-sm text-foreground mb-1">
                    Reset Your Password
                  </h4>
                  <p className="font-sans text-xs text-muted-foreground">
                    Enter your email address and we'll send you instructions to reset your password.
                  </p>
                </div>
              </div>

              <form onSubmit={handlePasswordReset} className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="reset-email" className="font-sans text-sm font-semibold">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="reset-email"
                      type="email"
                      placeholder="member@example.com"
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      className="pl-10 font-sans"
                      required
                      disabled={isLoadingReset}
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  variant="outline"
                  className="w-full font-sans font-semibold"
                  disabled={isLoadingReset}
                >
                  {isLoadingReset ? "Sending..." : "Send Reset Instructions"}
                </Button>
              </form>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}