import React from 'react'
import { Header } from '../../components/sections/Header'
import {
    Slider, SliderTrack, SliderFilledTrack, SliderThumb, Select,
    Box,
    Button,
    HStack,
    Input,
    useDisclosure,
    FormLabel,
} from "@chakra-ui/react"
import faker from 'faker'
import DataTable from 'react-data-table-component'
import { PharmacyProfileModal } from '../../components/sections/modal/PharmacyProfileModal'
import { Basket } from '../layouts/Basket'
import { addItem } from '../../utils/cart'
import { PharmacyBuyModal } from '../sections/modal/PharmacyBuyModal'


const AppointmentDetailsTable = (): JSX.Element => {
    const selectedItemModal = useDisclosure()
    const buyItemModal = useDisclosure()
    const columns = [
        {
            name: 'Name',
            selector: 'name',
            sortable: true,
        },
        {
            name: 'Rating',
            selector: 'rating',
            sortable: true,
        },
    ];

    return (
        <>
            {/* <Button onClick={modal.onOpen} colorScheme="teal">Create New Tier</Button> */}
            <DataTable
                columns={columns}
                data={[]}
                pagination
                subHeader
                expandableRows
                persistTableHead
                expandableRowsComponent={(val) => <MedicineDetails item={val} />}
            />
        </>
    )

}
export default AppointmentDetailsTable;

const MedicineDetails = ({ item }) => {

    return (
        <div>{item}</div>

    )

}
