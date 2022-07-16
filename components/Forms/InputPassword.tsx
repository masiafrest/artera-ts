import { useState } from "react";
import React from "react";
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
import { useForm, UseFormRegister } from "react-hook-form";
import { ClientAddressAuthPayload } from "lib/types";

type Props = {
  register: UseFormRegister<ClientAddressAuthPayload>;
  name: keyof ClientAddressAuthPayload;
  label: string;
};

export default function InputPassword({ register, name, label }: Props) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordReveal = () => {
    setShowPassword((oldShow) => !oldShow);
  };

  return (
    <FormControl id={name} isRequired>
      <FormLabel>{label}</FormLabel>
      <InputGroup size="md">
        <Input {...register(name)} type={showPassword ? "text" : "password"} />
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={togglePasswordReveal}>
            {showPassword ? "Hide" : "Show"}
          </Button>
        </InputRightElement>
      </InputGroup>
    </FormControl>
  );
}
