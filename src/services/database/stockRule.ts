"use server";
import { ExcelStockRuleProduct } from "@/utils/excelParser";
import { PrismaClient, StockRuleProduct } from "@prisma/client";

const prisma = new PrismaClient();

export type StockRuleWithProducts = {
  id: string;
  title: string;
  createdAt: Date;
  StockRuleProduct: StockRuleProduct[];
};

export async function getStockRules() {
  const stockRules = await prisma.stockRuleProduct.findMany({});
  console.log(stockRules);
  return stockRules;
}

export async function upsertStockRules(ruleProducts: ExcelStockRuleProduct[]) {
  for await (const product of ruleProducts) {
    await prisma.stockRuleProduct.upsert({
      where: {
        sku: product.sku,
      },
      create: product,
      update: product,
    });
  }
}

export async function deleteStockRule(sku: string) {
  const result = await prisma.stockRuleProduct.delete({
    where: {
      sku,
    },
  });

  return result;
}
