import { Box, Button, Skeleton, Stack } from "@chakra-ui/react";
import { GoPackageDependents } from "react-icons/go";
import { MdOutlineRule } from "react-icons/md";
import { VscGraph } from "react-icons/vsc";
import { SettingsIcon } from "@chakra-ui/icons";
import React from "react";
import { useRouter } from "next/navigation";
import useStore from "@/store/main";
import { When } from "../When";

export function SideBarMenu() {
  const store = useStore();
  const router = useRouter();

  return (
    <Box bg="white" p={4} height="100%" borderRadius="8px">
      <When value={store.isFetching.user}>
        <Stack direction={"column"} width="10rem">
          <Skeleton height="30px" />
          <Skeleton height="30px" />
          <Skeleton height="30px" />
          <Skeleton height="30px" />
        </Stack>
      </When>
      <When value={!store.isFetching.user}>
        <Stack direction={"column"}>
          <When value={store.user?.publish}>
            <Button
              justifyContent="flex-start"
              leftIcon={<VscGraph />}
              colorScheme="teal"
              variant="solid"
              onClick={() => router.push("/dash")}
            >
              Visão geral
            </Button>
          </When>

          <When value={store.user?.stock}>
            <Button
              justifyContent="flex-start"
              leftIcon={<GoPackageDependents />}
              colorScheme="teal"
              variant="solid"
              onClick={() => router.push("/dash/stock")}
            >
              Estoque
            </Button>
          </When>

          <When value={store.user?.stockRule}>
            <Button
              justifyContent="flex-start"
              leftIcon={<MdOutlineRule />}
              colorScheme="teal"
              variant="solid"
              onClick={() => router.push("/dash/stockrules")}
            >
              Regra de estoque
            </Button>
          </When>

          <When value={store.user?.settings}>
            <Button
              justifyContent="flex-start"
              leftIcon={<SettingsIcon />}
              colorScheme="teal"
              variant="solid"
              onClick={() => router.push("/dash/settings")}
            >
              Configurações
            </Button>
          </When>
        </Stack>
      </When>
    </Box>
  );
}
