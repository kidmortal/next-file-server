import {
  Button,
  ButtonGroup,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
} from "@chakra-ui/react";
import { MercadoLivreIntegration } from "@prisma/client";
import dayjs from "dayjs";
import { useState } from "react";
import EditIntegration from "../EditIntegration";
import { MercadoLivreService } from "@/services/mercado";
import useStore from "@/store/main";

export default function IntegrationSettings(props: {
  settings: MercadoLivreIntegration | null;
}) {
  const store = useStore();
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <Stack
      direction="column"
      backgroundColor="white"
      padding="1rem"
      borderRadius="8px"
    >
      <span>name: {props.settings?.name}</span>
      <span>client id: {props.settings?.clientId}</span>
      <span>app token: {props.settings?.appToken}</span>
      <span>refresh token: {props.settings?.refreshToken}</span>
      <span>
        Atualizado em:{" "}
        {dayjs(props.settings?.refreshTokenUpdatedAt).format("DD-MM-YY HH:mm")}
      </span>
      <ButtonGroup>
        <Button colorScheme="green" onClick={() => setModalOpen(true)}>
          Editar valores
        </Button>
        <Button
          colorScheme="blue"
          onClick={async () => {
            await MercadoLivreService.getNewApiTokens({
              clientId: store.integration?.clientId,
              refreshToken: store.integration?.refreshToken,
              secretKey: store.integration?.secretKey,
              uri: store.integration?.uri,
            });
            store.fetchIntegration();
          }}
        >
          Atualizar chaves
        </Button>
      </ButtonGroup>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Integration</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <EditIntegration integration={props.settings} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Stack>
  );
}
