import {
  Flex, Heading, Stack,
} from "@chakra-ui/react"

import React from 'react'

const HomeLayout = (): JSX.Element => {

  return (
    <Flex
      align="center"
      justify={{ base: "center", md: "space-around", xl: "space-between" }}
      direction={{ base: "column-reverse", md: "row" }}
      minH="70vh"
      px={8}
      mb={16}
    >
      <Stack
        spacing={4}
        w={{ base: "80%", md: "40%" }}
        align={["center", "center", "flex-start", "flex-start"]}
      >
        <Heading
          as="h1"
          size="xl"
          fontWeight="bold"
          color="primary.800"
          textAlign={["center", "center", "left", "left"]}
        >
        </Heading>
        <Heading
          as="h2"
          size="md"
          color="teal.800"
          opacity="0.8"
          fontWeight="normal"
          lineHeight={1.5}
          textAlign={["center", "center", "left", "left"]}
        >
        </Heading>
      </Stack>
    </Flex>
  )

}

export default HomeLayout;