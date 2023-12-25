import React from "react";
import type { TableColumnsType } from "antd";
import { Button, Table } from "antd";
import { deleteDump } from "@/services/database/stock";
import { StockProduct } from "@prisma/client";
import dayjs from "dayjs";

type Props = {
  stockProducts?: StockProduct[];
  onSuccess: () => void;
  onDelete: () => void;
};

export default function StockTable(props: Props) {
  const products = props.stockProducts;

  if (!products) return <></>;

  const columns: TableColumnsType<StockProduct> = [
    {
      title: "Atualizado em",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (v: Date) => dayjs(v).format("DD-MM-YY HH:mm"),
    },
    { title: "Sku", dataIndex: "sku", key: "sku" },
    { title: "Estoque", dataIndex: "stock", key: "stock" },
    { title: "Tipo", dataIndex: "type", key: "type" },
    {
      title: "Action",
      key: "operation",
      render: (text, record) => (
        <Button
          onClick={() => deleteDump(record.id).then(() => props.onDelete())}
        >
          Remover
        </Button>
      ),
    },
  ];

  return (
    <div>
      <Table columns={columns} rowKey={"id"} dataSource={products} />
    </div>
  );
}
