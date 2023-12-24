"use client";

import { Input } from "antd";
import { useState } from "react";
import styles from "./style.module.scss";

type Props = {
  onSuccess: () => void;
};

export function UploadFormStockRules(props: Props) {
  const [file, setFile] = useState<File>();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;

    try {
      const data = new FormData();
      data.set("file", file);

      const res = await fetch("/api/database/rules", {
        method: "POST",
        body: data,
      });
      // handle the error
      if (!res.ok) throw new Error(await res.text());
      res.json().then((data) => {
        props.onSuccess();
      });
    } catch (e: any) {
      // Handle errors here
      console.error(e);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={onSubmit}>
        <Input
          type="file"
          name="file"
          onChange={(e) => setFile(e.target.files?.[0])}
        />
        <Input type="submit" value="Upload" />
      </form>
    </div>
  );
}
