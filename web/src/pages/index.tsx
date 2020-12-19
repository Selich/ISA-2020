import LoginForm from '../components/sections/LoginForm'
import { Header } from '../components/sections/Header'
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

import mapStyles from '../styles/mapStyles'


const mapStyle = {
  width: '100vw',
  height: '100vh',
}
const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};

// TODO! Maps! @Selich
const center = {
  lat: 12.9529,
  log: 80.2413,
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
      {/* <GoogleMap options={options} zoom={8} center={center} mapContainerStyle={mapStyle}/> */}
    </>
  )

}

export default Index;
