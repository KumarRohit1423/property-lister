import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authentication | Easy Events",
  description: "Sign in or Register to Easy Events",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-full items-center justify-center bg-background">
      <div className="w-full max-w-md p-8">{children}</div>
    </div>
  );
}
