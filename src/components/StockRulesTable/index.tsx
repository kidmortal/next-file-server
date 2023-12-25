import React from "react";
import type { TableColumnsType } from "antd";
import { Button, Table } from "antd";
import { deleteStockRule } from "@/services/database/stockRule";
import dayjs from "dayjs";
import { StockRuleProduct } from "@prisma/client";

type Props = {
  stockRuleProducts?: StockRuleProduct[];
  onSuccess: () => void;
  onDelete: () => void;
};

export default function StockRulesTable(props: Props) {
  const dumps = props.stockRuleProducts;

  if (!dumps) return <></>;

  const columns: TableColumnsType<StockRuleProduct> = [
    {
      title: "Atualizado em",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (v: Date) => dayjs(v).format("DD-MM-YY HH:mm"),
    },
    { title: "SKU", dataIndex: "sku", key: "sku" },
    { title: "categoria", dataIndex: "category", key: "category" },
    {
      title: "Código do anuncio",
      dataIndex: "publishCode",
      key: "publishCode",
    },
    { title: "Regra de Estoque", dataIndex: "stockRule", key: "stockRule" },
    {
      title: "Preço",
      dataIndex: "price",
      key: "price",
      render: (value: number) => (
        <span>
          {value.toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL",
          })}
        </span>
      ),
    },
    {
      title: "Action",
      key: "operation",
      render: (text, record) => (
        <Button
          onClick={() =>
            deleteStockRule(record.sku).then(() => props.onDelete())
          }
        >
          Remover
        </Button>
      ),
    },
  ];

  return (
    <div>
      <Table columns={columns} rowKey={"id"} dataSource={dumps} />
    </div>
  );
}
