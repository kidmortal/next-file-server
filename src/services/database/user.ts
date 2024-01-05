"use server";
import { prisma } from "./db";

export type ProductDumps = {
  id: string;
  author: string;
  createdAt: Date;
  products: {
    id: string;
    sku: string;
    stock: number;
    stockDumpId: string;
  }[];
}[];

export async function createNewUser(email: string) {
  const result = await prisma.user.create({
    data: {
      email,
      publish: false,
      importRules: false,
      importStock: false,
      settings: false,
      stock: false,
      stockRule: false,
    },
  });

  return result;
}

export async function getDatabaseUser(email: string) {
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });
  if (!user) {
    const newUser = await createNewUser(email);
    return newUser;
  }

  return user;
}
