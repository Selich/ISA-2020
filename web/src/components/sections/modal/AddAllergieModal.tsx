import { Select, Text, Button, HStack, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Center } from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import EditProfileForm from "../forms/EditProfileForm";
import { CUIAutoComplete } from 'chakra-ui-autocomplete'
import { useShopQuery } from '../../../generated/graphql'

export interface Item {
  label: string;
  value: string;
}
const countries = [
  { value: "ghana", label: "Ghana" },
  { value: "nigeria", label: "Nigeria" },
  { value: "kenya", label: "Kenya" },
  { value: "southAfrica", label: "South Africa" },
  { value: "unitedStates", label: "United States" },
  { value: "canada", label: "Canada" },
  { value: "germany", label: "Germany" }
];



export const AddAllergieModal: any = ({ onOpen, isOpen, onClose }) => {
  const btnRef = React.useRef()
  let [{ data, fetching }] = useShopQuery();
	const [value, setValue] = useState('')
	const [pickerItems, setPickerItems] = React.useState([]);
	const [storedData, setStoredData] = React.useState([])
  const [selectedItems, setSelectedItems] = React.useState<Item[]>([]);
	
  const handleCreateItem = (item: Item) => {
    setPickerItems((curr) => [...curr, item]);
    setSelectedItems((curr) => [...curr, item]);
  };

  const handleSelectedItemsChange = (selectedItems?: Item[]) => {
    if (selectedItems) {
      setSelectedItems(selectedItems);
    }
  };

	useEffect(() => {
		let temp = data.shop.map(item => item.name)
		let user = localStorage.getItem('user')
		user = JSON.parse(user)
		let userAllergies = null
		if(user.allergies === null)
			 userAllergies = []
		else{
			 setStoredData(user.allergies)
			 userAllergies = user.allergies.map(item => item.name)
		}

		let ret = [] 
		let ret2 = [] 
		temp.forEach(item => ret.push({value: item, label: item}))
		userAllergies.forEach(item => ret.push({value: item, label: item}))
		setPickerItems(ret)
		setSelectedItems(ret2)



	}, [])

	const handleClick = () => {
			const response = await login(values);
			console.log(response);

			if (response.data?.login.errors) {
				// @ts-ignore
				console.log(response.data.login.errors);
				// @ts-ignore
				setErrors(toErrorMap(response.data.login.errors));
			} else if (response.data?.login.user) {
				let user = response.data.login.user;
				localStorage.setItem('user', JSON.stringify(user))
				onClose();
			}

	}

  return (
    <Modal size="3xl" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
			<ModalContent >
        <ModalHeader><Text fontSize="1xl">Add Allergie:</Text> </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
		{ (fetching) && ( <div> loading </div>) }
				
		{ (!data) 
				? (<p> loading </p>)
				: (<><CUIAutoComplete
          label=""
          placeholder="Type a medicine"
          onCreateItem={handleCreateItem}
          items={pickerItems}
          selectedItems={selectedItems}
          onSelectedItemsChange={(changes) =>
            handleSelectedItemsChange(changes.selectedItems)
          }
        />
				<Button onClick={handleClick}>Confirm</Button>
		</>)

		} 

					
        </ModalBody>
        <ModalFooter >
        </ModalFooter>
      </ModalContent>
    </Modal>
  );

};
