"use client";
import NoPermission from "@/components/NoPermission";
import { When } from "@/components/When";
import { auth } from "@/firebase";
import useStore from "@/store/main";
import { Skeleton, Stack } from "@chakra-ui/react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

export default function AuthLayout(props: { children: React.ReactNode }) {
  const store = useStore();
  const pathname = usePathname();
  const router = useRouter();
  auth.onAuthStateChanged((user) => {
    if (user) {
      store.setFirebaseUser(user);
      if (pathname.includes("login")) {
        // redirect logged user to dash
        router.push("/dash");
      }
    }

    if (!user) {
      router.push("/login");
    }
    if (!store.user && !store.isFetching.user) {
      store.fetchUser(user?.email ?? "");
    }
  });

  return <div>{props.children}</div>;
}

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
        value={!store.isFetching.user && store.firebaseUser}
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
