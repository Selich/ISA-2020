import React from "react";
import { Box, Link, Flex, Button, Heading } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import LoginLayout from '../layouts/LoginLayout'

interface NavBarProps {}

export const Header: any = (props) => {
  const router = useRouter();


  let body = (
    <Flex align="center">
      <Button onClick={props.onOpen} as={Link} mr={4}>
          Login
      </Button>
      <NextLink href="/register">
        <Button as={Link} mr={4}>
          Register
        </Button>
      </NextLink>
    </Flex>
  );

  return (
    <Flex zIndex={1} position="sticky" top={0} bg="gray.200" p={4}>
      <Flex flex={1} m="auto" align="center" maxW={800}>
        <NextLink href="/">
          <Link>
            <Heading>Pharmacy</Heading>
          </Link>
        </NextLink>
        <Box ml={"auto"}>{body}</Box>
      </Flex>
    </Flex>
  );
};
