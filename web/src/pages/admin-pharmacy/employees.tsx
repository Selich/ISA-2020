import React from 'react'
import LoginForm from '../../components/sections/LoginForm'
import { Header } from '../../components/sections/Header'
import { ItemGrid } from '../../components/ui/ItemGrid'
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
import Card from '../../components/ui/Card'
import ReactCollapsingTable from 'react-collapsing-table'
let rows = [
  { id: 1, firstName: 'Paul', lastName: 'Darragh', }
]
let columns = [
  { accessor: 'firstName', label: 'First Name', priorityLevel: 1, position: 1, minWidth: 150, },
  { accessor: 'lastName', label: 'Last Name', priorityLevel: 2, position: 2, minWidth: 150, },
]

// import { useMedicinesQuery } from '../generated/graphql';

const Employees = (): JSX.Element => {
  // const [{ data }] = useMedicinesQuery({});
  const { isOpen, onOpen, onClose } = useDisclosure()
  // const medicines = data.medicines
  const data = [];
  const items = [];
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
                items.map(item =>
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

export default Employees;
