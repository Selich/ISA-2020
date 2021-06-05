import React, {useState} from "react";
import { useReserveMedicineMutation, useShopQuery } from "../generated/graphql";
import { useAddReservationMutation } from "../generated/graphql";
import { useContainsMedicineQuery } from "../generated/graphql";
import { Input, useDisclosure, } from "@chakra-ui/react";
import { ModalComponent } from "../components/sections/modal/ModalComponent";
import { TableComponent } from '../components/tables/TableComponent'
import { MyNumberInput, MyDateInput } from '../utils/utils'
import { Box, Button} from "@chakra-ui/react";
import DatePicker from 'react-datepicker'
import Cookies from "js-cookie";
import { Field, Form, Formik, useField, useFormikContext } from "formik";


const Shop = (): JSX.Element => {
  const token = Cookies.get("token");
	const [medicine,setMedicine] = useState({id: ''})
	const [pharmacy,setPharmacy] = useState({id: ''})
	const [quantity,setQuantity] = useState(1)
	const [date, setDate] = useState({day: '', month: '' , year: ''})

  const [, addReservation] = useAddReservationMutation();

  const buyItemModal = useDisclosure();
  const dateModal = useDisclosure();

  const medicineColumns = [
    { name: "Name", selector: "name", sortable: true },
    { name: "Type", selector: "type", sortable: true },
    { name: "Form", selector: "form", sortable: true },
    { name: "Rating", selector: "rating", sortable: true },
	]

	const pharmacyColumns = [
		{ name: "Name",  selector: "pharmacy.name",							sortable: true },
		{ name: "Price", selector: "medicineItem.currentPrice", sortable: true },
	];

	const Buy = (item) => {
		setMedicine(item)
	}
	const Select = (item) => {
		console.log(item)
		console.log('testset')
		setPharmacy(item)
	}

	
	let variables = { token: token }
	let pharmacyVariables = { id: '1' }

	return	(
	<>
    <Box m={10} mx={20}>
		<TableComponent 
			query={useShopQuery}
			handler={[Buy]}
			modal={buyItemModal}
			columns={medicineColumns}
			buttonName={'Buy'}
		/>
		<ModalComponent
			handler={setPharmacy}
			disclosure={buyItemModal}
			title={'Pharmacy'}
		>
			<TableComponent 
				query={useContainsMedicineQuery}
				handler={[Select]}
				modal={dateModal}
				variables={{id: '1'}}
				columns={pharmacyColumns}
				buttonName={'Select'}
			/>
			<ModalComponent
				handler={setDate}
				disclosure={dateModal}
				title={'Reservation'}
			>
				<ReservationForm pharmacy={pharmacy} medicine={medicine} onClose={dateModal.onClose} Close={buyItemModal.onClose}/>
			</ModalComponent>
		</ModalComponent>
    </Box>
	</>
	)
}


export const ReservationForm = ({pharmacy, medicine, onClose, Close}) => {
	const [,addReservation] = useAddReservationMutation()
	const token = Cookies.get('token')

	const handleSubmit = (data) => {

		let inputs = {
			'deadline': data.date.toLocaleDateString() + '',
			'pharmacyId': parseInt(pharmacy.pharmacy.id),
			'medicineId': parseInt(pharmacy.medicineItem.id),
			'quantity': parseInt(data.quantity),
		}
		console.log(inputs)

		addReservation({inputs, token: token})
			.then(res => {
				if(!res.data.reserveMedicine){
					alert('Not enough items for selected quantity')
				} else {
					onClose()
					Close()
				}
				console.log(res)
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
