"use client";

import { getStockRules } from "@/services/database/stockRule";
import useStore from "@/store/main";

import { useEffect } from "react";

export default function Home() {
  const store = useStore();

  async function fetchDumpData() {
    const stockRules = await getStockRules();
    store.setRuleProducts(stockRules);
  }

  useEffect(() => {
    if (store.ruleProducts.length <= 0) {
      fetchDumpData();
    }
  }, []);

  return (
    <div>
      <span></span>
    </div>
  );
}
