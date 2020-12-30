import { Text, Box, Flex, Center, SimpleGrid, Avatar } from "@chakra-ui/react";
import React from "react";
import { Header } from "../../components/sections/Header";
import { useMeQuery } from "../../generated/graphql";


export default function Appointments() {
  const data = {}
  return (
    <>
      <Header />
      <SimpleGrid minChildWidth="410px">
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
        h="400px"
      >

      </Box>
      </SimpleGrid>
    </>
  );
}



