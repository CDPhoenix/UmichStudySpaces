import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Footer } from "@/components/Footer";
import { SignInButton, SignUpButton, SignedIn, SignedOut } from "@clerk/clerk-react";

export default function Auth() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-umich-blue/5 via-background to-accent/5 p-4">
      <Card className="w-full max-w-md shadow-xl border-gray-200">
        <CardHeader className="space-y-4 text-center pb-6">
          <div className="mx-auto mb-2 h-16 w-16 rounded-full bg-umich-blue flex items-center justify-center shadow-md">
            <span className="text-3xl font-bold text-accent">M</span>
          </div>
          <CardTitle className="text-2xl font-display text-umich-blue">
            Welcome to Study Spaces
          </CardTitle>
          <CardDescription className="text-base text-gray-600">
            Sign in to save your favorite study spaces and leave reviews
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <SignedOut>
            <SignInButton mode="modal">
              <Button className="w-full h-11 bg-umich-blue hover:bg-umich-blue-light text-white font-semibold transition-all">
                Sign In
              </Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button 
                variant="outline"
                className="w-full h-11 border-umich-blue text-umich-blue hover:bg-umich-blue/10 font-semibold transition-all"
              >
                Create Account
              </Button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <div className="text-center">
              <p className="text-muted-foreground mb-4">You are already signed in!</p>
              <Button onClick={() => navigate("/")} className="bg-umich-blue hover:bg-umich-blue-light">
                Go to Home
              </Button>
            </div>
          </SignedIn>
          <div className="mt-6 text-center text-sm text-muted-foreground">
            <p>By signing in, you agree to our terms of service and privacy policy.</p>
          </div>
        </CardContent>
      </Card>

      <Footer />
    </div>
  );
}
