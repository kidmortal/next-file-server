"use client";
import DumpsTable from "@/components/DumpsTable";
import styles from "./styles.module.scss";
import { Button, notification } from "antd";
import { useEffect, useState } from "react";
import { openNotificationWithIcon } from "@/utils/notification";
import { UploadFormStock } from "@/components/UploadFormStock";
import { UploadFormStockRules } from "@/components/UploadFormStockRules";
import {
  StockRuleWithProducts,
  getStockRules,
} from "@/services/database/stockRule";
import StockRulesTable from "@/components/StockRulesTable";
import { ProductDumps, getAllProductDumps } from "@/services/database/stock";
import { StockRuleProduct } from "@prisma/client";

export default function Home() {
  const [api, contextHolder] = notification.useNotification();
  const [dumpData, setDumpData] = useState<ProductDumps>([]);
  const [rules, setRules] = useState<StockRuleProduct[]>([]);

  async function fetchDumpData() {
    const dumpData = await getAllProductDumps();
    const stockRules = await getStockRules();
    setRules(stockRules);
    setDumpData(dumpData);
  }

  useEffect(() => {
    fetchDumpData();
  }, []);

  return (
    <div className={styles.container}>
      {contextHolder}
      <div className={styles.spacedColumn}>
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
          dumpData={dumpData}
        />
      </div>
      <div className={styles.spacedColumn}>
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
          stockRuleProducts={rules}
        />
      </div>
    </div>
  );
}
