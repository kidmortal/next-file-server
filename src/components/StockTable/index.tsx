import React from "react";

import { StockProduct } from "@prisma/client";

import {
  IconButton,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { DeleteIcon } from "@chakra-ui/icons";

type Props = {
  stockProducts?: StockProduct[];
  onSuccess: () => void;
  onDelete: () => void;
};

export default function StockTable(props: Props) {
  const products = props.stockProducts;

  if (!products) return <></>;

  return (
    <div>
      <TableContainer maxH={"80vh"} overflowY="scroll">
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
            {products.map((product) => (
              <Tr key={product.sku}>
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
    </div>
  );
}
