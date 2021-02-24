import NextLink from "next/link";
import {
  Button,
  Box,
  Flex,
  Heading,
  Stack,
} from "@chakra-ui/react"

import React from 'react'


const HomeLayout = ({
  title,
  subtitle,
  image,
  ctaLink,
  ctaText,
  ...rest
}): JSX.Element => {

  return (
    <Flex
      align="center"
      justify={{ base: "center", md: "space-around", xl: "space-between" }}
      direction={{ base: "column-reverse", md: "row" }}
      minH="70vh"
      px={8}
      mb={16}
      {...rest}
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
          {title}
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
          {subtitle}
        </Heading>
        <NextLink href="/register">
          <Button
            colorScheme="teal"
            borderRadius="8px"
            py="4"
            px="4"
            lineHeight="1"
            size="md"
          >
            {ctaText}
          </Button>
        </NextLink>
      </Stack>
      <Box w={{ base: "80%", sm: "60%", md: "50%" }} mb={{ base: 12, md: 0 }}>
        {/* <Subscribe></Subscribe> */}
      </Box>
    </Flex>
  )

}

export default HomeLayout;

interface Index {
  title: string,
  subtitle: string,
  ctaText: string,
  ctaLink: string,
}

HomeLayout.defaultProps = {
  title: "Apoteke Melem",
  subtitle:
    "Lako u jednom kliku mozete pristupiti nasim servisima",
  ctaText: "Registruj me"
}
