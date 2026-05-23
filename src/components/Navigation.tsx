import React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { LogIn, Mail, Lock, AlertCircle } from "lucide-react";

export function Navigation() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [resetEmail, setResetEmail] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual login logic
    console.log("Login attempt:", { email, password });
  };

  const handlePasswordReset = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement password reset logic
    console.log("Password reset for:", resetEmail);
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

            <Button 
              onClick={() => setIsLoginOpen(true)}
              className="bg-accent hover:bg-accent/90 text-white font-sans font-semibold rounded-full px-6"
            >
              <LogIn className="w-4 h-4 mr-2" />
              Member Login
            </Button>
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
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-accent hover:bg-accent/90 font-sans font-semibold"
            >
              Sign In
            </Button>

            <button
              type="button"
              onClick={() => setShowForgotPassword(!showForgotPassword)}
              className="w-full text-center text-sm text-accent hover:text-accent/80 font-sans font-medium transition-colors"
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
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  variant="outline"
                  className="w-full font-sans font-semibold"
                >
                  Send Reset Instructions
                </Button>
              </form>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}