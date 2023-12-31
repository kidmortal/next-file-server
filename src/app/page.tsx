"use client";

import PublishPreview from "@/components/PublishPreview";
import styles from "./styles.module.scss";
import { Button, Skeleton, Stack } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { CompactStockTable } from "@/components/StockTable";
import useStore from "@/store/main";
import { CompactStockRulesTable } from "@/components/StockRulesTable";
import { When } from "@/components/When";

export default function Home() {
  const store = useStore();
  const isFetching = store.isFetching.products || store.isFetching.rules;

  return (
    <div className={styles.container}>
      <When value={isFetching}>
        <Stack>
          <Skeleton height="20px" />
          <Skeleton height="20px" />
          <Skeleton height="20px" />
        </Stack>
      </When>
      <When value={!isFetching}>
        <Stack direction={"row"} gap="1rem">
          <Stack direction={"column"} gap="1rem">
            <PublishPreview
              stock={store.productsDump}
              rules={store.ruleProducts}
            />
            <Button
              colorScheme="blue"
              width="100%"
              rightIcon={<ChevronRightIcon />}
            >
              Publicar produtos
            </Button>
          </Stack>

          <Stack direction={"column"} gap="1rem">
            <CompactStockTable stockProducts={store.productsDump} />

            <CompactStockRulesTable stockRuleProducts={store.ruleProducts} />
          </Stack>
        </Stack>
      </When>
    </div>
  );
}
