import React, {useEffect, useState} from 'react'
import { Header } from '../../components/sections/Header'
import { Box, Button, HStack, Input, useDisclosure, } from "@chakra-ui/react"
import faker from 'faker'
import DataTable from 'react-data-table-component'
import { PharmacyProfileModal } from '../../components/sections/modal/PharmacyProfileModal'
import { EPrescriptionModal } from '../sections/modal/EPrescriptionModal'
import { useEprescriptionsMutation } from '../../generated/graphql'


const columns = [
    {
        name: 'Code',
        selector: 'hashCode',
        sortable: true,
    },
    {
        name: 'Date',
        selector: 'dateOfGrant',
        sortable: true,
    },
    {
        name: 'Status',
        selector: 'status',
        sortable: true,
    },
];

const openModal = (item, onOpen) => {
    onOpen()
}

const EPrescriptionsTable = (): JSX.Element => {
    const [filterText, setFilterText] = React.useState('');
		const [_, eprescriptions] = useEprescriptionsMutation();
		const [data, setData] = useState([])
    const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
	useEffect(() =>{
		let user = localStorage.getItem('user')
		user = JSON.parse(user)
		console.log(user)
		//@ts-ignore
		let email = user.email
		console.log(email)

		eprescriptions({email: email}).then(
			res => setData(res.data.eprescriptions)
		).catch( err => alert(err) )

	},[])
    return (
        <>
                <DataTable
                    title="EPrescriptions"
                    columns={columns}
                    data={data}
                    pagination
                    paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
                />
        </>
    )

}
export default EPrescriptionsTable;
