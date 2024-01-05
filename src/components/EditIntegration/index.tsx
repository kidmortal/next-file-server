import { updateMercadoLivreIntegration } from "@/services/database/integration";
import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { MercadoLivreIntegration } from "@prisma/client";
import { useState } from "react";

export default function EditIntegration(props: {
  integration: MercadoLivreIntegration | null;
}) {
  const [name, setName] = useState(props.integration?.name ?? "");
  const [clientId, setClientId] = useState(props.integration?.clientId ?? 0);
  const [secretKey, setSecretKey] = useState(
    props.integration?.secretKey ?? ""
  );
  const [uri, setUri] = useState(props.integration?.uri ?? "");
  const [refreshToken, setRefreshToken] = useState(
    props.integration?.refreshToken ?? ""
  );
  const [appToken, setAppToken] = useState(props.integration?.appToken ?? "");

  async function editIntegration() {
    if (props.integration) {
      const response = await updateMercadoLivreIntegration(
        props.integration.id,
        {
          name,
          clientId,
          refreshToken,
          secretKey,
          uri,
          appToken,
        }
      );
      console.log(response);
    }
  }

  return (
    <Box backgroundColor="white" padding="1rem" borderRadius="8px">
      <FormControl>
        <FormLabel>Integration ID</FormLabel>
        <Input
          readOnly
          placeholder="name"
          value={props.integration?.id ?? ""}
        />
        <FormLabel>Integration name</FormLabel>
        <Input
          placeholder="name"
          onChange={(event) => setName(event.currentTarget.value)}
          value={name}
        />
        <FormLabel>Client ID</FormLabel>
        <Input
          placeholder="id"
          onChange={(event) => setClientId(parseInt(event.currentTarget.value))}
          value={clientId}
        />
        <FormLabel>Secret key</FormLabel>
        <Input
          placeholder="key"
          onChange={(event) => setSecretKey(event.currentTarget.value)}
          value={secretKey}
        />
        <FormLabel>URI</FormLabel>
        <Input
          placeholder="uri"
          onChange={(event) => setUri(event.currentTarget.value)}
          value={uri}
        />
        <FormLabel>refreshToken</FormLabel>
        <Input
          placeholder="refresh tken"
          onChange={(event) => setRefreshToken(event.currentTarget.value)}
          value={refreshToken}
        />
        <FormLabel>App token</FormLabel>
        <Input
          placeholder="refresh tken"
          onChange={(event) => setAppToken(event.currentTarget.value)}
          value={appToken}
        />
        <Button mt={4} colorScheme="green" onClick={() => editIntegration()}>
          Edit integration
        </Button>
      </FormControl>
    </Box>
  );
}
