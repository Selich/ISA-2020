import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import DataTable from 'react-data-table-component';
import { useContainsMedicineQuery } from '../../../generated/graphql';


export const PharmacyBuyModal: any = ({ onOpen, isOpen, onClose, item }) => {
	const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
	const [{ fetching, error, data }, containsMedicine] = useContainsMedicineQuery()
	const [list, setList] = useState([])
	const [filterText, setFilterText] = React.useState('');
	const columns = [
		{ name: 'Name', selector: 'name', sortable: true, },
		{ name: 'Price', selector: 'price', sortable: true, },
		{
			name: '',
			button: true,
			cell: () => <Button onClick={(val) => onClose()} colorScheme='teal' >Buy</ Button>,
		}
	];
	let body = null
	if (fetching) {
		body = <p> loading </p>
	} else {
		if (!data) {
			body = <Text> No pharmacies found </Text>

		} else {

			body = (
				<>
					<Text> {item.name} </Text>
					<ModalCloseButton />
					<ModalBody>
						{/* <DataTable
							columns={columns}
							noHeader
							striped
							paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
							persistTableHead
						/> */}
					</ModalBody>
				</>

			)
		}
	}
	return (
		<Modal isOpen={isOpen} onClose={onClose} size="lg">
			<ModalOverlay />
			<ModalContent maxW="56rem" maxH="106rem">
				<ModalHeader><Text fontSize="3xl">Pharmacies: </Text> </ModalHeader>
				{body}

				<ModalFooter >
				</ModalFooter>
			</ModalContent>
		</Modal>

	);

};
