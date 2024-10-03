// import { getAllEvents } from "@/data/event";
import PropertyListing from "@/app/_components/PropertyListing";
import { SearchParamProps } from "@/types";

export default async function Home({ searchParams }: SearchParamProps) {
  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams?.query as string) || "";
  const category = (searchParams?.category as string) || "";
  // const session = await auth();
  // if (!session) {
  //   redirect("/auth");
  // }

  return (
    <>
      <PropertyListing />
      {/* <Button onClick={() => populateUp()}>Populate</Button> */}
      {/* <SampleProperties />
      <RecommendedProperties /> */}
    </>
  );
}
