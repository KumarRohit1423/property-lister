"use client";

import AuthSuccessCard from "@/app/auth/success/_components/auth-success-card";
import { redirect, useSearchParams } from "next/navigation";

export default function AuthSuccessPage() {
  const searchParams = useSearchParams();

  const jsonString = searchParams.get("data");

  const data = jsonString ? JSON.parse(decodeURIComponent(jsonString)) : null;
  if (!data || !data.title || !data.description) {
    redirect("/auth");
  }
  return (
    <div className="flex items-center justify-center">
      <AuthSuccessCard
        title={data.title}
        description={data.description}
        redirectPage={data.redirectPage}
        redirectPageUrl={data.redirectPageUrl}
      />
    </div>
  );
}
