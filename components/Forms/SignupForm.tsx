import { useState } from "react";
import {
  Flex,
  Box,
  FormErrorMessage,
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
  InputRightElement,
  InputGroup,
} from "@chakra-ui/react";
import { useAuth } from "lib/context/AuthContext";
import { ClientAddressAuthPayload, SupabaseAuthPayload } from "lib/types";
import NextLink from "next/link";

import { useFormFields } from "lib/utils/useFormFields";
import { useForm } from "react-hook-form";
import InputPassword from "./InputPassword";

const FORM_VALUES: ClientAddressAuthPayload = {
  email: "",
  password: "",
  // confirmPassword: "",
  tel: "",
  username: "",
  lastname: "",
  isadmin: false,
  country: "Panamá",
  address: "",
};

type Props = {
  isAdmin?: boolean;
};

export default function SignUpForm({ isAdmin = false }: Props) {
  const { signUp, loading } = useAuth();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<ClientAddressAuthPayload>({
    defaultValues: FORM_VALUES,
  });

  const onSubmit = (values: ClientAddressAuthPayload) => {
    // e.preventDefault();
    signUp(values);
  };

  return (
    <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
      <Stack align={"center"}>
        <Heading fontSize={"4xl"}>Sign in to your account</Heading>
        <Text fontSize={"lg"} color={"gray.600"}>
          to enjoy all of our cool <Link color={"blue.400"}>features</Link> ✌️
        </Text>
      </Stack>
      <Box
        as="form"
        onSubmit={handleSubmit(onSubmit)}
        rounded={"lg"}
        bg={useColorModeValue("white", "gray.700")}
        boxShadow={"lg"}
        p={8}
      >
        <Stack spacing={4}>
          <FormControl id="email" isRequired>
            <FormLabel>Correo electronico</FormLabel>
            <Input {...register("email")} />
          </FormControl>
          <InputPassword
            register={register}
            name="password"
            label="Contraseña"
          />
          <FormControl id="tel">
            <FormLabel>Telefono</FormLabel>
            <Input {...register("tel")} type="tel" inputMode="decimal" />
          </FormControl>
          <FormControl id="username" isRequired>
            <FormLabel>Nombre y apellido</FormLabel>
            <Input {...register("username")} />
          </FormControl>
          {!isAdmin && (
            <>
              <FormControl id="country" isRequired>
                <FormLabel>Pais</FormLabel>
                <Input {...register("country")} />
              </FormControl>
              <FormControl id="address" isRequired>
                <FormLabel>Dirrección</FormLabel>
                <Input {...register("address")} />
              </FormControl>
            </>
          )}

          <Stack spacing={10}>
            <Stack
              direction={{ base: "column", sm: "row" }}
              align={"start"}
              justify={"space-between"}
            >
              <Checkbox>Remember me</Checkbox>
              <Link color={"blue.400"}>Forgot password?</Link>
            </Stack>
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
              ¿No tienes cuenta todavia?{" "}
              <NextLink href={"/signup"} passHref>
                <Link color={"blue.400"}>Registrate aqui</Link>
              </NextLink>
            </Text>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
}
