import React from 'react'
import { Header } from '../../components/sections/Header'
import {
    Box,
    Button,
    HStack,
    Input,
    useDisclosure,
} from "@chakra-ui/react"
import ReservationsTable from '../../components/tables/ReservationsTable'
import faker from 'faker'
import DataTable from 'react-data-table-component'
import { ConfirmMedicinesModal } from '../../components/sections/modal/ConfirmMedicines'

const createUser = () => ({
    id: faker.random.uuid(),
    name: faker.name.findName(),
    email: faker.internet.email(),
    bio: faker.lorem.sentence(),
    image: faker.image.avatar(),
});

const createUsers = (numUsers = 5) =>
    new Array(numUsers).fill(undefined).map(createUser);

const fakeUsers = createUsers(2000);

const FilterComponent = ({ filterText, onFilter, onClear }) => (
    <>
        <HStack>
        <Input id="search" type="text" placeholder="Filter By id" aria-label="Search Input" value={filterText} onChange={onFilter} />
        <Button type="button" onClick={onClear}>X</Button>
        </HStack>
    </>
);

const columns = [
    {
        name: 'ID',
        selector: 'id',
        sortable: true,
    },
    {
        name: 'Name',
        selector: 'name',
        sortable: true,
    },
    {
        name: 'Email',
        selector: 'email',
        sortable: true,
    },
];

const openModal = (item, onOpen) => {
    onOpen()
    

}

const Reservations = (): JSX.Element => {
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
            <Header />
            <Box m={10} mx={20}>
                {/* <Button onClick={modal.onOpen} colorScheme="teal">Create New Tier</Button> */}
                <DataTable
                    title="Contact List"
                    columns={columns}
                    data={filteredItems}
                    pagination
                    paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
                    subHeader
                    subHeaderComponent={subHeaderComponentMemo}
                    selectableRows
                    onSelectedRowsChange={(item) => openModal(item.selectedRows[0], selectedItemModal.onOpen)}
                    persistTableHead
                />
            </Box>
      <ConfirmMedicinesModal
        onOpen={selectedItemModal.onOpen}
        isOpen={selectedItemModal.isOpen}
        onClose={selectedItemModal.onClose}
      />
        </>
    )

}

export default Reservations;
