import { Box, Button, Stack } from "@chakra-ui/react";
import { GoPackageDependents } from "react-icons/go";
import { MdOutlineRule } from "react-icons/md";
import { VscGraph } from "react-icons/vsc";
import { SettingsIcon } from "@chakra-ui/icons";
import React from "react";
import { useRouter } from "next/navigation";
import useStore from "@/store/main";

export function SideBarMenu() {
  const store = useStore();
  const router = useRouter();

  return (
    <Box bg="white" p={4} height="100%" borderRadius="8px">
      <Stack direction={"column"}>
        <Button
          justifyContent="flex-start"
          leftIcon={<VscGraph />}
          colorScheme="teal"
          variant="solid"
          onClick={() => router.push("/dash")}
          isDisabled={!store.user?.publish}
        >
          Visão geral
        </Button>

        <Button
          justifyContent="flex-start"
          leftIcon={<GoPackageDependents />}
          colorScheme="teal"
          variant="solid"
          onClick={() => router.push("/dash/stock")}
          isDisabled={!store.user?.stock}
        >
          Estoque
        </Button>

        <Button
          justifyContent="flex-start"
          leftIcon={<MdOutlineRule />}
          colorScheme="teal"
          variant="solid"
          onClick={() => router.push("/dash/stockrules")}
          isDisabled={!store.user?.stockRule}
        >
          Regra de estoque
        </Button>

        <Button
          justifyContent="flex-start"
          leftIcon={<SettingsIcon />}
          colorScheme="teal"
          variant="solid"
          onClick={() => router.push("/dash/settings")}
          isDisabled={!store.user?.settings}
        >
          Configurações
        </Button>
      </Stack>
    </Box>
  );
}
