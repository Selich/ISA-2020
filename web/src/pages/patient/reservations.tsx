import React from 'react'
import DataTable from 'react-data-table-component'
import { useReservationsQuery } from '../../generated/graphql'
	const columns = [
			{ name: 'Deadline', selector: 'deadline', sortable: true, },
			{ name: 'Pharmacy', selector: 'pharmacy.name', sortable: true, },
	];


export const Reservations = (): JSX.Element => {
	let token = localStorage.getItem('token')
	token = JSON.parse(token)
	const [{fetching,data}] = useReservationsQuery({
		variables: {
			token: token
		}
	});
	let body = null
	if(fetching) body = <p> loading... </p>
	if(data) body = (
                <DataTable
                    columns={columns}
                    data={data.reservations}
                    pagination
                    persistTableHead
                    expandableRows
                />
            )
    return body
}
export default Reservations;
