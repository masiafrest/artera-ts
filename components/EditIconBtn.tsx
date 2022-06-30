import { EditIcon } from "@chakra-ui/icons";
import { IconButton, IconButtonProps } from "@chakra-ui/react";
import React from "react";

export default function EditIconBtn({
  size = "sm",
  rounded = "full",
  colorScheme = "green",
  onClick,
  ...rest
}: IconButtonProps) {
  return (
    <IconButton
      {...rest}
      position="absolute"
      size={size}
      rounded={rounded}
      colorScheme={colorScheme}
      icon={<EditIcon />}
      onClick={onClick}
      sx={{ zIndex: 9999 }}
    />
  );
}
