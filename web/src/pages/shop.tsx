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
import { useMedicinesQuery } from '../generated/graphql';

const Shop = (): JSX.Element => {
  const [{ data }] = useMedicinesQuery({});
  const { isOpen, onOpen, onClose } = useDisclosure()
  // const medicines = data.medicines
  const medicines = [
    {
      image: "https://bit.ly/2Z4KKcF",
      imageAlt: "Rear view of modern home with pool",
      type: "dset",
      title: "Modern home in city center in the heart of historic Los Angeles",
      formattedPrice: "$1,900.00",
      reviewCount: 34,
      rating: 4,
    },
    {
      image: "https://bit.ly/2Z4KKcF",
      imageAlt: "Rear view of modern home with pool",
      type: "sas",
      title: "Modern home in city center in the heart of historic Los Angeles",
      formattedPrice: "$1,900.00",
      reviewCount: 34,
      rating: 4,
    }
  ]

  return (
    <>
      <Header onOpen={onOpen} />

      <Grid p={10} templateColumns="repeat(7, 1fr)" gap={1}>
        <GridItem colSpan={2} h="40" bg="tomato" p={3}>
          <Box maxW="sm" border-width="1px" rounded="lg" overflow="hidden" bg="red">
          </Box>
        </GridItem>
        <GridItem colStart={3} colEnd={10} h="40" bg="papayawhip" >
          <Grid p={10} w="100%" templateColumns="repeat(3, 1fr)" gap="6" >
            {/* @ts-ignore */}
            {!data ? (
                <div>loading...</div>
            ) : (
                medicines.map(item =>
                  (<GridItem>
                    <Box maxW="sm" border-width="1px" rounded="lg" overflow="hidden" bg="red">
                      <Card item={item} />
                    </Box>
                  </GridItem>)))}
          </Grid>
        </GridItem>
      </Grid>
    </>
  )

}

export default Shop;
