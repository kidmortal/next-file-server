"use client";

import StockTable from "@/components/StockTable";
import { getAllProductDumps } from "@/services/database/stock";
import useStore from "@/store/main";
import { useEffect } from "react";

export default function StockPage() {
  const store = useStore();

  async function fetchDumpData() {
    const dumpData = await getAllProductDumps();
    store.setProductsDump(dumpData);
  }

  useEffect(() => {
    if (store.productsDump.length <= 0) {
      console.log("fetch");
      fetchDumpData();
    }
  }, []);

  return (
    <div>
      <span>
        <StockTable
          onSuccess={() => {
            fetchDumpData();
          }}
          onDelete={() => {
            fetchDumpData();
          }}
          stockProducts={store.productsDump}
        />
      </span>
    </div>
  );
}
