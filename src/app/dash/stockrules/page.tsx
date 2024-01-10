"use client";

import { ResourcePermissionLayout } from "@/auth/resource";
import StockRulesTable from "@/components/StockRulesTable";
import { When } from "@/components/When";
import useStore from "@/store/main";
import { Skeleton, Stack } from "@chakra-ui/react";

export default function StockRulesPage() {
  const store = useStore();

  return (
    <ResourcePermissionLayout>
      <When value={store.isFetching.rules}>
        <Stack>
          <Skeleton height="20px" />
          <Skeleton height="20px" />
          <Skeleton height="20px" />
        </Stack>
      </When>
      <When value={!store.isFetching.rules}>
        <StockRulesTable
          onSuccess={() => {}}
          onDelete={() => {}}
          stockRuleProducts={store.ruleProducts}
        />
      </When>
    </ResourcePermissionLayout>
  );
}
