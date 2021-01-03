import {  VStack, Text, Button, HStack, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Center } from "@chakra-ui/react";
import React from "react";
import TierForm from "../forms/TierForm";
import { FaFacebook } from 'react-icons/fa'


export const SubscribeModal: any = ({ data, onOpen, isOpen, onClose }) => {
    const btnRef = React.useRef()
    return (
        <Modal isOpen={isOpen} onClose={onClose} size="xs" isCentered>
            <ModalOverlay />
            <ModalContent maxW="56rem" maxH="106rem">
                <ModalCloseButton />
                <ModalBody>
                    <ModalBody alignContent="center" alignItems="center">
                        <Center>
                            <VStack>

                                <Text fontSize="2xl">Confirm subscribing to the {data.name}?</Text>
                            </VStack>
                        </Center>

                    </ModalBody>
                </ModalBody>
                <ModalFooter >
                                <HStack>

                                <Button colorScheme="teal" onClick={() => {
                                    onClose()
                                }}>Confirm</Button>
                                <Button colorScheme="red" onClick={() => {
                                    onClose()
                                }}>Cancel</Button>
                                </HStack>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );

};
