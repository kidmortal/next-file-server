"use client";

import { SideBarMenu } from "@/components/SideBarMenu";
import { ChakraProvider, Stack } from "@chakra-ui/react";

import styles from "./styles.module.scss";

export default function RootLayout({ children }: { children: any }) {
  return (
    <html>
      <head />
      <ChakraProvider>
        <body className={styles.body}>
          <Stack direction="row" spacing="1rem" width="100%">
            <SideBarMenu />
            <Stack
              direction="column"
              spacing="1rem"
              className={styles.container}
              borderRadius="8px"
              padding="1rem"
            >
              <div>header</div>
              <div>{children}</div>
            </Stack>
          </Stack>
        </body>
      </ChakraProvider>
    </html>
  );
}
