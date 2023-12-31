"use server";
import { PublishProduct } from "@/utils/calculatePublish";
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

export async function createProductPublish(products: PublishProduct[]) {
  for await (const product of products) {
    await prisma.publishedProduct.create({
      data: {
        amount: product.amount,
        price: product.price,
        publishCode: product.publishCode,
        sku: product.sku,
      },
    });
    await prisma.stockProduct.update({
      where: {
        sku: product.sku,
      },
      data: {
        stock: {
          decrement: product.amount,
        },
      },
    });
  }
}

export async function getLastTenPublishedProduct() {
  const publishedProducts = await prisma.publishedProduct.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 10,
  });
  return publishedProducts;
}
