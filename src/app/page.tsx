"use client";
import { useEffect } from "react";
import styles from "./page.module.css";
import { UploadForm } from "@/components/UploadForm";
import { deleteAllProducts, getAllProductDumps } from "@/services/database";

export default function Home() {
  return (
    <div className={styles.container}>
      <button onClick={() => deleteAllProducts()}>delete all products</button>
      <button onClick={() => getAllProductDumps()}>
        query all products dumps
      </button>
      <UploadForm />
    </div>
  );
}
