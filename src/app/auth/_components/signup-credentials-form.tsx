import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
// import { useState } from 'react';
// import { FaExclamationCircle } from 'react-icons/fa';
import { credentialSignupAction } from "@/actions/auth/credential-signup-action";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { UserSignUpSchema } from "@/schemas/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
// import Link from 'next/link';
import { toast } from "sonner";

export const SignupCredentialsForm = () => {
  // const [success, setSuccess] = useState(false);
  const router = useRouter();
  const successData = {
    title: "Account Created Successfully!",
    description:
      "Your account has been created. Please check your email for a verification link to activate your account.",
    redirectPage: "Back to Sign In",
    redirectPageUrl: "/auth",
  };
  const serializedData = JSON.stringify(successData);
  const signUpForm = useForm<z.infer<typeof UserSignUpSchema>>({
    resolver: zodResolver(UserSignUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const { formState, control, handleSubmit, setError } = signUpForm;
  const onSubmit = async (data: z.infer<typeof UserSignUpSchema>) => {
    // setSuccess(false);
    const res = await credentialSignupAction(data);
    if (res.success) {
      signUpForm.reset();
      toast("Account created successfully", {
        description: "Check your email for verification link",
      });
      // setSuccess(res.success);
      router.push(`auth/success?data=${encodeURIComponent(serializedData)}`);
    } else {
      switch (res.statusCode) {
        case 400:
          const nestedErrors = res.error.formErrors;
          for (const key in nestedErrors) {
            setError(key as keyof z.infer<typeof UserSignUpSchema>, {
              message: nestedErrors[key]?.[0],
            });
          }
          break;
        case 500:
        default:
          const error = res.error || "Internal Server Error";
          setError("confirmPassword", { message: error });
      }
    }
    // console.log(data);
  };
  return (
    <Form {...signUpForm}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2.5 px-0 pb-0">
        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  {...field}
                  disabled={formState.isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  {...field}
                  disabled={formState.isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput {...field} disabled={formState.isSubmitting} />
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
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <PasswordInput {...field} disabled={formState.isSubmitting} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* {!!signUpForm.erro && (
          <div className="mb-6 flex items-center gap-x-2 rounded-md bg-destructive/15 p-3 text-sm text-destructive">
            <FaExclamationCircle className="size-4" />
            <p>{error}</p>
          </div>
        )} */}
        <Button
          disabled={formState.isSubmitting}
          type="submit"
          className="w-full disabled:cursor-not-allowed disabled:bg-muted-foreground"
        >
          {formState.isSubmitting ? (
            <Loader className="animate-spin" />
          ) : (
            "Continue"
          )}
        </Button>
      </form>
    </Form>
  );
};
