"use client";

import { message, Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";

import styles from "./style.module.scss";

const { Dragger } = Upload;
type Props = {
  onSuccess: () => void;
};

export function UploadFormStock(props: Props) {
  const uploadProps: UploadProps = {
    name: "file",
    multiple: false,
    action: "/api/database/stock",
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
        props.onSuccess();
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  return (
    <div className={styles.container}>
      <Dragger {...uploadProps}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Clique ou arraste para adicionar arquivo
        </p>
        <p className="ant-upload-hint">Adicionar planilha de estoque</p>
      </Dragger>
    </div>
  );
}
