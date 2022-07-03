import React, { useEffect } from "react";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Spinner,
  Stack,
  Textarea,
  Tooltip,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { FileWithPreview } from "lib/types";
import DropZoneInput from "./DropZoneInput";
import { QuestionOutlineIcon } from "@chakra-ui/icons";
import { DevTool } from "@hookform/devtools";

interface ProductFormData {
  imagen: string | null;
  imagenes?: string[];
  fileImgs?: FileWithPreview[];
  descripcion: string;
  precio: number | string;
  oldprice?: number;
  sku: string;
  caracteristica?: string;
}

type ProductFormProps = {
  onSubmit: SubmitHandler<ProductFormData>;
  defaultValues: ProductFormData;
};

export default function ProductForm({
  onSubmit,
  defaultValues,
}: ProductFormProps) {
  const methods = useForm<ProductFormData>({
    defaultValues,
  });
  const { register, control, formState, reset, handleSubmit, unregister } =
    methods;

  useEffect(() => {
    register("fileImgs");
    return () => {
      // talvez revoke url de fileImgs??
      unregister("fileImgs");
    };
  }, [register, unregister]);

  //work pero si no edita imagenes se manda mal el File
  useEffect(() => {
    if (defaultValues?.imagenes) {
      const fileImgs = defaultValues?.imagenes.map(
        (i) =>
          ({
            name: i,
            preview: `${process.env.NEXT_PUBLIC_SUPABASE_URL_IMG_PRODUCT}/${i}`,
          } as unknown as FileWithPreview)
      );
      reset({ ...defaultValues, fileImgs });
    }
  }, []);

  useEffect(() => {
    console.log("isSuccess", formState.isSubmitSuccessful);
    if (formState.isSubmitSuccessful) {
      reset(defaultValues);
    }
  }, [formState.isSubmitSuccessful]);
  console.log({ defaultValues });

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack
        as="form"
        onSubmit={handleSubmit(onSubmit)}
        spacing={4}
        w={"full"}
        maxW={"md"}
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={12}
      >
        <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
          {defaultValues.precio && defaultValues.sku ? "Edit" : "Add"} a Product
        </Heading>
        <FormProvider {...methods}>
          <DropZoneInput />
          <FormControl id="descripcion" isRequired>
            <FormLabel>Descripcion</FormLabel>
            <Input
              placeholder="descripcion"
              _placeholder={{ color: "gray.500" }}
              type="text"
              {...register("descripcion")}
            />
          </FormControl>
          <FormControl id="sku" isRequired>
            <FormLabel>Sku</FormLabel>
            <Input
              placeholder="sku"
              _placeholder={{ color: "gray.500" }}
              type="text"
              {...register("sku")}
            />
          </FormControl>
          <FormControl id="precio" isRequired>
            <FormLabel>Precio</FormLabel>
            <Controller
              control={control}
              name="precio"
              render={({ field: { ref, ...restField } }) => (
                <NumberInput {...restField} precision={2} step={0.01} min={1.0}>
                  <NumberInputField
                    ref={ref}
                    name={restField.name}
                    placeholder="precio"
                    _placeholder={{ color: "gray.500" }}
                  />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              )}
            />
          </FormControl>
          <FormControl id="caracteristica">
            <FormLabel display="flex" alignItems="center" gap="0.5rem">
              Caracteristica
              <Tooltip label="ingresa un formato estilo llave:valor, ejemplo: color: azul, medida: 20x20, etc...">
                <QuestionOutlineIcon />
              </Tooltip>
            </FormLabel>

            <Textarea {...register("caracteristica")} />
          </FormControl>
          <Stack spacing={6} direction={["column", "row"]}>
            <Button
              type="submit"
              bg={"blue.400"}
              color={"white"}
              w="full"
              _hover={{
                bg: "blue.500",
              }}
              disabled={formState.isSubmitting}
            >
              Submit
              {formState.isSubmitting && <Spinner />}
            </Button>
          </Stack>
        </FormProvider>
        <DevTool control={control} />
      </Stack>
    </Flex>
  );
}
