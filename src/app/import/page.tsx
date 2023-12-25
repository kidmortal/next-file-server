"use client";

import { UploadFormStock } from "@/components/UploadFormStock";
import { UploadFormStockRules } from "@/components/UploadFormStockRules";
import { getAllProductDumps } from "@/services/database/stock";
import useStore from "@/store/main";
import { openNotificationWithIcon } from "@/utils/notification";
import { notification } from "antd";
import { useEffect } from "react";

import styles from "./styles.module.scss";

export default function Home() {
  const store = useStore();
  const [api, contextHolder] = notification.useNotification();

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
      {contextHolder}

      <div className={styles.container}>
        <UploadFormStockRules
          onSuccess={() => {
            openNotificationWithIcon({
              api,
              type: "success",
              message: "Added new dump form",
            });
            fetchDumpData();
          }}
        />
        <UploadFormStock
          onSuccess={() => {
            openNotificationWithIcon({
              api,
              type: "success",
              message: "Added new dump form",
            });
            fetchDumpData();
          }}
        />
      </div>
    </div>
  );
}
