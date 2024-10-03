"use client";

import { getProperties } from "@/actions/property/property-action";
import PropertyCard from "@/components/shared/PropertyCard";
import { Property } from "@/types";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

type PropertyListProps = {
  initialProperties: Property[];
  initialTotal: number;
};

export default function PropertyList({
  initialProperties,
  initialTotal,
}: PropertyListProps) {
  const [properties, setProperties] = useState(initialProperties);
  const [page, setPage] = useState(1);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [total, setTotal] = useState(initialTotal);
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView && properties.length < total) {
      loadMoreProperties();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, properties.length, total]);

  const loadMoreProperties = async () => {
    const nextPage = page + 1;
    const result = await getProperties(nextPage);
    if (result && result.properties) {
      setProperties((prevProperties) => [
        ...prevProperties,
        ...result.properties,
      ]);
      setPage(nextPage);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
      {properties.length < total && (
        <div ref={ref} className="mt-8 flex justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-gray-900"></div>
        </div>
      )}
    </>
  );
}
