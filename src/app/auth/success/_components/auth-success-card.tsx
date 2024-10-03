import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface SuccessPageProps {
  title?: string;
  description?: string;
  redirectPage?: string;
  redirectPageUrl?: string;
}

export default function AuthSuccessCard({
  title,
  description,
  redirectPage,
  redirectPageUrl,
}: SuccessPageProps) {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <CardTitle className="text-center text-2xl font-bold">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-center text-gray-600">{description}</p>
      </CardContent>
      {redirectPage && redirectPageUrl && (
        <CardFooter className="flex justify-center">
          <Button asChild>
            <Link href={redirectPageUrl}>{redirectPage}</Link>
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
