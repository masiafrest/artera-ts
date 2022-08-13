import React, { AnchorHTMLAttributes, ReactNode } from "react";

import { Box, Link, Text } from "@chakra-ui/react";

import NextLink from "next/link";

type Props = {
  children: ReactNode;
  href: string;
  onClose?: () => void;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

export default function NavLink({ children, href, ...rest }: Props) {
  return (
    <Box
      onClick={() => {
        rest.onClose?.();
      }}
    >
      <NextLink {...rest} href={href} passHref>
        <Link>
          <Text>{children}</Text>
        </Link>
      </NextLink>
    </Box>
  );
}
