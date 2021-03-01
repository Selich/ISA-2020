import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import { getCurrentUser } from '../../services/authService'
import { LeftMenu, GuestMenu, UserMenu, EmployeeMenu, PharmAdminMenu, SysAdminMenu} from "../menus/Menus";


export const Header: any = () => {
  let token = ''
  let { data, role } = getCurrentUser(token)
  
  let body = null;

	if (!data || role === 'none') {
	 body = ( <GuestMenu/>)
  } else {
		if(data.me.role === "patient")
      body = ( <UserMenu user={data.me}/>)
    else if(data.me.role === "derm" || data.me.role === "pharm")
      body = ( <EmployeeMenu user={data.me}/>)
    else if(data.me.role === "admin")
      body = ( <PharmAdminMenu user={data.me}/>)
    else if(data.me.role === "sysadmin")
      body = ( <SysAdminMenu user={data.me}/>)
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
