"use client";

import useStore from "@/store/main";
import { Icon, IconButton, Stack } from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import { PiSignOutBold } from "react-icons/pi";
import { FaRegUserCircle } from "react-icons/fa";
import { auth } from "@/firebase";

export const HeaderComponent = () => {
  const store = useStore();
  const pathname = usePathname();

  function switchPageTitle() {
    switch (pathname) {
      case "/dash":
        return "Visão geral";
      case "/dash/stock":
        return "Estoque de produtos";
      case "/dash/stockrules":
        return "Regra de estoque";
      case "/dash/settings":
        return "Configurações";

      default:
        return "";
    }
  }

  return (
    <Stack direction="row" justifyContent="space-between">
      <span>{switchPageTitle()}</span>
      <Stack direction="row" align="center">
        <Icon as={FaRegUserCircle} width={25} height={25} />
        <strong>{store.user?.email}</strong>
        <IconButton
          aria-label="signout"
          backgroundColor="transparent"
          onClick={() => auth.signOut()}
          icon={<Icon as={PiSignOutBold} width={25} height={25} color="red" />}
        />
      </Stack>
    </Stack>
  );
};
