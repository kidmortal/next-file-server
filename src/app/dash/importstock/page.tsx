"use client";

import { Box, useToast } from "@chakra-ui/react";
import useStore from "@/store/main";

import { UploadForm } from "@/components/UploadFile";

import { ResourcePermissionLayout } from "@/auth";

export default function Home() {
  const toast = useToast();
  const store = useStore();

  return (
    <ResourcePermissionLayout>
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
    </ResourcePermissionLayout>
  );
}
