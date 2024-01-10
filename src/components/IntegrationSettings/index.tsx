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
import useStore from "@/store/main";
import { censorString } from "@/utils/string";

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
      <span>
        client id:{" "}
        {censorString({
          input: `${props.settings?.clientId}`,
          numberOfCharactersToCensor: 10,
        })}{" "}
      </span>
      <span>
        app token:{" "}
        {censorString({
          input: props.settings?.appToken,
          numberOfCharactersToCensor: 10,
        })}{" "}
      </span>
      <span>
        refresh token:{" "}
        {censorString({
          input: props.settings?.refreshToken,
          numberOfCharactersToCensor: 10,
        })}
      </span>
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
            store.generateNewApiToken();
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
            <EditIntegration
              integration={props.settings}
              onSuccess={() => {
                setModalOpen(false);
                store.fetchIntegration();
              }}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Stack>
  );
}
