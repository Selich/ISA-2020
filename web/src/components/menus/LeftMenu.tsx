import React from 'react';
import NextLink from 'next/link';
import { Link, Button, Box } from '@chakra-ui/react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useLogoutMutation } from '../../generated/graphql';

const LeftMenu: any = () => {
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const router = useRouter()

  return (
    <>
      <NextLink href="/">
        {/* @ts-ignore */}
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
          <Button
            mr={4}
            onClick={() => {
              logout();
              Cookies.remove('token')
              router.push('/')
            }}
            isLoading={logoutFetching}
            >
            <span>Logout</span>
          </Button>
    </>
  );
};

export default LeftMenu;