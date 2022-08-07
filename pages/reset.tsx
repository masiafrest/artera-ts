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
import { useFormFields } from "lib/utils/useFormFields";
import { SupabaseAuthPayload } from "lib/types";
import { useAuth } from "lib/context/AuthContext";
import NextLink from "next/link";

type Props = {};

const FORM_VALUES: Pick<SupabaseAuthPayload, "email"> = {
  email: "",
};

export default function Reset({}: Props) {
  const { toResetPassword } = useAuth();
  const [values, handleChange] =
    useFormFields<Pick<SupabaseAuthPayload, "email">>(FORM_VALUES);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    toResetPassword(values.email);
  };

  return (
    <Flex
      align={"center"}
      justify={"center"}
      // bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Resetea tu contraseña</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool <Link color={"blue.400"}>features</Link> ✌️
          </Text>
        </Stack>
        <Box
          as="form"
          onSubmit={handleSubmit}
          rounded={"lg"}
          // bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                name="email"
                type="email"
                value={values.email}
                onChange={handleChange}
              />
            </FormControl>

            <Stack spacing={10}>
              <Button
                type="submit"
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
              >
                Sign in
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                ¿Te acordaste de tu contraseña?{" "}
                <NextLink href={"/signup"} passHref>
                  <Link color={"blue.400"}>Ingresa aqui</Link>
                </NextLink>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
