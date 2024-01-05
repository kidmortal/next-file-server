import { auth } from "@/firebase";
import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useState } from "react";

export default function LoginBox() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  function loginOrRegister() {
    signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        console.log(user);
      })
      .catch((error) => {
        createUserWithEmailAndPassword(auth, email, password).then((user) => {
          console.log(user);
        });
      });
  }

  return (
    <Box backgroundColor="white" padding="1rem" borderRadius="8px">
      <FormControl>
        <FormLabel>Username</FormLabel>
        <Input
          placeholder="name"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          width="100%"
          mt={4}
          colorScheme="green"
          onClick={() => loginOrRegister()}
        >
          Login
        </Button>
      </FormControl>
    </Box>
  );
}
