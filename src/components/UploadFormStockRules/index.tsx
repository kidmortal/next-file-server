"use client";

import styles from "./style.module.scss";

type Props = {
  onSuccess: () => void;
};

export function UploadFormStockRules(props: Props) {
  // const uploadProps: UploadProps = {
  //   name: "file",
  //   multiple: false,
  //   action: "/api/database/rules",
  //   onChange(info) {
  //     const { status } = info.file;
  //     if (status !== "uploading") {
  //       console.log(info.file, info.fileList);
  //     }
  //     if (status === "done") {
  //       message.success(`${info.file.name} file uploaded successfully.`);
  //       props.onSuccess();
  //     } else if (status === "error") {
  //       message.error(`${info.file.name} file upload failed.`);
  //     }
  //   },
  //   onDrop(e) {
  //     console.log("Dropped files", e.dataTransfer.files);
  //   },
  // };

  return (
    <div className={styles.container}>
      {/* <Dragger {...uploadProps}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Clique para adicionar planilha de regra de estoque
        </p>
        <p className="ant-upload-hint">Regra de estoque</p>
      </Dragger> */}
    </div>
  );
}
