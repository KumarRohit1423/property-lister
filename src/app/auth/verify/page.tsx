import { emailVerificationAction } from "@/actions/auth/email-verification-action";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getVerificationTokenByToken } from "@/data/token";
import { CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

type PageProps = { searchParams: { token: string } };

export default async function EmailVerificationPage({
  searchParams,
}: PageProps) {
  if (!searchParams.token) {
    redirect("/auth");
  }
  const verificationToken = await getVerificationTokenByToken(
    searchParams.token
  );

  if (!verificationToken?.expires) return <TokenState isValid={false} />;

  const isExpired = new Date(verificationToken.expires) < new Date();

  if (isExpired) return <TokenState isValid={false} />;

  const res = await emailVerificationAction(searchParams.token);

  if (!res.success) return <TokenState isValid={false} />;

  return <TokenState isValid={true} />;
}

const TokenState = ({ isValid }: { isValid: boolean }) => {
  return (
    <div className="flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          {isValid ? (
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          ) : (
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
              <XCircle className="h-8 w-8 text-destructive" />
            </div>
          )}
          <CardTitle className="text-center text-2xl font-bold">
            {isValid ? "Email Verified" : "Verification Failed"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-600">
            {isValid
              ? "Your email has been successfully verified. You can now sign in to your account."
              : "We couldn't verify your email. The verification link may be invalid or expired."}
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button asChild>
            <Link href="/auth">{isValid ? "Sign In" : "Try Again"}</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
