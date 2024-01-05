import React from "react";

import {
  Box,
  IconButton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { DeleteIcon } from "@chakra-ui/icons";

import { StockRuleProduct } from "@prisma/client";

type CompactStockRulesTableProps = {
  stockRuleProducts?: StockRuleProduct[];
};

export function CompactStockRulesTable(props: CompactStockRulesTableProps) {
  const rules = props.stockRuleProducts;

  if (!rules) return <></>;

  return (
    <Box borderRadius="8px" backgroundColor="white">
      <TableContainer maxH={"50vh"} overflowY="auto">
        <Table size="sm">
          <Thead>
            <Tr>
              <Th>SKU</Th>
              <Th>Categoria</Th>
              <Th>Preço</Th>
              <Th>Codigo</Th>
            </Tr>
          </Thead>
          <Tbody>
            {rules.map((rule, i) => (
              <Tr key={i}>
                <Td>{rule.sku}</Td>
                <Td>{rule.category}</Td>
                <Td>{rule.price}</Td>
                <Td>{rule.publishCode}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}

type Props = {
  stockRuleProducts?: StockRuleProduct[];
  onSuccess: () => void;
  onDelete: () => void;
};

export default function StockRulesTable(props: Props) {
  const rules = props.stockRuleProducts;

  if (!rules) return <></>;

  return (
    <Box borderRadius="8px" backgroundColor="white">
      <TableContainer maxH={"80vh"} overflowY="auto">
        <Table>
          <Thead>
            <Tr>
              <Th>SKU</Th>
              <Th>Categoria</Th>
              <Th>Preço</Th>
              <Th>Codigo Anuncio</Th>
              <Th>Atualizado em</Th>
            </Tr>
          </Thead>
          <Tbody>
            {rules.map((rule, i) => (
              <Tr key={i}>
                <Td>{rule.sku}</Td>
                <Td>{rule.category}</Td>
                <Td>{rule.price}</Td>
                <Td>{rule.publishCode}</Td>
                <Td>{dayjs(rule.updatedAt).format("DD-MM-YY HH:mm")}</Td>
                <Td>
                  <IconButton
                    colorScheme="red"
                    aria-label="delete"
                    icon={<DeleteIcon />}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}
