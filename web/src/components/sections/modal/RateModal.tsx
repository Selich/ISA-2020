import { VStack, Text, Button, HStack, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Center } from "@chakra-ui/react";
import ReactStars from "react-rating-stars-component";
import React from "react";

export const RateModal: any = ({ onOpen, isOpen, onClose, data }) => {
    const btnRef = React.useRef()
    return (
        <Modal isOpen={isOpen} onClose={onClose} size="xs" isCentered>
            <ModalOverlay />
            <ModalContent maxW="56rem" maxH="106rem">
                <ModalHeader><Text fontSize="3xl"></Text> </ModalHeader>
                <ModalCloseButton />
                <ModalBody alignContent="center" alignItems="center">
                    <Center>
                        <VStack>


                            <Text fontSize="2xl">How would you rate {(data.lastName === undefined) ? data.name : "Dr. " + data.lastName} ? </Text>
                            <ReactStars
                                count={5}
                                onChange={(val) => alert(val)}
                                size={32}
                                activeColor='#008080'
                            >
                            </ReactStars>
                            <Button onClick={() => {
                                onClose()

                            }}>Confirm</Button>
                        </VStack>
                    </Center>

                </ModalBody>
                <ModalFooter >
                </ModalFooter>
            </ModalContent>
        </Modal>
    );

};
