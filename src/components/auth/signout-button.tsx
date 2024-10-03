"use client";

import { userSignoutAction } from "@/actions/auth/user-signout-action";
import { Button } from "@/components/ui/button";

interface ButtonProps {
  className?: string;
}

export const SignoutButton = (className: ButtonProps) => {
  const clickHandler = async () => {
    await userSignoutAction();
    window.location.href = "/";
  };

  return (
    <Button
      variant="default"
      size="sm"
      onClick={clickHandler}
      className={className.className}
    >
      Sign Out
    </Button>
  );
};
