import { NextResponse } from "next/server";

import prisma from "@/lib/prismadb";
import getUser from "@/lib/getUser";

export async function POST(request: Request) {
  const user = await getUser();

  if (!user) {
    return NextResponse.json({ status: "failed" });
  }

  const body = await request.json();
  const {
    title,
    description,
    imageSrc,
    category,
    roomCount,
    bathroomCount,
    guestCount,
    location,
    price,
  } = body;

  Object.keys(body).forEach((value: any) => {
    if (!body[value]) {
      NextResponse.error();
    }
  });

  const listing = await prisma.listing.create({
    data: {
      title,
      description,
      imageSrc,
      category,
      roomCount,
      bathroomCount,
      guestCount,
      locationValue: location.value,
      price: parseInt(price, 10),
      userId: user.id,
    },
  });

  return NextResponse.json(listing);
}
