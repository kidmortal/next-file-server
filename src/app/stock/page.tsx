"use client";

import DumpsTable from "@/components/DumpsTable";
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
        <DumpsTable
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
          dumpData={store.productsDump}
        />
      </span>
    </div>
  );
}
