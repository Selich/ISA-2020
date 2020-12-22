import React from "react";
import NextLink from "next/link";
import { Link, Button, Box } from "@chakra-ui/react";


export const LeftMenu: any = () => {

  return (
    <>
        <NextLink href="/">
          <Button as={Link} mr={3}>
            Home
          </Button>
        </NextLink>
        <NextLink href="/shop">
          <Button as={Link} mr={3}>
            Shop
          </Button>
        </NextLink>
        <NextLink href="/pharmacies">
          <Button as={Link} mr={3}>
            Pharmicies
        </Button>
        </NextLink>
        </>
  );
};
