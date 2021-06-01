import { Avatar, Box, Button, HStack, Input, Link, SimpleGrid, Text, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import DataTable from 'react-data-table-component';
import { CreateAdminModal } from '../../../components/sections/modal/CreateAdminModal';
import { CreateEmployeeModal } from '../../../components/sections/modal/CreateEmployeeModal';
import { useEmployeesQuery } from "../../../generated/graphql";


const createUser = () => ({});

const FilterComponent = ({ filterText, onFilter, onClear }) => (
  <>
    <HStack>
      <Input id="search" type="text" placeholder="Search" aria-label="Search Input" value={filterText} onChange={onFilter} />
      <Button type="button" onClick={onClear}>
        X
      </Button>
    </HStack>
  </>
);

const columns = [
  {
    name: 'First Name',
    selector: 'firstName',
    sortable: true,
  },
  {
    name: 'Last Name',
    selector: 'lastName',
    sortable: true,
  },
  {
    name: 'Email',
    selector: 'email',
    sortable: true,
  },
	{cell: row => <div><Button size="sm" colorScheme='red'>Remove</Button></div> }
];


const Employees = (): JSX.Element => {
  const [filterText, setFilterText] = React.useState('');
  let [{ data, fetching }] = useEmployeesQuery();
	//	const [ data ] = 
  const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
	//const filteredItems = data.employees.filter(item => item.name && item.name.toLowerCase().includes(filterText.toLowerCase()));
  const selectedItemModal = useDisclosure();
  const createEmployeeModal = useDisclosure();
  const createAdminModal = useDisclosure();

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
      <Box m={10} mx={20}>
        <Button onClick={createEmployeeModal.onOpen} size="sm" mx={3} colorScheme="teal">
          Create New Employee
        </Button>
        {/* <Button onClick={createAdminModal.onOpen} as={Link} size="sm" mx={3} colorScheme="teal">
          Create New Admin
        </Button> */}
        {/* <DataTable
          title="Employee List"
          columns={columns}
          data={(fetching && !data) ? [] : data.employees}
          pagination
          paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
          subHeader
					expandableRows
					expandableRowsComponent={<ExpandedComponent data={this} />}
          subHeaderComponent={subHeaderComponentMemo}
          persistTableHead
        /> */}
      </Box>
      <CreateEmployeeModal onOpen={createEmployeeModal.onOpen} isOpen={createEmployeeModal.isOpen} onClose={createEmployeeModal.onClose} />
      <CreateAdminModal onOpen={createAdminModal.onOpen} isOpen={createAdminModal.isOpen} onClose={createAdminModal.onClose} />
    </>
  );
};
const ExpandedComponent = ({ data }) => {

    return (
        <>
            <SimpleGrid columns={2}>
                <Box m={6}>
                    <Avatar margin={4} pd={3} />
                    <Text>{data.firstName} {data.lastName}</Text>
                    <Text>Email: {data.email}</Text>
                    <Text>Rating: {data.averageRating}</Text>
                </Box>
            </SimpleGrid>
            <Button size="sm" pd={2} disabled={true}>Rate</Button>
            <Button size="sm" pd={2} disabled={true}>Report</Button>
        </>
    )

}

export default Employees;
