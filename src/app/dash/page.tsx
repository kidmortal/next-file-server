"use client";

import PublishPreview from "@/components/PublishPreview";
import styles from "./styles.module.scss";
import { Button, Skeleton, Stack } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { CompactStockTable } from "@/components/StockTable";
import useStore from "@/store/main";
import { CompactStockRulesTable } from "@/components/StockRulesTable";
import { When } from "@/components/When";
import { calculatePublishProducts } from "@/utils/calculatePublish";
import { PublishedProducts } from "@/components/PublishedProducts";
import { ResourcePermissionLayout } from "@/auth";

export default function Home() {
  const store = useStore();
  const isFetching =
    store.isFetching.products ||
    store.isFetching.rules ||
    store.isFetching.publish;
  const publishList = calculatePublishProducts(
    store.productsDump,
    store.ruleProducts
  );

  return (
    <ResourcePermissionLayout>
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
              <PublishPreview publishProducts={publishList} />
              <Button
                colorScheme="blue"
                width="100%"
                rightIcon={<ChevronRightIcon />}
                onClick={() => store.publishProducts(publishList)}
              >
                Publicar produtos
              </Button>
              <PublishedProducts publishedProducts={store.publishedProducts} />
            </Stack>

            <Stack direction={"column"} gap="1rem">
              <CompactStockTable stockProducts={store.productsDump} />

              <CompactStockRulesTable stockRuleProducts={store.ruleProducts} />
            </Stack>
          </Stack>
        </When>
      </div>
    </ResourcePermissionLayout>
  );
}
