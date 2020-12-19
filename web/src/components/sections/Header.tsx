import React from "react";
import { Image, Box, Link, Flex, Button, Heading } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import LoginLayout from '../layouts/LoginLayout'
import { useLogoutMutation, useMeQuery } from "../../generated/graphql";

interface NavBarProps {}

export const Header: any = (props) => {
  const router = useRouter();
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const [{ data, fetching }] = useMeQuery();
  let body = null;
  // data is loading
  if (fetching) {
    // user not logged in
  } else if (!data?.me) {
    body = (
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
    // user is logged in
  } else {
    body = (
      <Flex align="center">
        <Box mr={2}>Role:  {data.me.role}</Box>
      <NextLink href="/admin-pharmacy/medicines">
        <Button as={Link} mr={4}>
          Create Medicine
        </Button>
      </NextLink>
        <Button
            mr={4}
            onClick={() => {
              logout();
            }}
            isLoading={logoutFetching}
            variant="link"
          >
          Logout
          </Button>
      </Flex>
    );
  }

  return (
    <Flex zIndex={1} position="sticky" top={0} bg="gray.200" p={4}>
      <Flex flex={1} m="auto" align="center" maxW={800}>
        <NextLink href="/">
          <Link>
            <Image src="../resources/logo.png"></Image>
          </Link>
        </NextLink>
        <Box ml={"auto"}>{body}</Box>
      </Flex>
    </Flex>
  );
};
