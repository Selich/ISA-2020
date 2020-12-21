import React from 'react'
import { Header } from '../../components/sections/Header'
import {
  useDisclosure,
} from "@chakra-ui/react"
import { usePharmsQuery } from '../../generated/graphql'

const Pharmacists = (): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [{ data }] = usePharmsQuery({});

  return (
    <>
      <Header onOpen={onOpen} />
      {data.usersByPharm}
    </>
  )

}

export default Pharmacists;

