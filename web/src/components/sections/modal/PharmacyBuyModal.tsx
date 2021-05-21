import {
  useDisclosure,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useContainsMedicineQuery, useAddReservationMutation } from "../../../generated/graphql";
import { safeLoading, MyNumberInput, MyDateInput } from '../../../utils/utils'
import Cookies from "js-cookie";


export const DateModal: any = ({ pharmacy, onOpen, isOpen, onClose, item }) => {
	const date = new Date()
	const [quantity, setQuantity] = useState(1)
  const token = Cookies.get("token");
  const [, addReservation] = useAddReservationMutation();
	const [selectedDate, setSelectedDate] = useState({day: '', month: '' , year: ''})
	useEffect(() => { 
		console.log(item)
		console.log(pharmacy)
		console.log(selectedDate)
	}, [selectedDate])

	const handleSubmit = () => {
		let {day, month, year} = selectedDate
		let rdate = new Date(parseInt(year), parseInt(month), parseInt(day))
		let pharmacyId = pharmacy.id
		let medicineId = item.id

		let inputs = {
			'deadline': rdate + '',
			'pharmacyId': pharmacyId,
			'medicineId': medicineId,
			'quantity': quantity,
			'token': token
		}

		addReservation({inputs})
			.then(res => console.log(res))
			.catch(res => console.log(res))


	}
	return (
      <Modal isOpen={isOpen} onClose={onClose} size="">
        <ModalOverlay />
        <ModalContent maxW="56rem" maxH="106rem">
          <ModalHeader>
            <Text fontSize="xl">Select Date: </Text>{" "}
          </ModalHeader>
					<ModalBody>
						Date:
						<MyDateInput setter={setSelectedDate}/>
						Quantity:
						<MyNumberInput setter={setQuantity} defaultValue={quantity} min={1} max={20}/>
					</ModalBody>
					<ModalFooter>
						<Button mt={4} colorScheme="teal" onClick={() => handleSubmit()}> 
              Submit
            </Button>
					</ModalFooter>
        </ModalContent>
      </Modal>

	);
};

export const PharmacyBuyModal: any = ({ onOpen, patient, isOpen, onClose, item }) => {
  const [resetPaginationToggle, ] = useState(false);
	const [pharmacy, setPharmacy] = useState()
  const dateModal = useDisclosure();
	if(!item)  item = {id: '1'}

	const retBody = (data) => {
		const handleClick = (row) => {
				dateModal.onOpen();
				setPharmacy(row.pharmacy)
				onClose();
		}

		const columns = [
			{ name: "Name",  selector: "pharmacy.name",							sortable: true },
			{ name: "Price", selector: "medicineItem.currentPrice", sortable: true },
			{ name: "",			 button: true, cell: (row) => (
				<Button disabled={!patient} onClick={() => handleClick(row)} colorScheme="teal">Buy </Button>)}

		];
		return (
			<>
				<ModalCloseButton />
				<ModalBody>
					<DataTable
						columns={columns}
						data={data.containsMedicine}
						noHeader
						striped
						paginationResetDefaultPage={resetPaginationToggle}
						persistTableHead
					/>
				</ModalBody>
			</>

		)

	}

	let body = safeLoading(
		useContainsMedicineQuery({variables: { id: item.id + "" }}),
		retBody
	);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent maxW="56rem" maxH="106rem">
          <ModalHeader>
            <Text fontSize="3xl">Pharmacies: </Text>{" "}
          </ModalHeader>
          {body}
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
      <DateModal
				pharmacy={pharmacy}
        onOpen={dateModal.onOpen}
        isOpen={dateModal.isOpen}
        onClose={dateModal.onClose}
        item={item}
      />
    </>
  );
};
