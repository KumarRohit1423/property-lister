'use client'

import { getProperties } from '@/actions/property/property-action'
import PropertyCard from '@/components/shared/PropertyCard'
import { Property } from '@/types'
import { useState, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

type PropertyListProps = {
  initialProperties: Property[]
  initialTotal: number
}

export default function PropertyList({ initialProperties, initialTotal }: PropertyListProps) {
  const [properties, setProperties] = useState<Property[]>(initialProperties)
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(initialTotal)
  const [ref, inView] = useInView()

  useEffect(() => {
    if (inView && properties.length < total) {
      loadMoreProperties()
    }
  }, [inView, properties.length, total])

  const loadMoreProperties = async () => {
    const nextPage = page + 1
    const { properties: newProperties } = await getProperties(nextPage)
    if (newProperties) {
      setProperties((prevProperties) => [...prevProperties, ...newProperties])
      setPage(nextPage)
    }
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
      {properties.length < total && (
        <div ref={ref} className="flex justify-center mt-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      )}
    </>
  )
}
