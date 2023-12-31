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

import { PublishedProduct, StockRuleProduct } from "@prisma/client";

type Props = {
  publishedProducts?: PublishedProduct[];
};

export function PublishedProducts(props: Props) {
  const products = props.publishedProducts;

  if (!products) return <></>;

  return (
    <Box borderRadius="8px" backgroundColor="white">
      <TableContainer maxH={"50vh"} overflowY="auto">
        <Table size="sm">
          <Thead>
            <Tr>
              <Th>SKU</Th>
              <Th>Preço</Th>
              <Th>Codigo</Th>
              <Th>Quantidade</Th>
              <Th>Anunciado em</Th>
            </Tr>
          </Thead>
          <Tbody>
            {products.map((product) => (
              <Tr key={product.sku}>
                <Td>{product.sku}</Td>
                <Td>{product.price}</Td>
                <Td>{product.publishCode}</Td>
                <Td>{product.amount}</Td>
                <Td>{dayjs(product.createdAt).format("DD-MM-YY HH:mm")}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}
