import React from 'react'
import { Header } from '../../components/sections/Header'
import {
  useDisclosure,
} from "@chakra-ui/react"
import { usePharmsQuery } from '../../generated/graphql'

const Pharmacists = (): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Header onOpen={onOpen} />
    </>
  )

}

export default Pharmacists;

