import React from 'react'
import { Header } from '../components/sections/Header'
import {
  useDisclosure,
  Box,
  Grid,
  GridItem,
} from "@chakra-ui/react"
import Card from '../components/ui/Card'

const Shop = (): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const items = []
  const data = null

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

export default Shop;
