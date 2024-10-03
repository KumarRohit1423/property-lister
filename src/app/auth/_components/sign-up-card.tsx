import OAuthForm from "@/app/auth/_components/oauth-form";
import { SignupCredentialsForm } from "@/app/auth/_components/signup-credentials-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SignInFlow } from "@/lib/types";
import { useState } from "react";

type AuthMethod = "initial" | "credentials";
interface SignInCardProps {
  setState: (state: SignInFlow) => void;
}

export const SignUpCard = ({ setState }: SignInCardProps) => {
  const [authMethod, setAuthMethod] = useState<AuthMethod>("initial");

  const renderForm = () => {
    switch (authMethod) {
      case "credentials":
        return <SignupCredentialsForm />;
      default:
        return (
          <div className="space-y-4">
            <Button
              className="w-full"
              onClick={() => setAuthMethod("credentials")}
            >
              Sign up with Credentials
            </Button>
          </div>
        );
    }
  };

  return (
    <Card className="mx-auto w-full max-w-lg p-8">
      <CardHeader className="px-0 pt-0">
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>Choose your preferred sign-up method</CardDescription>
      </CardHeader>
      <CardContent className="space-y-5 px-0 pb-0">
        {renderForm()}
        {authMethod !== "initial" && (
          <Button
            variant="link"
            className="mt-4 w-full"
            onClick={() => setAuthMethod("initial")}
          >
            Back to options
          </Button>
        )}
        {authMethod === "initial" && (
          <>
            <div className="my-2 flex items-center">
              <div className="flex-grow border-t" />
              <div className="mx-2 text-muted-foreground">or</div>
              <div className="flex-grow border-t" />
            </div>
            <OAuthForm />
          </>
        )}
        <p className="text-center text-xs text-muted-foreground">
          Already have an account?{" "}
          <span
            onClick={() => setState("signIn")}
            className="cursor-pointer text-sky-700 hover:underline"
          >
            Sign in
          </span>
        </p>
      </CardContent>
    </Card>
  );
};

export default SignUpCard;
