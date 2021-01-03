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

const createUser = () => ({
    id: faker.random.uuid(),
    name: faker.company.companyName(),
    rating: faker.random.number(10)
});

const createUsers = (numUsers = 5) =>
    new Array(numUsers).fill(undefined).map(createUser);

const fakeUsers = createUsers(2000);

const FilterComponent = ({ filterText, onFilter, onClear }) => (
    <>
        <HStack gap={3}>
            <FormLabel>Name:</FormLabel>
            <Input size="sm" id="search" type="text" placeholder="Search" aria-label="Search Input" value={filterText} onChange={onFilter} />
            <FormLabel>Type:</FormLabel>
            <Select size="sm" placeholder="Select option">
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
            </Select>
            <FormLabel>Rating:</FormLabel>
            <FormLabel>1</FormLabel>
            <Slider aria-label="slider-ex-1" defaultValue={30}>
                <SliderTrack defaultValue={5}>
                    <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
            </Slider>
            <FormLabel>5</FormLabel>
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
        name: 'Rating',
        selector: 'rating',
        sortable: true,
    },
    {
        name: '',
        button: true,
        cell: () => <Button onClick={(val) => {


        }
        } colorScheme = 'teal' > Buy</ Button>, }, ];

const openModal = (item, onOpen) => {
    onOpen()
}

const PharmaciesTable = (): JSX.Element => {
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
                columns={columns}
                data={filteredItems}
                pagination
                paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
                subHeader
                expandableRows
                subHeaderComponent={subHeaderComponentMemo}
                selectableRows
                persistTableHead
                expandableRowsComponent={(val) => <MedicineDetails item={val} />}
            />
        </>
    )

}
export default PharmaciesTable;

const MedicineDetails = ({ item }) => {

    return (
        <div>{item}</div>

    )

}
