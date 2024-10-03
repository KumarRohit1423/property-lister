import { oauthSignin } from "@/actions/auth/oauth-signin-action";
import { Button } from "@/components/ui/button";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const OAuthForm = () => {
  const handleOnClick = async (provider: "google" | "github") => {
    await oauthSignin(provider);
  };

  return (
    <div className="flex flex-col gap-y-2.5">
      <Button
        className="w-full gap-2"
        size="lg"
        disabled={false}
        onClick={() => handleOnClick("google")}
        variant="outline"
      >
        <FcGoogle className="size-7" />
        Continue with Google
      </Button>
      <Button
        className="w-full gap-2"
        size="lg"
        disabled={false}
        onClick={() => handleOnClick("github")}
        variant="outline"
      >
        <FaGithub className="size-7" />
        Continue with GitHub
      </Button>
    </div>
  );
};

export default OAuthForm;
