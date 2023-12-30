"use client";

import { getAllProductDumps } from "@/services/database/stock";
import useStore from "@/store/main";

import { useEffect } from "react";

import styles from "./styles.module.scss";

export default function Home() {
  const store = useStore();

  async function fetchDumpData() {
    const dumpData = await getAllProductDumps();
    store.setProductsDump(dumpData);
  }

  useEffect(() => {
    if (store.productsDump.length <= 0) {
      console.log("fetch");
      fetchDumpData();
    }
  }, []);

  return (
    <div>
      <div className={styles.container}></div>
    </div>
  );
}
