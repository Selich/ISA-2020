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
import { useSubscribeMutation, usePharmaciesQuery } from '../../generated/graphql'
<<<<<<< HEAD
import {lexicographicSortSchema} from 'graphql'
=======
import { lexicographicSortSchema } from 'graphql'
>>>>>>> dev


const FilterComponent = ({ filterText, onFilter, onClear }) => (
    <>
        <HStack>
            <Input id="search" type="text" placeholder="Search" aria-label="Search Input" value={filterText} onChange={onFilter} />
            <Button type="button" onClick={onClear}>X</Button>
        </HStack>
    </>
);



export const PharmaciesTable = (): JSX.Element => {
    const [_, subscribe] = useSubscribeMutation();
    const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
    let [{ data, error, fetching }] = usePharmaciesQuery();
<<<<<<< HEAD
		const columns = [
						{ name: 'Name', selector: 'name', sortable: true, },
						{ name: 'City', selector: 'address.city', sortable: true, },
						{ name: 'Rating', selector: 'averageRating', sortable: true, },
						{ name: '', button: true, cell: row => 
							<Button onClick={() => handleSubscribe(row) } size="sm" colorScheme="teal" color="white">Subscribe</Button>
						},
					{ name: '', button: true, cell: row => 
					<Button size="sm" onClick={(val) => router.push('/admin/' + row.id)} colorScheme='teal' >Details</ Button>
						},
				];
		const router = useRouter()
	async function  handleSubscribe(row) {
	   const res = await subscribe(row.id)
	}
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
                columns={columns}
                data={data.pharmacies}
                pagination
                paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
                persistTableHead
                expandableRows
                expandableRowsComponent={<ExpandedComponent data={this} />}
            />
        </>
    )
	}
	return body
=======
    const columns = [
        { name: 'Name', selector: 'name', sortable: true, },
        { name: 'City', selector: 'address.city', sortable: true, },
        { name: 'Rating', selector: 'averageRating', sortable: true, },
        {
            name: '', button: true, cell: row =>
                <Button onClick={() => handleSubscribe(row)} size="sm" colorScheme="teal" color="white">Subscribe</Button>
        },
        {
            name: '', button: true, cell: row =>
                <Button size="sm" onClick={(val) => router.push('/pharmacy/' + row.id)} colorScheme='teal' >Details</ Button>
        },
    ];
    const router = useRouter()
    async function handleSubscribe(row) {
        const res = await subscribe(row.id)
    }
    let body = null;
    if (error) alert(error)
    if (fetching) {
        body = (<p> loading </p>)
    } else if (!data.pharmacies) {
        body = (<p> no pharmacies </p>)
    } else {
        body = (
            <>
                <DataTable
                    columns={columns}
                    data={data.pharmacies}
                    pagination
                    paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
                    persistTableHead
                    expandableRows
                    expandableRowsComponent={<ExpandedComponent data={this} />}
                />
            </>
        )
    }
    return body
>>>>>>> dev
}
const ExpandedComponent = ({ data }) => {

    const subscribeModal = useDisclosure()
<<<<<<< HEAD
		const router = useRouter();
=======
    const router = useRouter();
>>>>>>> dev
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
<<<<<<< HEAD
                    <Text>Prescription Required? {(data.isPrescriptionRequired) ? "T":"X"}</Text>
=======
                    <Text>Prescription Required? {(data.isPrescriptionRequired) ? "T" : "X"}</Text>
>>>>>>> dev
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
