import { DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Icon,
  IconButton,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { GoPackageDependents } from "react-icons/go";
import { MdOutlineRule } from "react-icons/md";
import { VscGraph } from "react-icons/vsc";
import { CiSettings } from "react-icons/ci";
import { User } from "@prisma/client";
import React from "react";
import { IconType } from "react-icons";
import {
  deleteDatabaseUser,
  updateDatabaseUserPermission,
} from "@/services/database/user";
import useStore from "@/store/main";

const permissionIconsMap: { [key: string]: IconType } = {
  publish: VscGraph,
  stock: GoPackageDependents,
  stockRule: MdOutlineRule,
  settings: CiSettings,
  importStock: CiSettings,
  importRules: CiSettings,
};

export default function UserList(props: { users: User[] }) {
  const store = useStore();
  if (props.users.length <= 0) return <></>;

  function renderPermissions(user: User) {
    const permissionIcons = [];
    const { email, id, ...permissions } = user;
    for (const [key, value] of Object.entries(permissions)) {
      const enabled = value;
      const permissionName = key;
      const permissionIcon = permissionIconsMap[permissionName];
      permissionIcons.push(
        <IconButton
          backgroundColor={enabled ? "lightgreen" : "red"}
          aria-label={permissionName}
          onClick={async () => {
            await updateDatabaseUserPermission(
              user.email,
              permissionName,
              !enabled
            );
            store.fetchAllUsers();
          }}
          icon={<Icon as={permissionIcon} />}
        />
      );
    }
    return <Stack direction="row">{permissionIcons.map((icon) => icon)}</Stack>;
  }

  return (
    <Box borderRadius="8px" backgroundColor="white">
      <TableContainer maxH={"80vh"} overflowY="auto">
        <Table>
          <Thead>
            <Tr>
              <Th>Email</Th>
              <Th>Permissões</Th>
              <Th>Açoes</Th>
            </Tr>
          </Thead>
          <Tbody>
            {props.users.map((user, i) => (
              <Tr key={i}>
                <Td>{user.email}</Td>
                <Td>{renderPermissions(user)}</Td>
                <Td>
                  <IconButton
                    colorScheme="red"
                    aria-label="delete"
                    onClick={async () => {
                      await deleteDatabaseUser(user.email);
                      store.fetchAllUsers();
                    }}
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
