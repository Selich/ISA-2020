import { StarIcon } from "@chakra-ui/icons"
import { Badge, Box, Button, Icon, Image, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Table, Tbody, Td, Th, Thead, Tr, useDisclosure } from "@chakra-ui/react"
import React from "react"

export default function Card(item): any {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
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
            <Button onClick={onOpen}>
              Buy
          {/* <Icon as={GrBasket} /> */}
            </Button>
          </Box>
        </Box>
      </Box>
      <Modal isOpen={isOpen} size="full" onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Pharmacy List</ModalHeader>
          <ModalBody pb={6}>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Pharmacy</Th>
                  <Th>Address</Th>
                  <Th isNumeric>Price</Th>
                  <Th isNumeric>Quantity</Th>
                  <Th></Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>Pharmacy</Td>
                  <Td>Bulevar despota Stefana 7a</Td>
                  <Td isNumeric>1</Td>
                  <Td isNumeric>
                    <NumberInput>
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>

                  </Td>
                  <Td><Button colorScheme="teal" color="white">Buy</Button></Td>
                  <Td>
                    <Button colorScheme="teal" color="white">
                      <Icon></Icon>
                    </Button>
                  </Td>
                </Tr>
              </Tbody>
            </Table>

          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
