"use client";

import useStore from "@/store/main";

import { useEffect } from "react";

export default function Home() {
  const store = useStore();

  useEffect(() => {
    if (store.ruleProducts.length <= 0) {
      store.fetchStockRules();
    }
  }, []);

  return (
    <div>
      <span></span>
    </div>
  );
}
