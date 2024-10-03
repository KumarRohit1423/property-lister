"use client";

import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

type ErrorType =
  | "Configuration"
  | "AccessDenied"
  | "Verification"
  | "Default"
  | "OAuthSignin"
  | "OAuthCallback"
  | "OAuthCreateAccount"
  | "EmailCreateAccount"
  | "Callback"
  | "OAuthAccountNotLinked"
  | "EmailSignin"
  | "CredentialsSignin"
  | "SessionRequired";

const errorMap: Record<ErrorType, string> = {
  Configuration:
    "There is a problem with the server configuration. Please contact support if this error persists.",
  AccessDenied: "Access denied. You do not have permission to view this page.",
  Verification: "The verification token has expired or has already been used.",
  Default: "An unexpected error occurred. Please try again later.",
  OAuthSignin:
    "An error occurred while trying to sign in with the OAuth provider.",
  OAuthCallback: "An error occurred while processing the OAuth callback.",
  OAuthCreateAccount:
    "There was a problem creating your account with the OAuth provider.",
  EmailCreateAccount:
    "There was a problem creating your account with the provided email.",
  Callback: "An error occurred during the authentication callback.",
  OAuthAccountNotLinked:
    "This OAuth account is not linked to an existing user account.",
  EmailSignin: "There was a problem sending the email for sign in.",
  CredentialsSignin:
    "The credentials you provided are invalid or the account doesn't exist.",
  SessionRequired: "You must be signed in to view this page.",
};

export default function AuthErrorPage() {
  const search = useSearchParams();
  const errorType = (search.get("error") as ErrorType) || "Default";

  const errorMessage = errorMap[errorType] || errorMap.Default;

  return (
    <div className="flex items-center justify-center p-4">
      <Suspense>
        <Card className="w-full max-w-md">
          <CardHeader className="pb-0">
            <div className="flex justify-center">
              <AlertCircle className="h-16 w-16 text-destructive" />
            </div>
          </CardHeader>
          <CardContent className="text-center">
            <CardTitle className="mb-4 text-2xl font-bold">
              Authentication Error
            </CardTitle>
            <Alert variant="destructive" className="border-0">
              <AlertTitle>{errorMessage}</AlertTitle>
            </Alert>
            <p className="mt-4 text-sm text-muted-foreground">
              Error code:{" "}
              <code className="rounded-sm bg-muted px-1 py-0.5 font-mono text-sm">
                {errorType}
              </code>
            </p>
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <Button asChild className="w-full">
              <Link href="/auth">Try Again</Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href="/">Return to Home</Link>
            </Button>
          </CardFooter>
        </Card>
      </Suspense>
    </div>
  );
}
