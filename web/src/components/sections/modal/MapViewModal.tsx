import {
  Text,
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Center,
} from "@chakra-ui/react";
import React from "react";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import {
  GoogleMapProvider,
  HeatMap,
  InfoWindow,
  MapBox,
  Marker,
  OverlayView,
  Polygon,
} from "@googlemap-react/core";

export const MapViewModal: any = ({ data, onOpen, isOpen, onClose }) => {
  const Map = dynamic(() => import("./Map"), {
    loading: () => <p> Loading </p>,
    ssr: false,
  });
  const btnRef = React.useRef();
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  if (!isBrowser) {
    return null;
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent maxW="36rem" maxH="36rem">
        <ModalHeader>
          {/* <Text fontSize="sm">Map View: {data.name}</Text>{" "} */}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <GoogleMapProvider>
            <MapBox
              apiKey="AIzaSyAAQDnv95Dl24FWuV-cuFSrazikHP9Lau0"
              opts={{
                center: {
                  // lat: parseFloat(data.lat),
                  // lng: parseFloat(data.long),
                },
                zoom: 18,
              }}
              style={{
                height: "26rem",
                width: "100%",
              }}
              useDrawing
              useGeometry
              usePlaces
              useVisualization
            />
            <Marker
              id="marker"
              opts={{
                position: {
                  // lat: parseFloat(data.lat),
                  // lng: parseFloat(data.long),
                },
              }}
            />
          </GoogleMapProvider>
        </ModalBody>
        <ModalFooter>
          <Button onClick={() => onClose()}>Exit</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
