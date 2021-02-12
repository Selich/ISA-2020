import React, {useEffect} from "react";
import { HStack, FormLabel, Button, Box, AccordionItem, AccordionIcon, Accordion, AccordionButton, AccordionPanel, Input} from "@chakra-ui/react"


const items = [
  "Siri",
  "Alexa",
  "Google",
  "Facebook",
  "Twitter",
  "Linkedin",
  "Sinkedin"
];

export const SearchBox = ({alternatives}) => {
 const [searchTerm, setSearchTerm] = React.useState("");
 const [searchResults, setSearchResults] = React.useState([]);
 const [isActive, setIsActive] = React.useState(true);

 useEffect(() => {


 },[isActive])
 const handleChange = event => {
    setSearchTerm(event.target.value);
  };
 React.useEffect(() => {
    const results = items.filter(item =>
      item.toLowerCase().includes(searchTerm)
    );
    setSearchResults(results);
  }, [searchTerm]);

  return (
		<>
			<div> 
			</div>
			<HStack>
			<Input
				mt={0}
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleChange}
      />
			<Button onClick={() => setIsActive(true)}hidden={isActive}size="md" colorScheme="red">x</Button>
			<Button onClick={() => setIsActive(false)}hidden={!isActive}size="md">+</Button>
			</HStack>
			<Accordion maxW="400px" minW="400px" overflowY="scroll" maxH="190px" minH="190px" position="relative"  allowToggle>
				{!isActive && (
         searchResults.map(item => (
					<AccordionItem>
						<AccordionButton>
							<Box flex="1" textAlign="left">
								{item}
							</Box>
							<AccordionIcon mr={2} />
							<Button colorScheme="teal"
								onClick={() => alternatives.push(item)}
							>+</Button>
						</AccordionButton>
						<AccordionPanel pb={4} overflow="hidden">
						</AccordionPanel>
					</AccordionItem>
         ))
				)}
				{isActive && (
         alternatives.map(item => (
					<AccordionItem>
						<AccordionButton>
							<Box flex="1" textAlign="left">
								{item}
							</Box>
							<AccordionIcon mr={2} />
						</AccordionButton>
						<AccordionPanel pb={4} overflow="hidden">
						</AccordionPanel>
					</AccordionItem>
         ))
				)}
			</Accordion>
		</>
  );
}
export const SearchBoxActivated = (data) => {
			<AccordionItem>
				<AccordionButton>
					<Box flex="1" textAlign="left">
						Section 1 title
					</Box>
					<AccordionIcon />
				</AccordionButton>
				<AccordionPanel pb={4}>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
					tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
					veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
					commodo consequat.
				</AccordionPanel>
			</AccordionItem>
}
