import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Flex, FormErrorMessage, Button, FormControl, FormLabel, Input, Box, Stack } from "@chakra-ui/react";
import FormInput from "./FormInput";
import FormInputPassword from "./FormInputPassword";
import axios from 'axios'


interface IFormInputs {
  email: string
  password: string
}
const schema = yup.object().shape({
  firstName: yup.string().required(),
  age: yup.number().positive().integer().required(),
});

export default function LoginForm(props: any){
  const { register, handleSubmit, errors, formState } = useForm<IFormInputs>({
    resolver: yupResolver(schema)
  });
  const onSubmit = (data: IFormInputs) =>
    axios.post('URL',  data)
      .then((res) => console.log(res))
      .catch((err) => console.log(err))

  return (
    <Flex width="full" align="center" justifyContent="center">
    <form onSubmit={handleSubmit(onSubmit)}>
    <Stack spacing={4} py={10} textAlign="center">
      <FormInput name="email" label="Email" register={register}
      errors={errors?.email && errors.email?.message} />

      <FormInputPassword errors={errors?.password && errors.password?.message}/>

      <Button onClick={props.onClose} mt={4} colorScheme="teal" isLoading={formState.isSubmitting} type="submit">
        Submit
      </Button>
    </Stack>
    </form>
    </Flex>
  );
}
