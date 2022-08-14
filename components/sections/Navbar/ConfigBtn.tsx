import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon, HamburgerIcon, AddIcon } from "@chakra-ui/icons";
import { GrConfigure } from "react-icons/gr";

import React from "react";
import NavLink from "./NavLink";

type Props = {};

export default function ConfigBtn({}: Props) {
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<GrConfigure />}
        variant="outline"
      />
      <MenuList>
        <NavLink href="product/new">
          <MenuItem icon={<AddIcon />}>Add Product</MenuItem>
        </NavLink>
      </MenuList>
    </Menu>
  );
}
