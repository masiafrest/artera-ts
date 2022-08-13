import { Flex } from "@chakra-ui/react";
import React, { useState } from "react";
import { SupabaseAuthPayload } from "lib/types";
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
      // bg={useColorModeValue("gray.50", "gray.800")}
      height="full"
    >
      <SignUpForm isAdmin />
    </Flex>
  );
}
