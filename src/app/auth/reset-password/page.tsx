import ResetPasswordForm from "@/app/auth/reset-password/_components/reset-password-form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getForgotPasswordTokenByToken } from "@/data/token";
import { AlertCircle } from "lucide-react";
import Link from "next/link";

type PageProps = { searchParams: { token: string } };

export default async function Page({ searchParams }: PageProps) {
  const verificationToken = await getForgotPasswordTokenByToken(
    searchParams.token
  );

  const isTokenValid =
    verificationToken?.expires &&
    new Date(verificationToken.expires) > new Date();

  return (
    <div className="md:h-auto md:min-w-[420px]">
      {isTokenValid ? (
        <ResetPasswordForm
          email={verificationToken.identifier}
          token={searchParams.token}
        />
      ) : (
        <InvalidTokenState />
      )}
    </div>
  );
}

const InvalidTokenState = () => (
  <Card className="border-destructive">
    <CardHeader>
      <CardTitle className="text-destructive">Invalid Reset Link</CardTitle>
      <CardDescription>
        This password reset link is invalid or has expired.
      </CardDescription>
    </CardHeader>
    <CardContent>
      <Alert variant="destructive" className="border-0">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Unable to Reset Password</AlertTitle>
        <AlertDescription>
          We couldn&apos;t verify your password reset request. This may be
          because:
          <ul className="mt-2 list-inside list-disc">
            <li>The reset link has expired</li>
            <li>The reset link has already been used</li>
            <li>The reset link is invalid</li>
          </ul>
        </AlertDescription>
      </Alert>
    </CardContent>
    <CardFooter className="flex flex-col items-center gap-2">
      <p className="text-sm text-muted-foreground">
        Request a new reset link from the sign-in page.
      </p>
      <Button asChild>
        <Link href="/auth">Back to Sign In</Link>
      </Button>
    </CardFooter>
  </Card>
);
