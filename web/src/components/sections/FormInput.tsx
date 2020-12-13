import { FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react'
import React from 'react'

export default function FormInput(props:any) {
  return (
      <FormControl>
        <FormLabel htmlFor={props.name}>{props.label}</FormLabel>
        <Input name={props.name} placeholder={props.name} ref={props.register} />
        <FormErrorMessage>
          {props.errors}
        </FormErrorMessage>
      </FormControl>
  )
}
