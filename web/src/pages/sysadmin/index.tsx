import React, { useState, useEffect } from "react";
import NextLink from "next/link";
import {
  HStack,
  Box,
  Link,
  Flex,
  Button,
  Text,
  Heading,
  SimpleGrid,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Avatar,
  Icon,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Input,
  useDisclosure,
  Stack,
  Table,
  TableCaption,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

import { MyCalendar } from "../../components/sections/Calendar";

export default function Index() {
  const [data, setData] = useState({});

  useEffect(() => {
    let user = localStorage.getItem("user");
    user = JSON.parse(user);
    setData(user);
  }, []);
  return (
    <>
      <Box
        m="4"
        p="8"
        border="1px"
        rounded="2px"
        borderColor="gray.300"
        boxShadow="md"
        bg="grey.200"
        color="#2d383c"
        fontSize="2rem"
        textAlign="center"
        h="1200px"
      >
        <SimpleGrid columns={3} spacing={0} maxH="600px">
          <Box align="left">
            <Text fontSize={28}>Dashboard</Text>
            <Text fontSize={12}>SysAdmin</Text>
            <hr />
          </Box>
          <Box align="right"></Box>
          <Box align="right">
            <Box>
              <NextLink href="/sysadmin/pharmacies">
                <Button w={180}>Pharmacies</Button>
              </NextLink>
            </Box>
            <Box>
              <NextLink href="/sysadmin/derm">
                <Button w={180}>Dermatologists</Button>
              </NextLink>
            </Box>
            <Box>
              <NextLink href="/sysadmin/suppliers">
                <Button w={180}>Suppliers</Button>
              </NextLink>
            </Box>
            <Box>
              <NextLink href="/sysadmin/medicines">
                <Button w={180}>Medicines</Button>
              </NextLink>
            </Box>
            <Box>
              <NextLink href="/sysadmin/complaints">
                <Button w={180}>Complaint</Button>
              </NextLink>
            </Box>
            <Box>
              <NextLink href="/sysadmin/loyalty">
                <Button w={180}>Loyalty Program</Button>
              </NextLink>
            </Box>
            <Box>
              <NextLink href="/sysadmin/list">
                <Button w={180}>Sys Admins</Button>
              </NextLink>
            </Box>
          </Box>
        </SimpleGrid>
      </Box>
    </>
  );
}
