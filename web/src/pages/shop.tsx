import { Text, Box, Button, Input, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import { Field, Form, Formik, useField, useFormikContext } from "formik";
import Cookies from "js-cookie";
import React, { useState } from "react";
import DataTable from "react-data-table-component";
import DatePicker from 'react-datepicker';
import { ModalComponent } from "../components/sections/modal/ModalComponent";
import { useAddReservationMutation, useContainsMedicineQuery, useShopQuery } from "../generated/graphql";


const Shop = (): JSX.Element => {
  const token = Cookies.get("token");
	const [medicine,setMedicine] = useState({id: ''})
	const [quantity,setQuantity] = useState(1)
	const [selected,setSelected] = useState({})
	const [date, setDate] = useState({day: '', month: '' , year: ''})

	const [pharmacy,setPharmacy] = useState({id: ''})

  const buyItemModal = useDisclosure();
  const dateModal = useDisclosure();
  const detailsModal = useDisclosure();

	const [{fetching, data}] = useShopQuery()


	const handlerDetails = (row) => {
		setSelected(row)
		detailsModal.onOpen()

	}

  const medicineColumns = [
    { name: "Name", selector: "name", sortable: true },
    { name: "Code", selector: "code", sortable: true },
    { name: "Form", selector: "form", sortable: true },
    { name: "Rating", selector: "rating", sortable: true },
      {
        name: "",
        button: true,
        cell: (row: any) => (
          <Button  size="sm" onClick={() => handlerDetails(row)}>
						Details
          </Button>
        ),
      },
      {
        name: "",
        button: true,
        cell: (row: any) => (
          <Button hidden={(!token)} size="sm" onClick={() => Buy(row)}>
						Buy
          </Button>
        ),
      },
	]
	const Buy = (item) => {
		setMedicine(item)
		buyItemModal.onOpen()
	}

  let body = null;
  if (fetching) body = <p>loading...</p>;
  else if (!data) body = <p>Null data...</p>;
  else {
		body = (
        <DataTable
          //@ts-ignore
          data={data.shop}
          columns={medicineColumns}
        />


		)
	}
	const details = () => {

	}
	return	(
	<>
    <Box m={10} mx={20}>
			{body}
		<ModalComponent
			handler={setPharmacy}
			disclosure={buyItemModal}
			title={'Pharmacy'}
		>
			<ContainsMedicine
			pharmacy={pharmacy}
			setPharmacy={setPharmacy}
				medicine={medicine}
				dateModal={dateModal}
			/>
			<ModalComponent
				handler={setDate}
				disclosure={dateModal}
				title={'Reservation'}
			>
				<ReservationForm pharmacy={pharmacy} medicine={medicine} onClose={dateModal.onClose} Close={buyItemModal.onClose}/>
			</ModalComponent>
		</ModalComponent>
			<DetailsModal 
			disclosure={detailsModal}
			selected={selected}

			/>
    </Box>
	</>
	)
}

const DetailsModal = ({disclosure, selected}) => {


	return (
    <Modal isOpen={disclosure.isOpen} onClose={disclosure.onClose} size="">
      <ModalOverlay />
      <ModalContent maxW="56rem" maxH="106rem">
        <ModalHeader>
          <Text fontSize="xl">Medicine Details:</Text>
        </ModalHeader>
        <ModalBody>
					<div>
					Name: {"   "}
					{selected.name}
					</div>
					<div>

					Form: {"   "}
					{selected.form}
					</div>
					<div>
					Code: {"   "}
					{selected.code}
					</div>
					<div>
					Points: {"   "}
					{selected.points}
					</div>
					<div>
					Contents: {"   "}
					{selected.contents}
					</div>
					<div>
					Rating: {"   "}
					{selected.rating}
					</div>
        </ModalBody>
      </ModalContent>
    </Modal>


	)

}

const ContainsMedicine = ({ medicine, dateModal, setPharmacy, pharmacy}) => {
	const [{fetching, data}] = useContainsMedicineQuery({variables: {id: medicine.id}})

	const Select = (item) => {
		setPharmacy(item)
		dateModal.onOpen()
	}

	const pharmacyColumns = [
		{ name: "Name",  selector: "pharmacy.name",							sortable: true },
		{ name: "Price", selector: "medicineItem.currentPrice", sortable: true },
      {
        name: "",
        button: true,
        cell: (row: any) => (
          <Button size="sm" onClick={() => Select(row)}>
						Select
          </Button>
        ),
      }
	];

  let body = null;
  if (fetching) body = <p>loading...</p>;
  else if (!data) body = <p>Null data...</p>;
  else {
		body = (
        <DataTable
          //@ts-ignore
          data={data.containsMedicine}
          columns={pharmacyColumns}
        />
		)
	}
	return body
}


export const ReservationForm = ({pharmacy, medicine, onClose, Close}) => {
	const [,addReservation] = useAddReservationMutation()
	const token = Cookies.get('token')

	const handleSubmit = (data) => {

		let inputs = {
			'deadline': data.date,
			'pharmacyId': parseInt(pharmacy.pharmacy.id),
			'medicineId': parseInt(pharmacy.medicineItem.id),
			'quantity': parseInt(data.quantity),
		}
		console.log(inputs)

		addReservation({inputs, token: token})
			.then(res => {
				console.log(res)
				if(!res.data.reserveMedicine){
					alert('Not enough items for selected quantity')
				} else {
					onClose()
					Close()
				}
			})
			.catch(res => console.log(res))
	}

	return (
		<div>
			<Formik
				initialValues={{ 
					date: "",
					quantity: "1",
				}}
				onSubmit={(data, {setSubmitting}) => {
					setSubmitting(true)
					handleSubmit(data)
					setSubmitting(false)

				}}
			>{({ values, errors, isSubmitting}) => (

				<Form>
					Date:
					<DatePickerField
					name="date"
					value={values.date}
					/>
					<div>
					Quantity
					<Field
						name="quantity"
						value={values.quantity}
						type="input"
						as={Input}
						/>
					</div>
				<div>
				<Button disabled={isSubmitting} type="submit">
					Submit
				</Button>
			</div>
				</Form>
			)}
			</Formik>
		</div>

	)

}
export const DatePickerField = ({ ...props }) => {
  const { setFieldValue } = useFormikContext();
	// @ts-ignore
  const [field] = useField(props);
  return (
    <DatePicker
      {...field}
      {...props}
      selected={(field.value && new Date(field.value)) || null}
      onChange={val => {
        setFieldValue(field.name, val);
      }}
    />
  );
};
export default Shop;
