import { getServerSession } from "next-auth/next";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prismadb";

export async function getSession() {
  return await getServerSession(authOptions);
}

export default async function getUser() {
  const session = await getSession();

  if (!session?.user?.email) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email as string,
    },
  });

  if (!user) {
    return null;
  }

  return {
    ...user,
    createdAt:user.createdAt.toISOString(),
    updatedAt:user.updatedAt.toISOString(),
    emailVerified:user.emailVerified?.toISOString() || null
  };
}
