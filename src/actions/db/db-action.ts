"use server";

import { prisma } from "@/prisma";

const generateRandomLocation = () => {
  const cities = [
    "New York",
    "Los Angeles",
    "London",
    "Paris",
    "Tokyo",
    "Dubai",
    "Sydney",
    "Mumbai",
    "Shanghai",
    "Singapore",
  ];
  const neighborhoods = [
    "Downtown",
    "West Village",
    "Beverly Hills",
    "Mayfair",
    "Ginza",
    "Palm Jumeirah",
    "Bondi Beach",
    "Juhu",
    "Pudong",
    "Orchard Road",
  ];
  return `${cities[Math.floor(Math.random() * cities.length)]}, ${neighborhoods[Math.floor(Math.random() * neighborhoods.length)]}`;
};

export default async function populateUp() {
  await prisma.$transaction(async () => {
    await prisma.property.createMany({
      data: Array.from({ length: 100 }, (_, index) => ({
        title: `Luxury Estate in ${generateRandomLocation()}`,
        description: `A stunning ${Math.floor(Math.random() * 10)}-bedroom mansion with ${Math.floor(Math.random() * 10)} bathrooms, ${Math.floor(Math.random() * 10)} acres of land, and breathtaking views.`,
        price: Math.floor(Math.random() * 100000000), // Price in USD
        location: generateRandomLocation(),
        type: index % 2 === 0 ? "sale" : "rent",
        user_rating: Math.floor(Math.random() * 6),
        house_area: Math.floor(Math.random() * 10000), // Area in square feet
      })),
    });
  });
}

export async function populateDown() {
  // Rollback the changes if needed
  await prisma.property.deleteMany();
}
