"use server";
import { ExcelStockProduct } from "@/utils/excelParser";
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

export async function createProductDump(excelProductStock: ExcelStockProduct) {
  for await (const SKU of Object.keys(excelProductStock)) {
    const productObject = excelProductStock[SKU];
    const product = {
      sku: SKU,
      stock: productObject.stock,
      type: productObject.type,
    };
    await prisma.stockProduct.upsert({
      where: {
        sku: SKU,
      },
      create: product,
      update: product,
    });
  }
}

export async function getAllProductDumps() {
  const allDumps = await prisma.stockProduct.findMany({});
  return allDumps;
}

export async function deleteAllProducts() {
  const allDeletes = await prisma.stockProduct.deleteMany({});
  console.log(allDeletes);
  return allDeletes;
}

export async function deleteAllDumps() {
  const allDeletes = await prisma.stockProduct.deleteMany({});
  console.log(allDeletes);
  return allDeletes;
}

export async function deleteDump(id: string) {
  const result = await prisma.stockProduct.delete({
    where: { id },
  });
  console.log(result);
  return result;
}
