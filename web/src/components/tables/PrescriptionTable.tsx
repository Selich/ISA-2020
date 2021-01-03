import React from 'react'
import { MdMap } from "react-icons/md"
import {
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

const columns = [
    {
        name: 'Name',
        selector: 'name',
        sortable: true,
    },
    {
        name: 'Street',
        selector: 'street',
        sortable: true,
    },
    {
        name: 'City',
        selector: 'city',
        sortable: true,
    },
    {
        name: 'Rating',
        selector: 'rating',
        sortable: true,
    },
    {
        name: (<Icon as={MdMap} />),
        button: true,
        cell: (val) => <Button onClick={(val) => openModal(val)} size="sm" colorScheme="teal" color="white"><Icon size="md" as={MdMap}/></Button>
    },
];

const openModal = (item) => {
    const mapView = useDisclosure()

    mapView.onOpen()
}

const PrescriptionTable = ({medicines}): JSX.Element => {
    const [filterText, setFilterText] = React.useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
    const filteredItems = fakeUsers.filter(item => item.name && item.name.toLowerCase().includes(filterText.toLowerCase()));
    const selectedItemModal = useDisclosure()

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
            />
            <PharmacyProfileModal
                onOpen={selectedItemModal.onOpen}
                isOpen={selectedItemModal.isOpen}
                onClose={selectedItemModal.onClose}
            />
        </>
    )

}
export default PrescriptionTable;
