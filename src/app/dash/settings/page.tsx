"use client";

import { Box, Skeleton, Stack, useToast } from "@chakra-ui/react";
import useStore from "@/store/main";

import styles from "./styles.module.scss";
import { UploadForm } from "@/components/UploadFile";
import IntegrationSettings from "@/components/IntegrationSettings";
import { useEffect } from "react";
import { When } from "@/components/When";
import UserList from "@/components/UserList";

export default function Home() {
  const toast = useToast();
  const store = useStore();

  useEffect(() => {
    if (!store.integration) {
      store.fetchIntegration();
    }
  }, []);

  return (
    <Stack direction="column" gap="1rem">
      <When value={store.isFetching.integration}>
        <Stack>
          <Skeleton height="230px" borderRadius="8px" />
        </Stack>
      </When>
      <When value={!store.isFetching.integration}>
        <IntegrationSettings settings={store.integration} />
      </When>
      <UserList users={store.users} />

      <Stack direction="row" className={styles.container}>
        <Box borderRadius="8px" backgroundColor="white" padding="0.5rem">
          <UploadForm
            uploadPath="/api/database/stock"
            label="Estoque"
            onError={() => {
              toast({
                position: "top-right",
                title: "Erro",
                description: "Ocorreu um erro ao importar a planilha",
                status: "error",
                duration: 2000,
              });
            }}
            onSuccess={() => {
              store.fetchProducts();
              toast({
                position: "top-right",
                title: "Sucesso",
                description: "Planilha importada",
                status: "success",
                duration: 2000,
              });
            }}
          />
        </Box>
        <Box borderRadius="8px" backgroundColor="white" padding="0.5rem">
          <UploadForm
            uploadPath="/api/database/rules"
            label="Regras"
            onError={() => {
              toast({
                position: "top-right",
                title: "Erro",
                description: "Ocorreu um erro ao importar a planilha",
                status: "error",
                duration: 2000,
              });
            }}
            onSuccess={() => {
              store.fetchStockRules();
              toast({
                position: "top-right",
                title: "Sucesso",
                description: "Planilha importada",
                status: "success",
                duration: 2000,
              });
            }}
          />
        </Box>
      </Stack>
    </Stack>
  );
}
