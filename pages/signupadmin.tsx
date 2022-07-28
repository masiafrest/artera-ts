import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  useToast,
} from "@chakra-ui/react";
import NextLink from "next/link";
import React, { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useFormFields } from "lib/utils/useFormFields";
import { supabase } from "lib/utils/supabaseClient";
import { SupabaseAuthPayload } from "lib/types";
import { useAuth } from "lib/context/AuthContext";
import SignUpForm from "components/Forms/SignupForm";

const FORM_VALUES: SupabaseAuthPayload = {
  email: "",
  password: "",
};

export default function SignUp() {
  return (
    <Flex
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
      height="full"
    >
      <SignUpForm isAdmin />
    </Flex>
  );
}
