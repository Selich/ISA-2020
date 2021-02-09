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
  let [{data ,error, fetching}]  = useMeQuery({});
  let body = null;


	if (error) return <p> {error.message} </p>
	if (fetching){
		body = (<div>loading</div>)
	} else if (!data.me) {
	 body = ( <GuestMenu/>)
  } else {
		console.log(data)
		//@ts-ignore
		if(data.me.role === "patient")
      body = ( <UserMenu user={data.me}/>)
		//@ts-ignore
    else if(data.me.role === "derm" || data.me.role === "pharm")
      body = ( <EmployeeMenu user={data.me}/>)
		//@ts-ignore
    else if(data.me.role === "admin")
      body = ( <PharmAdminMenu user={data.me}/>)
		//@ts-ignore
    else if(data.me.role === "sys-admin")
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
