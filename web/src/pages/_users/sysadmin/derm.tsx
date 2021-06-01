import React from 'react'
import { useDisclosure, Button, Box } from "@chakra-ui/react"
import {EmployeeTable} from '../../../components/tables/EmployeeTable'
import {AddDermModal} from '../../../components/sections/modal/AddDermModal'

const Derms = ()=> {
	  const addPharmModal = useDisclosure()

    return (
        <>
            <Box m={10} mx={20}>
							<Button m={2} mt={8} onClick={() => addPharmModal.onOpen()} colorScheme="teal">Add Dermatologist +</Button>
                <EmployeeTable/>
            </Box>
						<AddDermModal
							isOpen={addPharmModal.isOpen}
							onOpen={addPharmModal.onOpen}
							onClose={addPharmModal.onClose}
						/>
        </>
    )

}

export default Derms;
