import React from 'react'
import { Header } from '../../components/sections/Header'
import {
    Box,
    Button,
    HStack,
    Input,
	Link,
    useDisclosure,
} from "@chakra-ui/react"
import ReservationsTable from '../../components/tables/ReservationsTable'
import faker from 'faker'
import DataTable from 'react-data-table-component'
import { ConfirmMedicinesModal } from '../../components/sections/modal/ConfirmMedicines'
import { PharmacyProfileModal } from '../../components/sections/modal/PharmacyProfileModal'
import CreateEmployee from './create-employee'
import { CreateEmployeeModal } from '../../components/sections/modal/CreateEmployeeModal'
import { CreateAdminModal } from '../../components/sections/modal/CreateAdminModal'

const createUser = () => ({
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
        name: 'Email',
        selector: 'email',
        sortable: true,
    },
  
];

const openModal = (item, onOpen) => {
    onOpen()
    

}

const Medicines = (): JSX.Element => {
    const [filterText, setFilterText] = React.useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
  const filteredItems = fakeUsers .filter(item => item.name && item.name.toLowerCase().includes(filterText.toLowerCase())) ;
    const selectedItemModal = useDisclosure()
    const createEmployeeModal = useDisclosure()
    const createAdminModal = useDisclosure()

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
				<Button onClick={createEmployeeModal.onOpen} size="sm" mx={3} colorScheme="teal">Create New Employee</Button>
				<Button onClick={createAdminModal.onOpen} as={Link} size="sm" mx={3} colorScheme="teal">Create New Admin</Button>
                <DataTable
                    title="Employee List"
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
      <CreateEmployeeModal
        onOpen={createEmployeeModal.onOpen}
        isOpen={createEmployeeModal.isOpen}
        onClose={createEmployeeModal.onClose}
      />
      <CreateAdminModal
        onOpen={createAdminModal.onOpen}
        isOpen={createAdminModal.isOpen}
        onClose={createAdminModal.onClose}
      />
        </>
    )

}

export default Medicines;
