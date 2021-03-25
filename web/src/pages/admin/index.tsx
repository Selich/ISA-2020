import {
  Box,
  Button, SimpleGrid, Text, useDisclosure
} from "@chakra-ui/react";
import NextLink from "next/link";
import React, { useEffect, useState } from "react";
import { AddFreeAppModal } from '../../components/sections/modal/AddFreeAppModal';
import { useMeQuery } from '../../generated/graphql';

export default function Index() {
  const [{ data, fetching }] = useMeQuery();
	const [user, setUser] = useState({})
	const modal = useDisclosure()

  useEffect(() => {
		let temp = data.me
		setUser(temp)
  }, []);
  return (
    <>
      <Box
        m="4"
        p="8"
        border="1px"
        rounded="2px"
        borderColor="gray.300"
        boxShadow="md"
        bg="grey.200"
        color="#2d383c"
        fontSize="2rem"
        textAlign="center"
        h="1200px"
      >
        <SimpleGrid columns={3} spacing={0} maxH="600px">
          <Box align="left">
            <Text fontSize={28}>Dashboard</Text>
            <Text fontSize={12}>Admin Pharm</Text>
            <hr />
						{/* {user &&
            (<Text fontSize={12}>{user.pharmacy.name}</Text>)
						} */}
          </Box>
          <Box align="right"></Box>
          <Box align="right">
            <Box>
              <NextLink href="/sysadmin/">
                <Button w={180}>Pharmacies</Button>
              </NextLink>
            </Box>
            <Box>
							<Button w={180} onClick={() => modal.onOpen()}>Add Appointment</Button>
            </Box>
          </Box>
        </SimpleGrid>
      </Box>
      <AddFreeAppModal
        onOpen={modal.onOpen}
        isOpen={modal.isOpen}
        onClose={modal.onClose}
      />
    </>
  );
}
