import { Text, Box, Flex, Center, SimpleGrid, Avatar } from "@chakra-ui/react";
import React from "react";
import { useMeQuery } from "../../generated/graphql";


interface IFormInputs {
  email: string
  password: string
  firstName: string
  lastName: string
}

export default function ProfileCard() {
  const [{ data, fetching }] = useMeQuery();
  return (
      <Box align="left">
          <Avatar name={data.me.email.split('@')[0]} src="" size="xl" margin={4} pd={3} />
          <Text>{data.me.firstName} {data.me.lastName}</Text>
      </Box>
  );
}


