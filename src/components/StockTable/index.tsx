import React from "react";

import { StockProduct } from "@prisma/client";

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

type CompactTableProps = {
  stockProducts?: StockProduct[];
};

export function CompactStockTable(props: CompactTableProps) {
  const products = props.stockProducts;

  if (!products) return <></>;

  return (
    <Box borderRadius="8px" backgroundColor="white">
      <TableContainer maxH={"50vh"} overflowY="auto">
        <Table size="sm">
          <Thead>
            <Tr>
              <Th>SKU</Th>
              <Th>Categoria</Th>
              <Th>Estoque</Th>
            </Tr>
          </Thead>
          <Tbody>
            {products.map((product, i) => (
              <Tr key={i}>
                <Td>{product.sku}</Td>
                <Td>{product.type}</Td>
                <Td>{product.stock}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}

type Props = {
  stockProducts?: StockProduct[];
  onSuccess: () => void;
  onDelete: () => void;
};

export default function StockTable(props: Props) {
  const products = props.stockProducts;

  if (!products) return <></>;

  return (
    <Box borderRadius="8px" backgroundColor="white">
      <TableContainer maxH={"80vh"} overflowY="auto">
        <Table>
          <Thead>
            <Tr>
              <Th>SKU</Th>
              <Th>Estoque</Th>
              <Th>Categoria</Th>
              <Th>Atualizado em</Th>
            </Tr>
          </Thead>
          <Tbody>
            {products.map((product, i) => (
              <Tr key={i}>
                <Td>{product.sku}</Td>
                <Td>{product.stock}</Td>
                <Td>{product.type}</Td>
                <Td>{dayjs(product.updatedAt).format("DD-MM-YY HH:mm")}</Td>
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
