import React from 'react'
import { useRouter } from 'next/router'
import { Text, SimpleGrid, Box, Avatar } from '@chakra-ui/react'
import { Header } from '../../components/sections/Header'
import { useMeQuery } from '../../generated/graphql'

export const Profile = () => {
  const router = useRouter()
  const { id } = router.query
  const [{ data, fetching }] = useMeQuery();

  return (
    <>
      <Header />
      <SimpleGrid minChildWidth="410px">
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
        h="400px"
      >
        <Box align="left">
          <Avatar name={data.me.email.split('@')[0]} src="" size="2xl" margin={4} pd={3} />
          <Text>{data.me.firstName} {data.me.lastName}</Text>
          <Text fontSize={17}>Address:</Text>
          <Text fontSize={14}>
            {data.me.address.street + " "
            + data.me.address.city + " "
            + data.me.address.country}
          </Text>
        </Box>
      </Box>
      </SimpleGrid>
    </>
  )
}

export default Profile
