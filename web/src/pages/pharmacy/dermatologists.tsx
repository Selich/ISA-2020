import React from 'react'
import { Header } from '../../components/sections/Header'
import {
  useDisclosure,
} from "@chakra-ui/react"
import { useDermsQuery } from '../../generated/graphql'

const Dermatologists = (): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Header onOpen={onOpen} />
    </>
  )

}

export default Dermatologists;

