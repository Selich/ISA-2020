import React from "react";
import { Box, Link, Flex, Button, Text, Heading, SimpleGrid, Menu, MenuButton, MenuItem, MenuList, Avatar, Icon, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Input, useDisclosure, Stack, Table, TableCaption, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { HistoryModal } from "../../components/sections/modal/HistoryModal";
import { SubscriptionModal } from "../../components/sections/modal/SubscriptionModal";
import { AppointmentsModal } from "../../components/sections/modal/AppointmentsModal";
import { Header } from "../../components/sections/Header";
import { useMeQuery } from "../../generated/graphql";
import { ScheduleExamModal } from "../../components/sections/modal/ScheduleExamModal";
import { EditProfileModal } from "../../components/sections/modal/EditProfileModal";
import { AddAllergieModal } from "../../components/sections/modal/AddAllergieModal";
import { SubListModal } from "../../components/sections/modal/SubListModal";
import { FormInput } from '../../components/sections/FormInput'



export default function Profile() {
  let [{ data, fetching }] = useMeQuery();
  const editModal = useDisclosure()
  const subModal = useDisclosure()
  const addAllergie = useDisclosure()
	let body = null
	let user = null
	if (fetching){

	} else if (!data.me){
		body = <p> Loading </p>

	} else {
		user = localStorage.getItem('user')
		user = JSON.parse(user)
		body = (
				<>
          <Avatar name={user.email.split('@')[0]} src="" size="2xl" margin={4} pd={3} />
          <Text>{user.firstName} {user.lastName}</Text>
          <Text fontSize={17}>Email: {user.email}</Text>
				{(user.telephone)
					?  (<Text fontSize={17} >Number: {user.telephone}</Text>)
					:  (<Text fontSize={17} >Number: Not added</Text>)
				}

          <Text fontSize={17}>Address:</Text>
					{ (user.address)  
						?  (<Text fontSize={14}>
							{user.address.street + " "
							+ user.address.city + " "
							+ user.address.country}
							</Text>)
						: (<Text fontSize={14}>No added address</Text>)
					}
					<hr/>
					<Text fontSize={17}>Points: {(user.points) ? user.points : 0} </Text>
		<Text fontSize={17}>Tier: {(user.tier) ? user.tier.name : 'No Tier'} </Text>
					
				</>
		)

	}
  return (
    <>
      <Box
        m="4"
        p="8"
        border="1px"
        rounded="2px"
        borderColor="gray.300"
        boxShadow="md"
        bg="grey.200"
        color="#2d383c"
        fontSize="2rem"
        textAlign="center"
        h="400px"
      >
      <SimpleGrid columns={2}>
			<Box align="left">
				{body}	
        </Box>
        <Box align="right">
					<Box> <Button w={180} onClick={editModal.onOpen}>Edit Profile</Button> </Box>
					<Box> <Button w={180} onClick={addAllergie.onOpen}>Add Allergie</Button> </Box>
					<Box> <Button w={180} onClick={subModal.onOpen}>Subscriptions</Button> </Box>
        </Box>
			</SimpleGrid>
      </Box>
      <AddAllergieModal
        onOpen={addAllergie.onOpen}
        isOpen={addAllergie.isOpen}
        onClose={addAllergie.onClose}
      />
      <EditProfileModal
        onOpen={editModal.onOpen}
        isOpen={editModal.isOpen}
        onClose={editModal.onClose}
      />
      <SubListModal
        onOpen={subModal.onOpen}
        isOpen={subModal.isOpen}
        onClose={subModal.onClose}
      />
    </>
  );
}



function ProfileData() {
	return (
          <Form>
            <SimpleGrid columns={3} m={-50} mx={-80} spacing={9} >
                <Box m={0} mr={0} >
            <Box mt={5}>
              <FormInput name="email" placeholder="email" label="Email" />
            </Box>
            <Box mt={5}>
              <FormInputPassword name="password" placeholder="password" label="Password" type="password" />
            </Box>
            <Box mt={5}>
              <FormInputPassword name="confirmPassword" placeholder="confirmPassword" label="Confirm Password" type="password" />
            </Box>
            </Box>
             <Box m={0} mr={0} >
								<Box mt={5}>
									<FormInput name="firstName" placeholder="First Name" label="First Name" />
								</Box>
								<Box mt={5}>
									<FormInput name="lastName" placeholder="Last Name" label="Last Name" />
								</Box>
								<Box mt={5}>
									<FormInput name="telephone" placeholder="+38160123456" label="Telephone" />
								</Box>
            </Box>
             <Box m={0} mr={0} >
								<Box mt={5}>
									<FormInput name="street" placeholder="address" label="Address" />
								</Box>
								<Box mt={5}>
									<FormInput name="city" placeholder="city" label="City" />
								</Box>
								<Box mt={5}>
									<FormInput name="county" placeholder="country" label="Country" />
								</Box>
            </Box>
            <Button
              mt={4}
              type="submit"
              colorScheme="teal"
            >
              Register
              </Button>
					</SimpleGrid>
          </Form>

	)

} 
