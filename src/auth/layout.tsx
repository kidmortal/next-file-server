"use client";

import { auth } from "@/firebase";
import useStore from "@/store/main";

import { usePathname, useRouter } from "next/navigation";
import React from "react";

export function AuthLayout(props: { children: React.ReactNode }) {
  const store = useStore();
  // const pathname = usePathname();
  // const router = useRouter();
  auth.onAuthStateChanged((user) => {
    // if (!user) {
    //   router.push("/login");
    // }
    if (!store.user && !store.isFetching.user) {
      store.fetchUser(user?.email ?? "");
    }
  });

  return <div>{props.children}</div>;
}
