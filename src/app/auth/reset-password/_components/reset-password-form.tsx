"use client";
import { resetPasswordAction } from "@/actions/auth/reset-password-action";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PasswordInput } from "@/components/ui/password-input";
import { ResetPasswordSchema } from "@/schemas/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

type ResetPasswordFormProps = { email: string; token: string };

export default function ResetPasswordForm({
  email,
  token,
}: ResetPasswordFormProps) {
  const router = useRouter();
  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });
  const successData = {
    title: "Password Reset Successfully!",
    description: "Your password has been reset successfully.",
    redirectPage: "Back to Sign In",
    redirectPageUrl: "/auth",
  };

  const { handleSubmit, control, formState, setError } = form;

  const onSubmit = async (values: z.infer<typeof ResetPasswordSchema>) => {
    const res = await resetPasswordAction(email, token, values);

    if (res.success) {
      form.reset();
      toast("Password reset successfully");
      router.push(
        `/auth/success?data=${encodeURIComponent(JSON.stringify(successData))}`
      );
    } else {
      switch (res.statusCode) {
        case 400:
          const nestedErrors = res.error.formErrors;
          for (const key in nestedErrors) {
            setError(key as keyof z.infer<typeof ResetPasswordSchema>, {
              message: nestedErrors[key]?.[0],
            });
          }
          break;
        case 401:
          setError("confirmPassword", { message: res.error });
          break;
        case 500:
        default:
          const error = res.error || "Internal Server Error";
          setError("confirmPassword", { message: error });
      }
    }
  };

  return (
    <Card className="mx-auto w-full max-w-lg p-4">
      <CardHeader>
        <CardTitle>Reset Password</CardTitle>
        <CardDescription>Enter your new password below.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <PasswordInput
                      type="password"
                      placeholder="Enter new password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm New Password</FormLabel>
                  <FormControl>
                    <PasswordInput
                      type="password"
                      placeholder="Confirm new password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={formState.isSubmitting}
              type="submit"
              className="w-full disabled:cursor-not-allowed disabled:bg-muted-foreground"
            >
              {formState.isSubmitting ? (
                <Loader className="animate-spin" />
              ) : (
                "Reset Password"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground">
          Remember your password?{" "}
          <Button variant="link">
            <Link href="/auth">Sign in</Link>
          </Button>
        </p>
      </CardFooter>
    </Card>
  );
}
