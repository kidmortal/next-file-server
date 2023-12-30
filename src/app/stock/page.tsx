"use client";

import StockTable from "@/components/StockTable";
import { When } from "@/components/When";
import { getAllProductDumps } from "@/services/database/stock";
import useStore from "@/store/main";
import { Skeleton, Stack } from "@chakra-ui/react";
import { useEffect } from "react";

export default function StockPage() {
  const store = useStore();

  useEffect(() => {
    if (store.productsDump.length <= 0) {
      store.fetchProducts();
    }
  }, []);

  return (
    <div>
      <span>
        <When value={store.isFetching}>
          <Stack>
            <Skeleton height="20px" />
            <Skeleton height="20px" />
            <Skeleton height="20px" />
          </Stack>
        </When>
        <When value={!store.isFetching}>
          <StockTable
            onSuccess={() => {}}
            onDelete={() => {}}
            stockProducts={store.productsDump}
          />
        </When>
      </span>
    </div>
  );
}
