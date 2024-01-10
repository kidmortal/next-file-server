"use client";

import { Skeleton, Stack } from "@chakra-ui/react";
import useStore from "@/store/main";

import IntegrationSettings from "@/components/IntegrationSettings";

import { When } from "@/components/When";
import UserList from "@/components/UserList";
import { ResourcePermissionLayout } from "@/auth/resource";

export default function Home() {
  const store = useStore();

  return (
    <ResourcePermissionLayout>
      <Stack direction="column" gap="1rem">
        <When value={store.isFetching.integration}>
          <Stack>
            <Skeleton height="230px" borderRadius="8px" />
          </Stack>
        </When>
        <When value={!store.isFetching.integration}>
          <IntegrationSettings settings={store.integration} />
        </When>
        <UserList users={store.users} />
      </Stack>
    </ResourcePermissionLayout>
  );
}
