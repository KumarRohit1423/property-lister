"use client";

import { magiclinkSigninAction } from "@/actions/auth/magiclink-signin-action";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { EmailSchema } from "@/schemas/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  email: EmailSchema,
});

export default function MagicLinkForm() {
  const successData = {
    title: "Link sent successfully!",
    description:
      "If there is an account associated with this email, you will receive a magic link to sign in.",
  };
  const serializedData = JSON.stringify(successData);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const { handleSubmit, formState, control, setError } = form;
  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await magiclinkSigninAction(values);
      form.reset();
      router.push(`/auth/success?data=${encodeURIComponent(serializedData)}`);
    } catch (error) {
      console.log(error);
      setError("email", {
        message: "An unexpected error occurred. Please try again.",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your email"
                  disabled={formState.isSubmitting}
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
            "Send Magic Link"
          )}
        </Button>
        {/* {error && (
          <div className="flex items-center gap-x-2 rounded-md bg-destructive/15 p-3 text-sm text-destructive">
            <FaExclamationCircle className="h-4 w-4" />
            <p>{error}</p>
          </div>
        )} */}
        {/* {success && (
          <Alert>
            <AlertDescription>
              If there&apos;s an account associated with this email,
              you&apos;ll receive a magic link to sign in.
            </AlertDescription>
          </Alert>
        )} */}
      </form>
    </Form>
  );
}
