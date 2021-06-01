import React, {useState} from "react";
import { useShopQuery } from "../generated/graphql";
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
		setPharmacy(item)
	}

	const handleSubmit = () => {
		let {day, month, year} = date
		let rdate = new Date(parseInt(year), parseInt(month), parseInt(day))

		let inputs = {
			'deadline': rdate + '',
			'pharmacyId': pharmacy.id,
			'medicineId': medicine.id,
			'quantity': quantity,
			'token': token
		}

		addReservation({inputs})
			.then(res => console.log(res))
			.catch(res => console.log(res))
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
				<ReservationForm/>
			</ModalComponent>
		</ModalComponent>
    </Box>
	</>
	)
}


export const ReservationForm = () => {

	return (
		<div>
			<Formik
				initialValues={{ 
					date: "",
					qunatity: 1,
				}}
				onSubmit={(data, {setSubmitting}) => {
					setSubmitting(true)
					console.log(data);
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
