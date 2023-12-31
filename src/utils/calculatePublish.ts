"use client";
import { StockProduct, StockRuleProduct } from "@prisma/client";

export type PublishProduct = {
  sku: string;
  amount: number;
  publishCode: string;
  price: number;
  category: string;
};

export function calculatePublishProducts(
  stock: StockProduct[],
  rules: StockRuleProduct[]
) {
  const publishProducts: PublishProduct[] = [];

  stock.forEach((product) => {
    let availableStock = product.stock;
    const rulesForProduct = rules.filter((rule) => rule.sku === product.sku);
    rulesForProduct.forEach((rule) => {
      const stockHigherThanPublishRule = availableStock >= rule.stockRule;
      const hasEnoughStock = availableStock > 0;

      if (stockHigherThanPublishRule) {
        publishProducts.push({
          amount: rule.stockRule,
          category: rule.category,
          price: rule.price,
          publishCode: rule.publishCode,
          sku: rule.sku,
        });
        availableStock -= rule.stockRule;
      }
      if (!stockHigherThanPublishRule && hasEnoughStock) {
        publishProducts.push({
          amount: availableStock,
          category: rule.category,
          price: rule.price,
          publishCode: rule.publishCode,
          sku: rule.sku,
        });
        availableStock = 0;
      }
    });
  });

  return publishProducts;
}
