import {
  PublishProduct,
  calculatePublishProducts,
} from "@/utils/calculatePublish";
import {
  Box,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React from "react";

type Props = {
  publishProducts: PublishProduct[];
};

export default function PublishPreview(props: Props) {
  const publishList = props.publishProducts;

  if (publishList.length < 0) return <></>;

  return (
    <Box borderRadius="8px" backgroundColor="white">
      <TableContainer maxH={"40vh"} overflowY="auto">
        <Table size="sm">
          <Thead>
            <Tr>
              <Th>SKU</Th>
              <Th>Categoria</Th>
              <Th>Preço</Th>
              <Th>Codigo Anuncio</Th>
              <Th>Quantidade</Th>
            </Tr>
          </Thead>
          <Tbody>
            {publishList.map((publish) => (
              <Tr key={publish.sku}>
                <Td>{publish.sku}</Td>
                <Td>{publish.category}</Td>
                <Td>{publish.price}</Td>
                <Td>{publish.publishCode}</Td>
                <Td>{publish.amount}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}
