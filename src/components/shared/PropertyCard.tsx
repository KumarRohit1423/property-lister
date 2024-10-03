import LuxuryPropertyImage from "@/assets/PropertyImage.jpg";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { MapPin, Ruler, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Property = {
  id: string;
  title: string;
  description: string | null;
  price: number;
  location: string;
  type: "sale" | "rent";
  user_rating: number;
  house_area: number;
};

export default function PropertyCard({ property }: { property: Property }) {
  return (
    <Link href={`/${property.id}`} className="group">
      <Card className="overflow-hidden transition-shadow hover:shadow-lg">
        <div className="relative aspect-video">
          <Image
            src={LuxuryPropertyImage}
            alt={property.title}
            fill
            className="object-cover"
            loading="lazy"
          />
          <Badge
            variant={property.type === "sale" ? "default" : "secondary"}
            className="absolute right-2 top-2"
          >
            {property.type === "sale" ? "For Sale" : "For Rent"}
          </Badge>
        </div>
        <CardContent className="p-4">
          <h3 className="line-clamp-1 text-lg font-semibold group-hover:underline">
            {property.title}
          </h3>
          <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
            {property.description}
          </p>
          <div className="mt-2 flex items-center text-sm">
            <MapPin className="mr-1 h-4 w-4" />
            <span className="line-clamp-1">{property.location}</span>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <div className="flex items-center text-sm">
              <Ruler className="mr-1 h-4 w-4" />
              <span>{property.house_area} sqft</span>
            </div>
            <div className="flex items-center text-sm">
              <Star className="mr-1 h-4 w-4 text-yellow-400" />
              <span>{property.user_rating}/5</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <div className="text-lg font-bold">
            ${property.price.toLocaleString()}
          </div>
          {property.type === "rent" && (
            <span className="text-sm text-muted-foreground">/month</span>
          )}
        </CardFooter>
      </Card>
    </Link>
  );
}
