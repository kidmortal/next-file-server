"use server";
import { ExcelStockRuleTable } from "@/utils/excelParser";
import { PrismaClient, StockRuleProduct } from "@prisma/client";

const prisma = new PrismaClient();

export type StockRuleWithProducts = {
  id: string;
  title: string;
  createdAt: Date;
  StockRuleProduct: StockRuleProduct[];
};

export async function getStockRules() {
  const stockRules = await prisma.stockRuleTable.findMany({
    include: {
      StockRuleProduct: true,
    },
  });
  console.log(stockRules);
  return stockRules;
}

export async function createStockRules(ruleTables: ExcelStockRuleTable[]) {
  for await (const ruleTable of ruleTables) {
    await prisma.stockRuleTable.upsert({
      where: {
        title: ruleTable.title,
      },
      update: {
        createdAt: new Date(),
        StockRuleProduct: {
          createMany: {
            data: ruleTable.rules,
          },
        },
      },
      create: {
        title: ruleTable.title,
        StockRuleProduct: {
          createMany: {
            data: ruleTable.rules,
          },
        },
      },
    });
  }
}

export async function deleteStockRule(title: string) {
  const result = await prisma.stockRuleTable.delete({
    where: {
      title,
    },
  });

  return result;
}
