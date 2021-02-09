import React from 'react'
import { MdMap } from "react-icons/md"
import dynamic from 'next/dynamic'
import {
    SimpleGrid, Text, Avatar,
    Box,
    Button,
    HStack,
    Input,
    useDisclosure,
} from "@chakra-ui/react"
import faker from 'faker'
import DataTable from 'react-data-table-component'
import { useRouter } from 'next/router'
import { PharmacyProfileModal } from '../../components/sections/modal/PharmacyProfileModal'
import { MapViewModal } from '../sections/modal/MapViewModal'
import { RateModal } from '../sections/modal/RateModal'
import { SubscribeModal } from '../sections/modal/SubscribeModal'
import { usePharmaciesQuery } from '../../generated/graphql'
import {lexicographicSortSchema} from 'graphql'


const FilterComponent = ({ filterText, onFilter, onClear }) => (
    <>
        <HStack>
            <Input id="search" type="text" placeholder="Search" aria-label="Search Input" value={filterText} onChange={onFilter} />
            <Button type="button" onClick={onClear}>X</Button>
        </HStack>
    </>
);



export const PharmaciesTable = (): JSX.Element => {
    const [filterText, setFilterText] = React.useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
    let [{ data, error, fetching }] = usePharmaciesQuery();
		const router = useRouter()
    const columns = [
        {
            name: 'Name',
            selector: 'name',
            sortable: true,
        },
        {
            name: '',
            button: true,
					cell: row => <Button onClick={() => router.push('/pharmacy/' + row.id) } size="sm" colorScheme="teal" color="white">Connect</Button>
        },
    ];
  let body = null;
	if(error) alert(error)
	if(fetching){
			body = ( <p> loading </p> )
	} else if(!data.pharmacies){
			body = ( <p> no pharmacies </p> )
	} else {
			body = (
        <>
            <DataTable
                title="Pharmacy List"
                columns={columns}
                data={data.pharmacies}
                pagination
                paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
                subHeader
                persistTableHead
                expandableRows
                expandableRowsComponent={<ExpandedComponent data={this} />}
            />
        </>
    )
	}
	return body
}
const ExpandedComponent = ({ data }) => {

    const subscribeModal = useDisclosure()
    const rateModal = useDisclosure()
    const mapModal = useDisclosure()
    return (
        <>
            <SimpleGrid columns={2}>
                <Box m={6}>
                    <Avatar margin={4} pd={3} />
                    <Text>{data.name}</Text>
                    <Text>{data.type}</Text>
                    <Text>Rating: {data.rating}</Text>
                </Box>
                <Box m={6}>
                    <Text>Prescription Required? {(data.isPrescriptionRequired) ? "T":"X"}</Text>
                    <Text>Producer: {data.producer}</Text>
                    <Text>Information:</Text>
                    <Text>{data.info}</Text>
                    <HStack>
                        <Button size="sm" onClick={(val) => mapModal.onOpen()} colorScheme='teal' >Map</ Button>
                        <Button size="sm" onClick={(val) => rateModal.onOpen()} colorScheme='teal' >Rate</ Button>
                        <Button size="sm" onClick={(val) => subscribeModal.onOpen()} colorScheme='teal' >Subscribe</ Button>
                    </HStack>
                </Box>
            </SimpleGrid>
            <MapViewModal
                data={data}
                onOpen={mapModal.onOpen}
                isOpen={mapModal.isOpen}
                onClose={mapModal.onClose}
            />
            <RateModal
                onOpen={rateModal.onOpen}
                isOpen={rateModal.isOpen}
                data={data}
                onClose={rateModal.onClose}
            />
            <SubscribeModal
                data={data}
                onOpen={subscribeModal.onOpen}
                isOpen={subscribeModal.isOpen}
                onClose={subscribeModal.onClose}
            />
        </>
    )

}

export default PharmaciesTable;
