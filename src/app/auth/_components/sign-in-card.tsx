import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SignInFlow } from "@/lib/types";
import { SigninCredentialsForm } from "@/app/auth/_components/signin-credentials-form";
import MagicLinkForm from "@/app/auth/_components/magic-link-form";
import OAuthForm from "@/app/auth/_components/oauth-form";
import PasswordReset from "@/app/auth/_components/password-reset-dialog";

type AuthMethod = "initial" | "credentials" | "magic";
interface SignInCardProps {
  setState: (state: SignInFlow) => void;
}

export const SignInCard = ({ setState }: SignInCardProps) => {
  const [authMethod, setAuthMethod] = useState<AuthMethod>("initial");

  const renderForm = () => {
    switch (authMethod) {
      case "credentials":
        return <SigninCredentialsForm />;
      case "magic":
        return <MagicLinkForm />;
      default:
        return (
          <div className="space-y-4">
            <Button
              className="w-full"
              onClick={() => setAuthMethod("credentials")}
            >
              Sign in with Credentials
            </Button>
            <Button className="w-full" onClick={() => setAuthMethod("magic")}>
              Sign in with Magic Link
            </Button>
          </div>
        );
    }
  };

  return (
    <Card className="mx-auto w-full max-w-lg p-8">
      <CardHeader className="px-0 pt-0">
        <CardTitle>Sign In</CardTitle>
        <CardDescription>Choose your preferred sign-in method</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2.5 px-0 pb-0">
        {renderForm()}
        <div className="flex items-center justify-between">
          <div className="flex-grow">
            {authMethod !== "initial" && (
              <Button
                variant="link"
                className="w-full"
                onClick={() => setAuthMethod("initial")}
              >
                Back to options
              </Button>
            )}
          </div>
          {authMethod === "credentials" && (
            <div className="flex-grow">
              <PasswordReset />
            </div>
          )}
        </div>

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
          Don&apos;t have an account?{" "}
          <span
            onClick={() => setState("signUp")}
            className="cursor-pointer text-sky-700 hover:underline"
          >
            Sign up
          </span>
        </p>
      </CardContent>
    </Card>
  );
};

export default SignInCard;
