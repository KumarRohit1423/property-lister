import LuxuryPropertyImage from "@/assets/PropertyImage.jpg";

import { trackView } from "@/actions/property/click-tracking-action";
import { getPropertyById } from "@/actions/property/property-action";
import { auth } from "@/auth";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Calendar, Home, MapPin, Ruler, Star } from "lucide-react";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";

export default async function PropertyPage({
  params,
}: {
  params: { id: string };
}) {
  const result = await getPropertyById(params.id);
  if (!result || !result.property) {
    notFound();
  }
  const { property, error } = result;

  if (error || !property) {
    notFound();
  }
  const session = await auth();
  if (!session || !session.user.id) {
    redirect("/auth");
  }
  await trackView(session.user.id, params.id);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="lg:flex lg:space-x-8">
        <div className="mb-8 lg:mb-0 lg:w-1/2">
          <Card className="overflow-hidden">
            <div className="relative aspect-video lg:aspect-square">
              <Image
                src={LuxuryPropertyImage}
                alt={property.title}
                fill
                className="object-cover"
              />
              <Badge
                variant={property.type === "sale" ? "default" : "secondary"}
                className="absolute right-4 top-4 px-3 py-1 text-lg"
              >
                {property.type === "sale" ? "For Sale" : "For Rent"}
              </Badge>
            </div>
          </Card>
        </div>
        <div className="lg:w-1/2">
          <Card>
            <CardHeader>
              <div className="space-y-2">
                <CardTitle className="text-3xl">{property.title}</CardTitle>
                <CardDescription className="text-lg">
                  <MapPin className="mr-1 inline" size={18} />
                  {property.location}
                </CardDescription>
                <div className="text-3xl font-bold">
                  ${property.price.toLocaleString()}
                  {property.type === "rent" && (
                    <span className="text-xl font-normal">/month</span>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-6 grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <Home className="mr-2" />
                  <div>
                    <div className="text-sm text-muted-foreground">Type</div>
                    <div className="font-semibold capitalize">
                      {property.type}
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Ruler className="mr-2" />
                  <div>
                    <div className="text-sm text-muted-foreground">Area</div>
                    <div className="font-semibold">
                      {property.house_area} sqft
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Star className="mr-2" />
                  <div>
                    <div className="text-sm text-muted-foreground">Rating</div>
                    <div className="font-semibold">
                      {property.user_rating}/5
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Calendar className="mr-2" />
                  <div>
                    <div className="text-sm text-muted-foreground">
                      Available From
                    </div>
                    <div className="font-semibold">Immediately</div>
                  </div>
                </div>
              </div>
              <Separator className="my-6" />
              <div>
                <h3 className="mb-2 text-xl font-semibold">Description</h3>
                <p className="text-muted-foreground">{property.description}</p>
              </div>
              <Separator className="my-6" />
              <div>
                <h3 className="mb-4 text-xl font-semibold">Features</h3>
                <ul className="grid grid-cols-2 gap-2">
                  {[
                    "Air Conditioning",
                    "Parking",
                    "Swimming Pool",
                    "Garden",
                    "Security System",
                    "Internet",
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="mr-2 h-5 w-5 text-green-500"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4 sm:flex-row">
              <Button className="w-full sm:w-auto">Schedule a Visit</Button>
              <Button variant="outline" className="w-full sm:w-auto">
                Contact Agent
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
