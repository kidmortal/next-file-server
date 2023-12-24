import React from "react";
import type { TableColumnsType } from "antd";
import { Button, Table } from "antd";
import { deleteDump } from "@/services/database";
import { StockRuleProduct } from "@prisma/client";
import { StockRuleWithProducts } from "@/services/database/stockRule";
import dayjs from "dayjs";

type Props = {
  stockRule?: StockRuleWithProducts[];
  onSuccess: () => void;
  onDelete: () => void;
};

export default function StockRulesTable(props: Props) {
  const dumps = props.stockRule;

  if (!dumps) return <></>;

  const productsRowRender = (info: StockRuleWithProducts) => {
    const columns: TableColumnsType<StockRuleProduct> = [
      { title: "SKU", dataIndex: "sku", key: "sku" },
      { title: "Stock", dataIndex: "stock", key: "stock" },
    ];

    return (
      <Table
        columns={columns}
        dataSource={info.StockRuleProduct}
        pagination={false}
        rowKey="id"
      />
    );
  };

  const columns: TableColumnsType<StockRuleWithProducts> = [
    {
      title: "Atualizado em",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (v: Date) => dayjs(v).format("DD-MM-YYYY HH:mm"),
    },
    { title: "Nome", dataIndex: "title", key: "title" },
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
