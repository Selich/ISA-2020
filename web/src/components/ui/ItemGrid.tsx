import { Grid, GridItem, Box } from "@chakra-ui/react"
import React from "react"
import Card from "./Card"

export const ItemGrid = ({ items }): any => {
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
}
