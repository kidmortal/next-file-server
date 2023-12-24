"use server";
import { ExcelStockProduct } from "@/utils/excelParser";
import { PrismaClient } from "@prisma/client";

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

const prisma = new PrismaClient();

export async function createProductDump(
  excelProductStock: ExcelStockProduct[],
  author: string
) {
  const newDump = await prisma.stockDump.create({
    data: {
      author: author,
      products: {
        createMany: { data: excelProductStock },
      },
    },
  });

  console.log(newDump);
}

export async function getAllProductDumps() {
  const allDumps = await prisma.stockDump.findMany({
    include: { products: true },
  });
  console.log("Fetch dumps");
  return allDumps;
}

export async function deleteAllProducts() {
  const allDeletes = await prisma.stockProduct.deleteMany({});
  console.log(allDeletes);
  return allDeletes;
}

export async function deleteAllDumps() {
  const allDeletes = await prisma.stockDump.deleteMany({});
  console.log(allDeletes);
  return allDeletes;
}

export async function deleteDump(id: string) {
  const result = await prisma.stockDump.delete({
    where: { id },
  });
  console.log(result);
  return result;
}
