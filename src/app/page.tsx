"use client";
import DumpsTable from "@/components/DumpsTable";
import styles from "./styles.module.scss";
import { UploadForm } from "@/components/UploadForm";
import {
  ProductDumps,
  deleteAllDumps,
  deleteAllProducts,
  getAllProductDumps,
} from "@/services/database";
import { Button } from "antd";
import { useEffect, useState } from "react";

export default function Home() {
  const [dumpData, setDumpData] = useState<ProductDumps>([]);

  async function fetchDumpData() {
    const dumpData = await getAllProductDumps();
    setDumpData(dumpData);
  }

  useEffect(() => {
    fetchDumpData();
  }, []);

  return (
    <div className={styles.container}>
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

        <UploadForm onSuccess={() => fetchDumpData()} />
      </div>
      <div>
        <DumpsTable onSuccess={() => fetchDumpData()} dumpData={dumpData} />
      </div>
    </div>
  );
}
