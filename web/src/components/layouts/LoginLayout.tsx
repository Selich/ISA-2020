import React from 'react'
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
} from "@chakra-ui/react"
import LoginForm from '../sections/LoginForm'


export default function LoginLayout() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <div></div>
  )
}
