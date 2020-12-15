import { FormControl, FormLabel, Button, Flex, Select, Stack } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import FormInput from './FormInput';
import FormInputPassword from './FormInputPassword';

// @ts-ignore
import DateInput from '@opuscapita/react-dates'


interface IFormInputs {
  email: string
  password: string
  confirmPassword: string
  firstName: string
  middleName: string
  lastName: string
  age: number
  gender: string
  dateOfBirth: Date
  street: string,
  city: string,
  country: string
  postCode: string,
  telephoneNumber: string,
}

const schema = yup.object().shape({
  firstName: yup.string().required(),
  middleName: yup.string(),
  lastName: yup.string().required(),
  email: yup.string().required().email(),
  password: yup.string().required(),
  confirmPassword: yup.string().required(),
  age: yup.number().positive().integer().required(),
  gender: yup.string().required(),
  dateOfBirth: yup.date().required(),
  street: yup.string(),
  city: yup.string(),
  country: yup.string(),
  postCode: yup.string(),
  telephoneNumber: yup.string(),
});

export default function RegisterForm() {
  const [date, setDate] = useState(new Date())
  const { register, handleSubmit, errors, formState } = useForm<IFormInputs>({
    resolver: yupResolver(schema)
  });
  const onSubmit = (data: IFormInputs) =>
    axios.post('URL', data)
      .then((res) => console.log(res))
      .catch((err) => console.log(err))

  return (
    <Flex width="full" align="center" justifyContent="center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={4} py={10} textAlign="center">
          <FormInput name="email" label="Email" register={register}
            errors={errors?.email && errors.email?.message} />
          <FormInput name="password" label="password" register={register}
            errors={errors?.password && errors.password?.message} />
          <FormInput name="confirmPassword" label="confirmPassword" register={register}
            errors={errors?.confirmPassword && errors.confirmPassword?.message} />
          <FormInput name="firstName" label="firstName" register={register}
            errors={errors?.firstName && errors.firstName?.message} />
          <FormInput name="lastName" label="lastName" register={register}
            errors={errors?.lastName && errors.lastName?.message} />
          <FormControl>
            <FormLabel htmlFor="gender">Gender</FormLabel>
            <Select placeholder="Select gender">
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="published-date">Date of Birth</FormLabel>

      <DateInput
        value={date}
        dateFormat="dd/MM/yyyy"
        disabled={false}
        locale="en"
        onChange={(date: any) => setDate(date)}
      />
          </FormControl>
          <FormInput name="street" label="Street" register={register}
            errors={errors?.street && errors.street?.message} />
          <FormInput name="city" label="City" register={register}
            errors={errors?.city && errors.city?.message} />
          <FormInput name="country" label="Country" register={register}
            errors={errors?.country && errors.country?.message} />

          <Button mt={4} colorScheme="teal" isLoading={formState.isSubmitting} type="submit">
            Submit
        </Button>
        </Stack>
      </form>
    </Flex>
  );
}
