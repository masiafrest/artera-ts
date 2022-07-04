import { useEffect, useCallback } from "react";
import {
  Flex,
  FormControl,
  IconButton,
  Text,
  Image,
  Grid,
  GridItem,
  useToast,
} from "@chakra-ui/react";
import { SmallCloseIcon } from "@chakra-ui/icons";
import { ProductDetailInterface } from "lib/types";
import { FileRejection, useDropzone } from "react-dropzone";
import { useFormContext } from "react-hook-form";

export default function DropZoneInput() {
  const toast = useToast({
    duration: 5000,
    isClosable: true,
    position: "top",
  });
  const { setValue, watch, getValues } =
    useFormContext<ProductDetailInterface>();
  const fileImgs = watch("fileImgs");
  const maxFiles = 3;
  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejection: FileRejection[]) => {
      if (acceptedFiles.length > 0) {
        const oldFileImgs = getValues("fileImgs");
        const newFileImgs = [];
        if (oldFileImgs) {
          if (oldFileImgs?.length === maxFiles) {
            toast({
              title: "All Images slot are full",
              description: `delete some images`,
              status: "warning",
            });
            return;
          }
          const slotLeft = maxFiles - oldFileImgs?.length;
          for (let i = 0; i < slotLeft; i++) {
            if (acceptedFiles[i]) {
              newFileImgs.push(acceptedFiles[i]);
            }
          }
          const fileImgsWithPreview = newFileImgs.map((f) =>
            Object.assign(f, {
              preview: URL.createObjectURL(f),
            })
          );

          setValue("fileImgs", [...oldFileImgs, ...fileImgsWithPreview]);
          return;
        }
        newFileImgs.push(...acceptedFiles);

        const fileImgs = acceptedFiles.map((f) =>
          Object.assign(f, {
            preview: URL.createObjectURL(f),
          })
        );
        setValue("fileImgs", fileImgs);
        return;
      }
      toast({
        title: "error file rejection",
        description: `drop too many file or is not a image file`,
        status: "warning",
      });
    },
    []
  );

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({
      onError: (err) => console.log(err),
      onDrop,
      maxFiles,
      accept: {
        "image/*": [],
      },
    });

  const deleteImg = (preview: string) => {
    const delFileImgs = fileImgs?.filter((f) => f.preview !== preview);
    URL.revokeObjectURL(preview);
    setValue("fileImgs", delFileImgs);
  };

  return (
    <FormControl id="fileImgs">
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
        {fileImgs?.map((f) => (
          <GridItem key={f.preview} position="relative">
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
              onClick={() => deleteImg(f.preview)}
            />
          </GridItem>
        ))}
      </Grid>
    </FormControl>
  );
}
