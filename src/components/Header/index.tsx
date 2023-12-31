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
      case "/import":
        return "Importação de configuraçoes";

      default:
        return "";
    }
  }

  return <>{switchPageTitle()}</>;
};
