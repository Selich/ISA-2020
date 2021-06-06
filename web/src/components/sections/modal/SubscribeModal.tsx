import {
  VStack,
  Text,
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Center,
} from "@chakra-ui/react";
import React from "react";
import { useSubscribeMutation } from "../../../generated/graphql";
import swal from "sweetalert";
import Cookies from "js-cookie";

export const SubscribeModal: any = ({ selected, isOpen, onClose }) => {
  const [, subscribe] = useSubscribeMutation();
  const token = Cookies.get('token')

  const btnRef = React.useRef();
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xs" isCentered>
      <ModalOverlay />
      <ModalContent maxW="56rem" maxH="106rem">
        <ModalCloseButton />
        <ModalBody>
          <ModalBody alignContent="center" alignItems="center">
            <Center>
              <VStack>
                <Text fontSize="2xl">
                  {/* Confirm subscribing to the {data.name}? */}
                </Text>
              </VStack>
            </Center>
          </ModalBody>
        </ModalBody>
        <ModalFooter>
          <HStack>
            <Button
              colorScheme="teal"
              onClick={() => {
								let req = {
									inputs: {
										pharmacy: {
											id: parseInt(selected.id)
										},
									},
                  token: token
								}
								console.log(req)
								subscribe(req).then(res => {
                  console.log(res)
                  onClose();
                })
              }}
            >
              Confirm
            </Button>
            <Button
              colorScheme="red"
              onClick={() => {
                onClose();
              }}
            >
              Cancel
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
