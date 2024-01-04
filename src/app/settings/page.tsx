"use client";

import { Box, useToast } from "@chakra-ui/react";
import useStore from "@/store/main";

import styles from "./styles.module.scss";
import { UploadForm } from "@/components/UploadFile";
import IntegrationSettings from "@/components/IntegrationSettings";
import { useEffect } from "react";

export default function Home() {
  const toast = useToast();
  const store = useStore();

  useEffect(() => {
    if (!store.integration) {
      store.fetchIntegration();
    }
  }, []);

  return (
    <div>
      <div className={styles.container}>
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
        <IntegrationSettings settings={store.integration} />
      </div>
    </div>
  );
}
