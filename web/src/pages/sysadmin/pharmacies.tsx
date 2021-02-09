import React from 'react'
import { useDisclosure, Button, Box } from "@chakra-ui/react"
import PharmaciesTable from '../../components/tables/PharmaciesTable'
import {AddPharmacyModal} from '../../components/sections/modal/AddPharmacyModal'

const Pharmacies = (): JSX.Element => {
	  const addPharmModal = useDisclosure()

    return (
        <>
            <Box m={10} mx={20}>
							<Button mt={8} onClick={() => addPharmModal.onOpen}colorScheme="teal">Add Pharmacy +</Button>
                <PharmaciesTable/>
            </Box>
						<AddPharmacyModal
								isOpen={addPharmModal.isOpen}
								onOpen={addPharmModal.onOpen}
								onClose={addPharmModal.onClose}
						/>
        </>
    )

}

export default Pharmacies;
