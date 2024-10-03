import { userSigninAction } from "@/actions/auth/user-signin-action";
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
import { PasswordInput } from "@/components/ui/password-input";
import { UserSignInSchema } from "@/schemas/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

export const SigninCredentialsForm = () => {
  const signInForm = useForm<z.infer<typeof UserSignInSchema>>({
    resolver: zodResolver(UserSignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const router = useRouter();
  const { formState, control, handleSubmit, setError } = signInForm;

  const onSubmit = async (data: z.infer<typeof UserSignInSchema>) => {
    const res = await userSigninAction(data);
    if (res.success) {
      signInForm.reset();
      toast("Sign in successful", {
        description: "Welcome back!",
      });
      router.push("/");
    } else {
      setError("password", { message: res.error });
    }
  };

  return (
    <Form {...signInForm}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder=""
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
                <PasswordInput disabled={formState.isSubmitting} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* {!!error && (
          <div className="mb-6 flex items-center gap-x-2 rounded-md bg-destructive/15 p-3 text-sm text-destructive">
            <FaExclamationCircle className="size-4" />
            <p>{error}</p>
          </div>
        )} */}
        <Button
          disabled={signInForm.formState.isSubmitting}
          type="submit"
          className="w-full disabled:cursor-not-allowed disabled:bg-muted-foreground"
        >
          {signInForm.formState.isSubmitting ? (
            <Loader className="animate-spin" />
          ) : (
            "Continue"
          )}
        </Button>
      </form>
    </Form>
  );
};
