import React, {useState, useEffect} from "react";
import { Box, Flex } from "@chakra-ui/react";
import { LeftMenu, GuestMenu, UserMenu, EmployeeMenu, PharmAdminMenu, SysAdminMenu} from "../menus/Menus";
import Cookies from "js-cookie";
import { useMeQuery } from "../../generated/graphql";
import { Loading } from "../Loading";


export const Header: any = ({user, setUser}) => {
  let token = Cookies.get('token')
	let [{fetching, data}] = useMeQuery({variables:{
    token: token
  }})

  let body = null;
	if (!token) {
	 body = ( <GuestMenu setUser={setUser}/>)
  } else {
    if (fetching) body = <Loading/>;
    else if (!data) body = <Loading/>;
    else {
      body = ( <UserMenu setUser={setUser} user={user}/>)
    }

  }

  useEffect(() => {
  }, [user])

  return (
    <Flex zIndex={1} position="sticky" top={0} bg="gray.200" p={4}>
      <Flex flex={1} m="auto" align="center" maxW={800}>
        <LeftMenu />
        <Box ml={"auto"}>{body}</Box>
      </Flex>
    </Flex>
  );
};
