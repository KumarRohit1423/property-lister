"use client";

import { useState } from "react";
import { SignInFlow } from "@/lib/types";
import { SignInCard } from "@/app/auth/_components/sign-in-card";
import { SignUpCard } from "@/app/auth/_components/sign-up-card";

export const AuthScreen = () => {
  const [state, setState] = useState<SignInFlow>("signIn");

  return (
    <div className="flex items-center justify-center">
      <div className="shadow-[rgba(100,100,111,0.2)_0px_7px_29px_0px] md:h-auto md:min-w-[420px]">
        {state === "signIn" ? (
          <SignInCard setState={setState} />
        ) : (
          <SignUpCard setState={setState} />
        )}
      </div>
    </div>
  );
};
