import React from 'react'
import { MdMap } from "react-icons/md"
import dynamic from 'next/dynamic'
import {
    SimpleGrid, Text, Avatar,
    Box,
    Button,
    HStack,
    Icon,
    Input,
    useDisclosure,
} from "@chakra-ui/react"
import faker from 'faker'
import DataTable from 'react-data-table-component'
import { PharmacyProfileModal } from '../../components/sections/modal/PharmacyProfileModal'
import { MapViewModal } from '../sections/modal/MapViewModal'
import { RateModal } from '../sections/modal/RateModal'
import { SubscribeModal } from '../sections/modal/SubscribeModal'

const createUser = () => ({
    id: faker.random.uuid(),
    street: faker.address.streetAddress(),
    city: faker.address.city(),
    name: faker.company.companyName(),
    rating: faker.random.number(10)
});

const createUsers = (numUsers = 5) =>
    new Array(numUsers).fill(undefined).map(createUser);

const fakeUsers = createUsers(2000);

const FilterComponent = ({ filterText, onFilter, onClear }) => (
    <>
        <HStack>
            <Input id="search" type="text" placeholder="Search" aria-label="Search Input" value={filterText} onChange={onFilter} />
            <Button type="button" onClick={onClear}>X</Button>
        </HStack>
    </>
);



const PharmaciesTable = (): JSX.Element => {
    const [filterText, setFilterText] = React.useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
    const filteredItems = fakeUsers.filter(item => item.name && item.name.toLowerCase().includes(filterText.toLowerCase()));


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

    const subHeaderComponentMemo = React.useMemo(() => {
        const handleClear = () => {
            if (filterText) {
                setResetPaginationToggle(!resetPaginationToggle);
                setFilterText('');
            }
        };

        return <FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />;
    }, [filterText, resetPaginationToggle]);
    return (
        <>
            {/* <Button onClick={modal.onOpen} colorScheme="teal">Create New Tier</Button> */}
            <DataTable
                title="Pharmacy List"
                columns={columns}
                data={filteredItems}
                pagination
                paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
                subHeader
                subHeaderComponent={subHeaderComponentMemo}
                persistTableHead
                expandableRows
                expandableRowsComponent={<ExpandedComponent data={this} />}
            />
        </>
    )

}
export const ExpandedComponent = ({ data }) => {

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
            <Button disabled={true}>Rate</Button>
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