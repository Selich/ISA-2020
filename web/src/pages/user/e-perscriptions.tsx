// prikazi ako je odbijen
// listu lekova koje je rezervisao
import React from "react";
import { Formik, Form } from "formik";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Box,
  Button,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useMutation } from "urql";


// @ts-ignore
import { useRouter } from "next/router";
import { Header } from "../../components/sections/Header";

interface IFormInputs {
  email: string
  password: string
  confirmPassword: string
  firstName: string
  lastName: string
  gender: string
  dateOfBirth: Date
  street: string,
  city: string,
  country: string
  postCode: string,
  telephoneNumber: string,
}

const EPrescription : any = ({}) => {
  const router = useRouter();

  return (
    <>
      <Header/>
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>Item</Th>
                      <Th isNumeric>Quantity</Th>
                      <Th></Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr>
                      <Td>Aspirin</Td>
                      <Td isNumeric>1</Td>
                      <Td><Button colorScheme="red">X</Button></Td>
                    </Tr>
                    <Tr>
                      <Td>Bensedin</Td>
                      <Td isNumeric>3</Td>
                      <Td><Button colorScheme="red">X</Button></Td>
                    </Tr>
                    <Tr>
                      <Td>Cancer</Td>
                      <Td isNumeric>2</Td>
                      <Td><Button colorScheme="red">X</Button></Td>
                    </Tr>
                  </Tbody>
                </Table>
    </>
    );
}


export default EPrescription;


