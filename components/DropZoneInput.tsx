import { useEffect, useCallback } from "react";
import {
  Flex,
  FormControl,
  IconButton,
  Text,
  Image,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { SmallCloseIcon } from "@chakra-ui/icons";
import { ProductDetailInterface } from "lib/types";
import { FileRejection, useDropzone } from "react-dropzone";
import { useFormContext } from "react-hook-form";

export default function DropZoneInput() {
  const { register, unregister, setValue, watch, getValues } =
    useFormContext<ProductDetailInterface>();
  const imagenes = watch("imagenes");

  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejection: FileRejection[]) => {
      if (acceptedFiles.length > 0) {
        const imagenes = acceptedFiles.map((f) =>
          Object.assign(f, {
            preview: URL.createObjectURL(f),
          })
        );
        setValue("imagenes", imagenes);
      }
    },
    []
  );

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({
      onDrop,
      maxFiles: 3,
      accept: {
        "image/*": [],
      },
    });

  const deleteImg = (name: string) => {
    const filterImgs = getValues("imagenes")?.filter((f) => f.name !== name);
    setValue("imagenes", filterImgs);
  };

  useEffect(() => {
    register("imagenes");
    return () => {
      unregister("imagenes");
    };
  }, [register, unregister]);
  return (
    <FormControl id="imagenes">
      <Flex
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height="14"
        borderWidth={1}
        borderStyle="dashed"
        borderColor={{ color: "gray.500" }}
        borderRadius={5}
        mb="3"
        {...getRootProps()}
      >
        <div>
          <input {...getInputProps()} />
          <Text>Drap n Drop Imagenes o Click para agregar, max 3</Text>
        </div>
      </Flex>
      <Grid justifyItems="center" templateColumns="repeat(3, 1fr)">
        {imagenes?.map((f) => (
          <GridItem key={f.name} position="relative">
            <Image boxSize={100} src={f.preview} />
            <IconButton
              position="absolute"
              top="-1"
              right="-3"
              size="sm"
              rounded="full"
              colorScheme="red"
              aria-label="remove Image"
              icon={<SmallCloseIcon />}
              onClick={() => deleteImg(f.name)}
            />
          </GridItem>
        ))}
      </Grid>
    </FormControl>
  );
}
