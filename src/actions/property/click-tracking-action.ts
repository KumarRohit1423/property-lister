import { prisma } from "@/prisma";

export async function trackView(userId: string, propertyId: string) {
  await prisma.viewedProperty.upsert({
    where: {
      userId_propertyId: { userId, propertyId },
    },
    update: {
      viewedAt: new Date(),
    },
    create: {
      userId,
      propertyId,
    },
  });
}
