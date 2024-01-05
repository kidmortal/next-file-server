"use client";

import { SideBarMenu } from "@/components/SideBarMenu";
import { ChakraProvider, Stack } from "@chakra-ui/react";

import styles from "./styles.module.scss";
import { HeaderComponent } from "@/components/Header";
import { useEffect } from "react";
import useStore from "@/store/main";

export default function RootLayout({ children }: { children: any }) {
  const store = useStore();

  useEffect(() => {
    if (store.productsDump.length <= 0) {
      store.fetchProducts();
    }
    if (store.ruleProducts.length <= 0) {
      store.fetchStockRules();
    }
    if (store.publishedProducts.length <= 0) {
      store.fetchPublishedProducts();
    }
    if (!store.integration) {
      store.fetchIntegration();
    }
  }, []);

  return (
    <html>
      <head />
      <body className={styles.body}>
        <ChakraProvider>
          <Stack direction="row" spacing="1rem" width="100%">
            <SideBarMenu />
            <Stack
              direction="column"
              spacing="1rem"
              className={styles.container}
              borderRadius="8px"
              padding="1rem"
            >
              <HeaderComponent />
              <div>{children}</div>
            </Stack>
          </Stack>
        </ChakraProvider>
      </body>
    </html>
  );
}
