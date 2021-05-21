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

export const EPrescriptionsTable = (): JSX.Element => {
    const [filterText, setFilterText] = React.useState('');
		const [data, setData] = useState([])
    const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);

		useEffect(() =>{

		},[])
    return (
        <>
                <DataTable
                    columns={columns}
                    data={data}
                    pagination
                    paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
                />
        </>
    )

}
