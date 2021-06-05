import { Button } from "@chakra-ui/react";
import Cookies from "js-cookie";
import React from "react";
import DataTable from "react-data-table-component";
import { useCancelReservationMutation, usePatientQuery, useReservationsQuery } from "../../generated/graphql";


export const ReservationsTable = () => {
	let token = Cookies.get('token')
	let variables = { token: token }
	const [{ fetching , data }] = useReservationsQuery({variables: {token: token}})
	const [,cancelReservation] = useCancelReservationMutation()

	const handler = (row) => {
		let variables = {
			inputs: {
				id: parseInt(row.id),
				originalId: row.originalId,
				quantity: row.medicineItem.quantity,
				deadline: row.deadline,
				medicineId:  parseInt(row.medicineItem.id)
				
			},
			token:token
		}
		console.log(variables)

		cancelReservation(variables).then(
			res => {
				console.log("Success")
				console.log(res)
			}
		)

	}
const columns = [
	{name: "Deadline", selector:"deadline", sortable:true},
	{name: "Name", selector:"medicineItem.details.name", sortable:true},
	{name: "Quantity", selector:"medicineItem.quantity", sortable:true},
        {
        name: "",
        button: true,
        cell: (row: any) => (
          <Button colorScheme="red" size="sm" onClick={() => handler(row)}>
							Cancel
          </Button>
        ),
      }
]

	let body = null;
	if(fetching) body = <div>loading</div>
	else if (!data)  body = <div>loading</div>
	else {
		console.log('Reservations')
		console.log(data.reservations)
 		 body =(
		<DataTable
			data={data.reservations}
			columns={columns}

		/>
  );
	}
	return body

}
