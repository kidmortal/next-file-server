import { Box, Button, Stack } from "@chakra-ui/react";
import { GoPackageDependents } from "react-icons/go";
import { MdOutlineRule } from "react-icons/md";
import { VscGraph } from "react-icons/vsc";
import { SettingsIcon } from "@chakra-ui/icons";
import React from "react";
import { useRouter } from "next/navigation";

export function SideBarMenu() {
  const router = useRouter();
  return (
    <Box bg="white" p={4} height="100%" borderRadius="8px">
      <Stack direction={"column"}>
        <Button
          justifyContent="flex-start"
          leftIcon={<VscGraph />}
          colorScheme="teal"
          variant="solid"
          onClick={() => router.push("/")}
        >
          Visão geral
        </Button>
        <Button
          justifyContent="flex-start"
          leftIcon={<GoPackageDependents />}
          colorScheme="teal"
          variant="solid"
          onClick={() => router.push("/stock")}
        >
          Estoque
        </Button>
        <Button
          justifyContent="flex-start"
          leftIcon={<MdOutlineRule />}
          colorScheme="teal"
          variant="solid"
          onClick={() => router.push("/stockrules")}
        >
          Regra de estoque
        </Button>
        <Button
          justifyContent="flex-start"
          leftIcon={<SettingsIcon />}
          colorScheme="teal"
          variant="solid"
          onClick={() => router.push("/settings")}
        >
          Configurações
        </Button>
      </Stack>
    </Box>
  );
}
