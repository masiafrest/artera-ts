import React from "react";

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

import { useAuth } from "lib/context/AuthContext";
import { useFormFields } from "lib/utils/useFormFields";
import NextLink from "next/link";

import type { SignInOutOptions, SupabaseAuthPayload } from "lib/types";

type Props = {
  options?: SignInOutOptions;
};
const FORM_VALUES: SupabaseAuthPayload = {
  email: "",
  password: "",
};

export default function SignInForm({ options }: Props) {
  const { signIn, loading } = useAuth();
  const [values, handleChange] =
    useFormFields<SupabaseAuthPayload>(FORM_VALUES);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signIn(values);
  };
  return (
    <Box
      as="form"
      onSubmit={handleSubmit}
      rounded={"lg"}
      bg={useColorModeValue("white", "gray.700")}
      boxShadow={"lg"}
      p={8}
    >
      {" "}
      <Stack spacing={4}>
        <FormControl id="email" isRequired>
          <FormLabel>Correo electronico</FormLabel>
          <Input
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Contraseña</FormLabel>
          <Input
            name="password"
            type="password"
            value={values.password}
            onChange={handleChange}
          />
        </FormControl>
        <Stack spacing={10}>
          {/* <Stack
            direction={{ base: "column", sm: "row" }}
            align={"start"}
            justify={"space-between"}
          >
            <Checkbox>Remember me</Checkbox>
            <Link color={"blue.400"}>Forgot password?</Link>
          </Stack> */}
          <Button
            type="submit"
            bg={"blue.400"}
            color={"white"}
            _hover={{
              bg: "blue.500",
            }}
          >
            Continuar
          </Button>
        </Stack>
        <Stack pt={6}>
          <Text align={"center"}>
            ¿No tienes cuenta todavia?{" "}
            <NextLink href={"/signup"} passHref>
              <Link color={"blue.400"}>Registrate aqui</Link>
            </NextLink>
          </Text>
        </Stack>
      </Stack>
    </Box>
  );
}
