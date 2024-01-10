"use client";
import NoPermission from "@/components/NoPermission";
import { When } from "@/components/When";
import useStore from "@/store/main";
import { Skeleton, Stack } from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import React from "react";

export function ResourcePermissionLayout(props: { children: React.ReactNode }) {
  const store = useStore();
  const pathname = usePathname();
  const hasPermission = switchPermission();

  function switchPermission() {
    switch (pathname) {
      case "/dash":
        return store.user?.publish;
      case "/dash/stock":
        return store.user?.stock;
      case "/dash/stockrules":
        return store.user?.stockRule;
      case "/dash/settings":
        return store.user?.settings;
      case "/dash/importstock":
        return store.user?.importStock;
      case "/dash/importrules":
        return store.user?.importRules;

      default:
        return false;
    }
  }

  return (
    <div>
      <When
        value={!store.isFetching.user}
        fallback={
          <Stack>
            <Skeleton height="100px" />
            <Skeleton height="100px" />
            <Skeleton height="100px" />
            <Skeleton height="100px" />
          </Stack>
        }
      >
        <When value={hasPermission} fallback={<NoPermission />}>
          {props.children}
        </When>
      </When>
    </div>
  );
}
