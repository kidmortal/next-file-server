"use client";

import { usePathname } from "next/navigation";

export const HeaderComponent = () => {
  const pathname = usePathname();

  function switchPageTitle() {
    switch (pathname) {
      case "/":
        return "Visão geral";
      case "/stock":
        return "Estoque de produtos";
      case "/stockrules":
        return "Regra de estoque";
      case "/settings":
        return "Configurações";

      default:
        return "";
    }
  }

  return <>{switchPageTitle()}</>;
};
