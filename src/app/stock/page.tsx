"use client";

import StockTable from "@/components/StockTable";
import { UploadFormStock } from "@/components/UploadFormStock";
import { getAllProductDumps } from "@/services/database/stock";
import useStore from "@/store/main";
import { openNotificationWithIcon } from "@/utils/notification";
import { notification } from "antd";
import { useEffect } from "react";

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
      <span>
        <StockTable
          onSuccess={() => {
            fetchDumpData();
          }}
          onDelete={() => {
            fetchDumpData();
            openNotificationWithIcon({
              api,
              type: "warning",
              message: "Dump removed",
            });
          }}
          stockProducts={store.productsDump}
        />
      </span>
    </div>
  );
}
