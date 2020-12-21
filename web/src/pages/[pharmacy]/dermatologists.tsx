import React from 'react'
import { Header } from '../../components/sections/Header'
import {
  useDisclosure,
} from "@chakra-ui/react"
import { useDermsQuery } from '../../generated/graphql'

const Dermatologists = (): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [{ data }] = useDermsQuery({variables:{ pharmId: 1}});

  return (
    <>
      <Header onOpen={onOpen} />
      { (!data)
      ? (<div>no data</div> )
      : data.usersByPharm}
    </>
  )

}

export default Dermatologists;

