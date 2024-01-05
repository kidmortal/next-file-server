"use server";
import { User } from "@prisma/client";
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

export async function updateDatabaseUserPermission(
  email: string,
  permission: string,
  enabled: boolean
) {
  const result = await prisma.user.update({
    where: {
      email: email,
    },
    data: {
      [permission]: enabled,
    },
  });

  return result;
}

export async function updateDatabaseUser(user: User) {
  const result = await prisma.user.update({
    where: {
      email: user.email,
    },
    data: user,
  });

  return result;
}

export async function deleteDatabaseUser(email: string) {
  const result = await prisma.user.delete({
    where: {
      email: email,
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

export async function getAllDatabaseUsers() {
  const users = await prisma.user.findMany({});
  return users;
}
