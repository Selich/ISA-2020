import LoginForm from '../components/sections/LoginForm'
import { Header } from '../components/sections/Header'
import NextLink from "next/link";
import { ProductCard, Price } from "react-ui-cards";
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
  Grid,
  GridItem,
  Center,
} from "@chakra-ui/react"
import Card from '../components/ui/Card'

import React from 'react'

const Shop = (): JSX.Element => {
  // TODO: Item open modal
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Header onOpen={onOpen} />

<Grid p={10}templateColumns="repeat(7, 1fr)" gap={1}>
  <GridItem colSpan={2} h="40" bg="tomato" p={3}>
            <Box maxW="sm" border-width="1px" rounded="lg" overflow="hidden" bg="red">
              <Card/>
            </Box>
            </GridItem>
  <GridItem colStart={3} colEnd={10} h="40" bg="papayawhip" >
          <Grid p={10} w="100%" templateColumns="repeat(3, 1fr)" gap="6" >
            <GridItem  >
              <Box maxW="sm" border-width="1px" rounded="lg" overflow="hidden" bg="red">
                <Card/>
              </Box>
            </GridItem>
            <GridItem  >
              <Box maxW="sm" border-width="1px" rounded="lg" overflow="hidden" bg="red">
                <Card/>
              </Box>
            </GridItem>
            <GridItem  >
              <Box maxW="sm" border-width="1px" rounded="lg" overflow="hidden" bg="red">
                <Card/>
              </Box>
            </GridItem>
          </Grid>
  </GridItem>
</Grid>
    </>
  )

}

export default Shop;
