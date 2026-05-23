import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";

export function Navigation() {
  return (
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

          <Link href="/login">
            <Button className="bg-accent hover:bg-accent/90 text-white font-sans font-semibold rounded-full px-6">
              <LogIn className="w-4 h-4 mr-2" />
              Member Login
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}