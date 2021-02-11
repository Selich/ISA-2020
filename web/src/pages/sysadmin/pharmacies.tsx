import React from 'react'
import { useDisclosure, Button, Box } from "@chakra-ui/react"
import PharmaciesTable from '../../components/tables/PharmaciesTable'
import {AddPharmacyModal} from '../../components/sections/modal/AddPharmacyModal'
import {AddAdminModal} from '../../components/sections/modal/AddAdminModal'

const Pharmacies = (): JSX.Element => {
	  const addPharmModal = useDisclosure()
	  const addAdminModal = useDisclosure()

    return (
        <>
            <Box m={10} mx={20}>
							<Button m={2} mt={8} onClick={() => addPharmModal.onOpen()} colorScheme="teal">Add Pharmacy +</Button>
							<Button m={2} mt={8} onClick={() => addAdminModal.onOpen()} colorScheme="teal">Add Admin +</Button>
                <PharmaciesTable/>
            </Box>
						<AddPharmacyModal
								isOpen={addPharmModal.isOpen}
								onOpen={addPharmModal.onOpen}
								onClose={addPharmModal.onClose}
						/>
						<AddAdminModal
								isOpen={addAdminModal.isOpen}
								onOpen={addAdminModal.onOpen}
								onClose={addAdminModal.onClose}
						/>
        </>
    )

}

export default Pharmacies;