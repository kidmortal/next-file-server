import React from "react";
import type { TableColumnsType } from "antd";
import { Button, Table } from "antd";
import { deleteDump } from "@/services/database";

type DumpProducts = {
  id: string;
  sku: string;
  stock: number;
  stockDumpId: string;
};

type DumpDataProps = {
  id: string;
  author: string;
  createdAt: Date;
  products: DumpProducts[];
};
type Props = {
  dumpData?: DumpDataProps[];
  onSuccess: () => void;
  onDelete: () => void;
};

export default function DumpsTable(props: Props) {
  const dumps = props.dumpData;

  if (!dumps) return <></>;

  const productsRowRender = (info: DumpDataProps) => {
    const columns: TableColumnsType<DumpProducts> = [
      { title: "SKU", dataIndex: "sku", key: "sku" },
      { title: "Stock", dataIndex: "stock", key: "stock" },
    ];

    return (
      <Table
        columns={columns}
        dataSource={info.products}
        pagination={false}
        scroll={{
          x: 300,
          y: 300,
        }}
        rowKey="id"
      />
    );
  };

  const columns: TableColumnsType<DumpDataProps> = [
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (v: Date) => v.toISOString(),
    },
    { title: "Creator", dataIndex: "author", key: "author" },
    {
      title: "Action",
      key: "operation",
      render: (text, record) => (
        <Button
          onClick={() => deleteDump(record.id).then(() => props.onDelete())}
        >
          Remove
        </Button>
      ),
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        expandable={{
          expandedRowRender: productsRowRender,
          defaultExpandedRowKeys: [1],
        }}
        rowKey={"id"}
        dataSource={dumps}
      />
    </div>
  );
}
