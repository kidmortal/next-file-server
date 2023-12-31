"use client";

import StockTable from "@/components/StockTable";
import { When } from "@/components/When";

import useStore from "@/store/main";
import { Skeleton, Stack } from "@chakra-ui/react";

export default function StockPage() {
  const store = useStore();

  return (
    <div>
      <When value={store.isFetching.products}>
        <Stack>
          <Skeleton height="20px" />
          <Skeleton height="20px" />
          <Skeleton height="20px" />
        </Stack>
      </When>
      <When value={!store.isFetching.products}>
        <StockTable
          onSuccess={() => {}}
          onDelete={() => {}}
          stockProducts={store.productsDump}
        />
      </When>
    </div>
  );
}
