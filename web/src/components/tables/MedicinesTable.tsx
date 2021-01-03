import React from 'react'
import {
    SimpleGrid,Avatar,Text,Box,
    Slider, SliderTrack, SliderFilledTrack, SliderThumb, Select,
    Button,
    HStack,
    Input,
    useDisclosure,
    FormLabel,
} from "@chakra-ui/react"
import faker from 'faker'
// import { FaCancel } from 'react-icons'
import DataTable from 'react-data-table-component'
import { PharmacyProfileModal } from '../../components/sections/modal/PharmacyProfileModal'
import { Basket } from '../layouts/Basket'
import { addItem } from '../../utils/cart'
import { PharmacyBuyModal } from '../sections/modal/PharmacyBuyModal'

const createUser = () => ({
    id: faker.random.uuid(),
    name: faker.company.companyName(),
    type: faker.company.companyName(),
    producer: faker.company.companyName(),
    rating: faker.random.number(10),
    isPrescriptionRequired: faker.random.boolean(),
    points: faker.random.number(10),
    form: faker.random.alphaNumeric(),
    info: faker.lorem.paragraph()
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


const openModal = (item, onOpen) => {
    onOpen()
}

const PharmaciesTable = (): JSX.Element => {
    const [filterText, setFilterText] = React.useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
    const filteredItems = fakeUsers.filter(item => item.name && item.name.toLowerCase().includes(filterText.toLowerCase()));
    const selectedItemModal = useDisclosure()
    const buyItemModal = useDisclosure()
    const columns = [
        { name: 'Name', selector: 'name', sortable: true, },
        { name: 'Type', selector: 'type', sortable: true, },
        { name: 'Form', selector: 'form', sortable: true, },
        { name: 'Rating', selector: 'rating', sortable: true, },
        {
            name: '',
            button: true,
            cell: () => <Button size="sm" onClick={(val) => buyItemModal.onOpen()} colorScheme='teal' >Buy</ Button>,
        }
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
                columns={columns}
                data={filteredItems}
                pagination
                paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
                subHeader
                expandableRows
                subHeaderComponent={subHeaderComponentMemo}
                persistTableHead
                    expandableRowsComponent={<ExpandedComponent data={this} />}
            />
            <PharmacyBuyModal
        onOpen={buyItemModal.onOpen}
        isOpen={buyItemModal.isOpen}
        onClose={buyItemModal.onClose}
            
            />
        </>
    )

}
export default PharmaciesTable;

export const ExpandedComponent = ({ data }) => {

    return (
        <>
            <SimpleGrid columns={2}>
                <Box m={6}>
                    <Avatar margin={4} pd={3} />
                    <Text>{data.name}</Text>
                    <Text>{data.type}</Text>
                    <Text>Form: {data.form}</Text>
                    <Text>Rating: {data.rating}</Text>
                </Box>
                <Box m={6}>
                    <Text>Prescription Required? {(data.isPrescriptionRequired) ? "T":"X"}</Text>
                    <Text>Producer: {data.producer}</Text>
                    <Text>Information:</Text>
                    <Text>{data.info}</Text>
                    <Text>Points Earned: {data.points}</Text>
                    <Button size="sm" onClick={(val) => buyItemModal.onOpen()} colorScheme='teal' >Buy</ Button>
                </Box>
            </SimpleGrid>
            <Button disabled={true}>Rate</Button>
        </>
    )

}
