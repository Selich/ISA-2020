import React from "react";
import { useForm } from 'react-hook-form'
import {
	Input,
  Button,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  Icon,
  useDisclosure,
  Tab,
  Table,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

const EPrescriptionDrawer: any = ({ onClose }) => {
  const { isOpen, onOpen } = useDisclosure()
	const { register, handleSubmit } = useForm()


	const onSubmit = async (data) => {
		const formData = new FormData()
		formData.append('img', data.img[0])

		const res = await fetch('http://localhost:4000/eprescriptions', {
			method: 'POST',
			body: formData
		}).then(res => alert(res))
			.catch(e => alert(e))

		alert(JSON.stringify(res))

	}
  return (
    <>
    <DrawerContent>
      <DrawerCloseButton />
      <DrawerHeader>E-prescription</DrawerHeader>

      <DrawerBody>
        <Tabs isFitted variant="enclosed">
          <TabList mb="1em">
            <Tab>Upload</Tab>
            <Tab>Webcam</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
							<form onSubmit={handleSubmit(onSubmit)}>
								<input 
										ref={register}
										type="file"
										name="img"
								/>
							<button>
								Upload file
							</button>
							</form>

					
            </TabPanel>
            <TabPanel>
              <p>two!</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </DrawerBody>

      <DrawerFooter>
        <Button variant="outline" mr={3} onClick={onClose}>
          Cancel
        </Button>
      </DrawerFooter>
    </DrawerContent>
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
                  <Th isNumeric>Sum Price</Th>
                  <Th></Th>
                  <Th></Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>Pharmacy</Td>
                  <Td>Bulevar despota Stefana 7a</Td>
                  <Td isNumeric>100</Td>
                  <Td></Td>
                  <Td>
                    <Button colorScheme="teal" color="white">
                      <Icon></Icon>
                    </Button>
                  </Td>
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
  );
}


export default EPrescriptionDrawer;

