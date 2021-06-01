import {
  useDisclosure,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useContainsMedicineQuery, useAddReservationMutation } from "../../../generated/graphql";
import { safeLoading, MyNumberInput, MyDateInput } from '../../../utils/utils'
import Cookies from "js-cookie";

interface IModalProps {
  disclosure?: any;
  modal?: any;
	handler?: any;
	form?: any;
	title?: any;
}

export const ModalComponent: any = (props) => {

  return (
    <>
      <Modal {...props.disclosure} size="lg">
        <ModalOverlay />
        <ModalContent maxW="56rem" maxH="106rem">
          <ModalHeader>
            <Text fontSize="3xl">{props.title}</Text>
          </ModalHeader>
          <ModalBody>
          {props.children}
					</ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
