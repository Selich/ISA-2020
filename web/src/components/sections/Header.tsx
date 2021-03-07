import React, {useState, useEffect} from "react";
import { Box, Flex } from "@chakra-ui/react";
import { LeftMenu, GuestMenu, UserMenu, EmployeeMenu, PharmAdminMenu, SysAdminMenu} from "../menus/Menus";


export const Header: any = ({user, setUser}) => {

  let body = null;

	if (!user) {
	 body = ( <GuestMenu setUser={setUser}/>)
  } else {
		if(user.role === "patient")
      body = ( <UserMenu setUser={setUser} user={user}/>)
    else if(user.role === "derm" || user.role === "pharm")
      body = ( <EmployeeMenu setUser={setUser} user={user}/>)
    else if(user.role === "admin")
      body = ( <PharmAdminMenu setUser={setUser} user={user}/>)
    else if(user.role === "sysadmin")
      body = ( <SysAdminMenu setUser={setUser} user={user}/>)
  }

  return (
    <Flex zIndex={1} position="sticky" top={0} bg="gray.200" p={4}>
      <Flex flex={1} m="auto" align="center" maxW={800}>
        <LeftMenu />
        <Box ml={"auto"}>{body}</Box>
      </Flex>
    </Flex>
  );
};
