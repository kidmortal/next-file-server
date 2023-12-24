"use client";
import DumpsTable from "@/components/DumpsTable";
import styles from "./styles.module.scss";
import {
  ProductDumps,
  deleteAllDumps,
  getAllProductDumps,
} from "@/services/database";
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

export default function Home() {
  const [api, contextHolder] = notification.useNotification();
  const [dumpData, setDumpData] = useState<ProductDumps>([]);
  const [rules, setRules] = useState<StockRuleWithProducts[]>([]);

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
      <div className={styles.sidePanel}>
        <div className={styles.actionButtons}>
          <Button
            onClick={() => {
              deleteAllDumps().then(() => {
                fetchDumpData();
              });
            }}
            danger
          >
            delete all dumps
          </Button>
          <Button onClick={() => getAllProductDumps()}>
            query all products dumps
          </Button>
        </div>
        <span>Upload stock info</span>
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
        <span>Upload stock rules</span>
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
      </div>
      <div className={styles.rightPanel}>
        <div>
          <span>Estoque atual</span>
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
        <div>
          <span>Regra de estoque</span>
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
            stockRule={rules}
          />
        </div>
      </div>
    </div>
  );
}
