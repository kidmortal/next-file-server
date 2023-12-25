"use client";

import StockRulesTable from "@/components/StockRulesTable";
import { UploadFormStockRules } from "@/components/UploadFormStockRules";
import { getStockRules } from "@/services/database/stockRule";
import useStore from "@/store/main";
import { openNotificationWithIcon } from "@/utils/notification";
import { notification } from "antd";
import { useEffect } from "react";

export default function Home() {
  const store = useStore();
  const [api, contextHolder] = notification.useNotification();

  async function fetchDumpData() {
    const stockRules = await getStockRules();
    store.setRuleProducts(stockRules);
  }

  useEffect(() => {
    if (store.ruleProducts.length <= 0) {
      fetchDumpData();
    }
  }, []);

  return (
    <div>
      {contextHolder}
      <span>
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
        <StockRulesTable
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
          stockRuleProducts={store.ruleProducts}
        />
      </span>
    </div>
  );
}
