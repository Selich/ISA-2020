import { Text, Button, HStack, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Center } from "@chakra-ui/react";
import React from "react";
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css'




export const MapViewModal: any = ({ data, onOpen, isOpen, onClose }) => {
    const Map = dynamic(() => import('./Map'), {
        loading: () => <p> Loading </p>,
        ssr: false
    })
    const btnRef = React.useRef()
    const [isBrowser, setIsBrowser] = useState(false);

    useEffect(() => {
        setIsBrowser(true);
    }, []);

    if (!isBrowser) {
        return null;
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
            <ModalOverlay />
            <ModalContent maxW="56rem" maxH="106rem">
                <ModalHeader><Text fontSize="sm">Map View: </Text> </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Map data={data}/>
                </ModalBody>
                <ModalFooter >
                    <Button>Confirm</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );

};



