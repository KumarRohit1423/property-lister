import { getProperties } from "@/actions/property/property-action";
import PropertyList from "@/app/_components/PropertyList";

export default async function PropertyListing() {
  const result = await getProperties();
  const properties = result?.properties ?? [];
  const total = result?.total ?? 0;
  const error = result?.error;

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">Featured Properties</h1>
      <PropertyList
        initialProperties={properties ?? []}
        initialTotal={total ?? 0}
      />
    </div>
  );
}
