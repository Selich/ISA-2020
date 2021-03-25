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
			<div style={{background: `url('${process.env.PUBLIC_URL}/hero.jpg')`}}/ >
    </Flex>
  )

}

export default HomeLayout;
