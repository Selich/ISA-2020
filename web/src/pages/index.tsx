import LoginForm from '../components/sections/LoginForm'
import { Header } from '../components/sections/Header'
import NextLink from "next/link";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Box,
  Flex,
  Heading,
  Link,
  Stack,
} from "@chakra-ui/react"

import mapStyles from '../styles/mapStyles'
import React from 'react'


const mapStyle = {
  width: '100vw',
  height: '100vh',
}
const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};

// TODO! Maps! @Selich
const center = {
  lat: 12.9529,
  log: 80.2413,
}
const Index = ({
  title,
  subtitle,
  image,
  ctaLink,
  ctaText,
  ...rest
}): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Header onOpen={onOpen} />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Login</ModalHeader>
          <LoginForm isOpen={isOpen} onClose={onClose}/>

        </ModalContent>
      </Modal>
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
      </Box>
    </Flex>

    </>
  )

}

export default Index;

interface Index {
  title: string,
  subtitle: string,
  ctaText: string,
  ctaLink: string,
}

Index.defaultProps = {
  title: "React landing page with Chakra UI",
  subtitle:
    "This is the subheader section where you describe the basic benefits of your product",
  ctaText: "Create your account now",
  ctaLink: "/signup",
}
