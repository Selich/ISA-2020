import React from "react";
import { useMeQuery } from "../../generated/graphql";
import { GuestMenu } from "../menus/GuestMenu";
import { UserMenu } from "../menus/UserMenu";
import { EmployeeMenu } from "../menus/EmployeeMenu";
import { PharmAdminMenu } from "../menus/PharmAdminMenu";
import { SysAdminMenu } from "../menus/SysAdminMenu";
// @ts-ignore
import logo from '../../../resources/logo.png'
import { LeftMenu } from "../menus/LeftMenu";
import { Flex, Box } from "@chakra-ui/react";


export const Header: any = () => {
  const [{ data, fetching }] = useMeQuery();
  let body = null;
  // let data = { me: { email: "email", password: "password", role:"patient"}}
  if (false) {
  } else if (!data?.me) {
    body = ( <GuestMenu/>)
  } else {
    if(data.me.role === "patient")
      body = ( <UserMenu user={data.me}/>)
    else if(data.me.role === "derm" || data.me.role === "pharm")
      body = ( <EmployeeMenu user={data.me}/>)
    else if(data.me.role === "pharm-admin")
      body = ( <PharmAdminMenu user={data.me}/>)
    else if(data.me.role === "sys-admin")
      body = ( <SysAdminMenu user={data.me}/>)
    else
      body = (<GuestMenu/>)
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
