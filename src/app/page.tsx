import PropertyListing from "@/app/_components/PropertyListing";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();
  if (!session || !session.user.id) {
    redirect("/auth");
  }

  return (
    <>
      <PropertyListing />
    </>
  );
}
