import { StarIcon } from "@chakra-ui/icons"
import { Image, Box, Badge } from "@chakra-ui/react"
import React from "react"

export default function Card(item): any{
  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" bg="white">
      <Image src={item.image} alt="" />

      <Box p="6">
        <Box d="flex" alignItems="baseline">
          <Badge borderRadius="full" px="2" colorScheme="teal">
            New
          </Badge>
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml="2"
          >
            {item.type}
          </Box>
        </Box>

        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
        >
          {item.quantity}
        </Box>

        <Box>
          {item.price}
          <Box as="span" color="gray.600" fontSize="sm">
            123123
          </Box>
        </Box>

        <Box d="flex" mt="2" alignItems="center">
          {Array(5)
            .fill("")
            .map((_, i) => (
              <StarIcon
                key={i}
                color={i < item.rating ? "teal.500" : "gray.300"}
              />
            ))}
          <Box as="span" ml="2" color="gray.600" fontSize="sm">
            {item.reviewCount} reviews
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
