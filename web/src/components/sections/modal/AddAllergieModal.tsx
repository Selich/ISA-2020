import { Select, Text, Button, HStack, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Center } from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import EditProfileForm from "../forms/EditProfileForm";
import { useRouter } from 'next/router';

import { CUIAutoComplete } from 'chakra-ui-autocomplete'
import { useAddAllergieMutation,useShopQuery } from '../../../generated/graphql'

export interface Item {
  label: string;
  value: string;
}



export const AddAllergieModal: any = ({ onOpen, isOpen, onClose }) => {
  const btnRef = React.useRef()
  const router = useRouter();
  let [{ data, fetching }] = useShopQuery();
  let [ _ , addAllergie] = useAddAllergieMutation();
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
		if (fetching){

		} else {
			let temp = data.shop.map(item => item.name)
			let user = localStorage.getItem('user')
			user = JSON.parse(user)
			let userAllergies = null
			if(user.allergies === null || user.allergies === undefined)
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


		}


	}, [])

	async function handleClick(){
			let allergies = JSON.stringify(selectedItems)
			const response = await addAllergie({allergies});
			router.push('/user/profile')


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
