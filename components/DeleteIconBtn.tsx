import { SmallCloseIcon } from "@chakra-ui/icons";
import { IconButton, IconButtonProps } from "@chakra-ui/react";
import React from "react";

export default function DeleteIconBtn({
  size = "sm",
  rounded = "full",
  colorScheme = "red",
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
      icon={<SmallCloseIcon />}
      onClick={onClick}
    />
  );
}
