import {
  Link as ChakraLink,
  Text,
  Code,
  List,
  ListIcon,
  ListItem,
} from '@chakra-ui/react'
import { CheckCircleIcon, LinkIcon } from '@chakra-ui/icons'
import { Hero } from '../components/Hero'
import { Container } from '../components/Container'
import { Main } from '../components/Main'
import { DarkModeSwitch } from '../components/DarkModeSwitch'
import { CTA } from '../components/CTA'
import { Footer } from '../components/Footer'
import LoginForm from '../components/sections/LoginForm'
import { Header } from '../components/sections/Header'
import DermLayout from '../components/layouts/DermLayout'
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

const user = {
  role: 'derm',
  email: 'nesto'
}

const Index = (): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Header onOpen={onOpen} />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Login</ModalHeader>
          <LoginForm isOpen={isOpen} onClose={onClose}/>

        </ModalContent>
      </Modal>
      <DermLayout/>
    </>
  )

}

export default Index
