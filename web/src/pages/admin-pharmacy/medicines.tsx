
//  istorija kupljenih lekova -> patient
import { useDisclosure } from "@chakra-ui/react";
import React from "react";
import { Header } from "../../components/sections/Header";


interface IFormInputs {
  email: string
  password: string
}


export default function Medicines() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
    <Header/>
    <div>profile</div>
    </>
  );
}
