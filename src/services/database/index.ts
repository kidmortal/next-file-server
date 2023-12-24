"use server";
import { ExcelStockProduct } from "@/utils/excelParser";
import { PrismaClient } from "@prisma/client";

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
  console.log(allDumps);
  return allDumps;
}

export async function deleteAllProducts() {
  const allDeletes = await prisma.stockProduct.deleteMany({});
  console.log(allDeletes);
  return allDeletes;
}
