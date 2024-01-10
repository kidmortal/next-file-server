"use client";

import { Box, useToast } from "@chakra-ui/react";
import useStore from "@/store/main";

import { UploadForm } from "@/components/UploadFile";
import { ResourcePermissionLayout } from "@/auth/resource";

export default function Home() {
  const toast = useToast();
  const store = useStore();

  return (
    <ResourcePermissionLayout>
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
    </ResourcePermissionLayout>
  );
}
