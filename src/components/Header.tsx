import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { User, LogOut, Plus, Info, Menu, X } from "lucide-react";
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/clerk-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function Header() {
  const navigate = useNavigate();
  const { user } = useUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b shadow-md bg-primary" style={{ boxShadow: '0 4px 12px rgba(0, 39, 76, 0.12)' }}>
      <div className="container flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center space-x-2 sm:space-x-3 transition-opacity hover:opacity-100 opacity-90">
          <div className="text-xl sm:text-2xl">〽️</div>
          <span className="text-lg sm:text-xl font-bold text-accent font-display">
            <span className="hidden sm:inline">Study Spaces Explorer</span>
            <span className="sm:hidden">Study Spaces</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/about")}
            className="text-white hover:bg-accent/15 hover:text-accent font-medium transition-fast px-4 lg:px-5 py-2 rounded-md opacity-90 hover:opacity-100"
          >
            <Info className="mr-2 h-4 w-4" />
            <span className="hidden lg:inline">About</span>
          </Button>
          <SignedIn>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/submit")}
              className="text-white hover:bg-accent/15 hover:text-accent font-medium transition-fast px-4 lg:px-5 py-2 rounded-md opacity-90 hover:opacity-100"
            >
              <Plus className="mr-2 h-4 w-4" />
              <span className="hidden lg:inline">Submit Space</span>
              <span className="lg:hidden">Submit</span>
            </Button>
            <UserButton 
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  userButtonPopoverCard: "bg-white",
                  userButtonPopoverActions: "text-gray-700",
                }
              }}
            />
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal">
              <Button
                variant="ghost"
                size="sm"
                className="text-white bg-accent/20 border border-accent hover:bg-accent/30 hover:text-accent font-medium transition-fast px-4 lg:px-5 py-2 rounded-md"
              >
                <User className="mr-2 h-4 w-4" />
                <span className="hidden lg:inline">Sign In</span>
                <span className="lg:hidden">Sign In</span>
              </Button>
            </SignInButton>
          </SignedOut>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          <SignedIn>
            <UserButton 
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  userButtonPopoverCard: "bg-white",
                  userButtonPopoverActions: "text-gray-700",
                }
              }}
            />
          </SignedIn>
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-accent/15 hover:text-accent"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] bg-white">
              <nav className="flex flex-col gap-4 mt-8">
                <Button
                  variant="ghost"
                  onClick={() => {
                    navigate("/about");
                    setMobileMenuOpen(false);
                  }}
                  className="justify-start text-left w-full"
                >
                  <Info className="mr-2 h-4 w-4" />
                  About
                </Button>
                <SignedIn>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      navigate("/submit");
                      setMobileMenuOpen(false);
                    }}
                    className="justify-start text-left w-full"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Submit Space
                  </Button>
                </SignedIn>
                <SignedOut>
                  <SignInButton mode="modal">
                    <Button
                      variant="ghost"
                      onClick={() => setMobileMenuOpen(false)}
                      className="justify-start text-left w-full"
                    >
                      <User className="mr-2 h-4 w-4" />
                      Sign In
                    </Button>
                  </SignInButton>
                </SignedOut>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
