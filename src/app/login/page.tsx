"use client";

import LoginBox from "@/components/LoginBox";
import { Stack } from "@chakra-ui/react";

export default function LoginPage() {
  return (
    <Stack
      direction="column"
      gap="1rem"
      justify="center"
      align="center"
      height="100vh"
      backgroundColor="lightblue"
    >
      <LoginBox />
    </Stack>
  );
}
