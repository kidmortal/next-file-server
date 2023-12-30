import React from "react";

import { StockRuleProduct } from "@prisma/client";

type Props = {
  stockRuleProducts?: StockRuleProduct[];
  onSuccess: () => void;
  onDelete: () => void;
};

export default function StockRulesTable(props: Props) {
  const dumps = props.stockRuleProducts;

  if (!dumps) return <></>;

  return <div></div>;
}
