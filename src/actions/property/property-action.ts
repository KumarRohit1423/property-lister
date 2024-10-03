"use server";

import { prisma } from "@/prisma";

export async function getProperties(page = 1, limit = 9) {
  try {
    const properties = await prisma.property.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        id: "desc",
      },
    });
    const total = await prisma.property.count();
    return { properties, total };
  } catch (error) {
    return { error: "Failed to fetch properties" };
  }
}

export async function getPropertyById(id: string) {
  try {
    const property = await prisma.property.findUnique({
      where: { id },
    });
    return { property };
  } catch (error) {
    return { error: "Failed to fetch property" };
  }
}
