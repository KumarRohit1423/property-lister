"use client";

import { forgotPasswordAction } from "@/actions/auth/forgot-password-action";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { ForgotPasswordSchema } from "@/schemas/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

export default function PasswordReset() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const form = useForm<z.infer<typeof ForgotPasswordSchema>>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });
  const successData = {
    title: "Pasword Reset Link Sent!",
    description:
      "If there is an account associated with the email you provided, you will receive an email with a link to reset your password.",
    redirectPage: "Back to Sign In",
    redirectPageUrl: "/auth",
  };

  const onSubmit = async (values: z.infer<typeof ForgotPasswordSchema>) => {
    const res = await forgotPasswordAction(values);

    if (res.success) {
      form.reset();
      setOpen(false);
      toast(`Password reset link sent to ${values.email}`);
      router.push(
        `/auth/success?data=${encodeURIComponent(JSON.stringify(successData))}`
      );
    } else {
      switch (res.statusCode) {
        case 400:
          const nestedErrors = res.error.formErrors;

          if (nestedErrors && "email" in nestedErrors) {
            if (
              nestedErrors &&
              typeof nestedErrors === "object" &&
              "email" in nestedErrors
            ) {
              form.setError("email", {
                message: (nestedErrors as { email: string[] }).email[0],
              });
            } else {
              form.setError("email", { message: "Internal Server Error" });
            }
          } else {
            form.setError("email", { message: "Internal Server Error" });
          }
          break;
        case 401:
          form.setError("email", { message: res.error });
          break;
        case 500:
        default:
          const error = res.error || "Internal Server Error";
          form.setError("email", { message: error });
      }
    }
  };

  const FormContent = () => (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          disabled={form.formState.isSubmitting}
          type="submit"
          className="w-full disabled:cursor-not-allowed disabled:bg-muted-foreground"
        >
          {form.formState.isSubmitting ? (
            <Loader className="animate-spin" />
          ) : (
            "Send Link"
          )}
        </Button>
      </form>
    </Form>
  );

  const DesktopDialog = () => (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="link">Forgot Password?</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Reset Password</DialogTitle>
          <DialogDescription>
            Enter your email address and we&apos;ll send you a link to reset
            your password.
          </DialogDescription>
        </DialogHeader>
        <FormContent />
      </DialogContent>
    </Dialog>
  );

  const MobileDrawer = () => (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="link">Forgot Password?</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Reset Password</DrawerTitle>
          <DrawerDescription>
            Enter your email address and we&apos;ll send you a link to reset
            your password.
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-4 pb-8">
          <FormContent />
        </div>
      </DrawerContent>
    </Drawer>
  );

  return isDesktop ? <DesktopDialog /> : <MobileDrawer />;
}
