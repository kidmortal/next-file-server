import { Alert, AlertIcon } from "@chakra-ui/react";
import React from "react";

export default function NoPermission() {
  return (
    <Alert status="error">
      <AlertIcon />
      Opa, parece que você não tem permissão para acessar esse recurso.
    </Alert>
  );
}
