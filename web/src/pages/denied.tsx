import { Box, FormControl, FormLabel, Button, Flex, Select, Stack } from '@chakra-ui/react';
// import { yupResolver } from '@hookform/resolvers/yup';
import React from "react";
import { useState } from "react";
import { FormInput } from './../components/sections/FormInput';
import { FormInputPassword } from './../components/sections/FormInputPassword';
import { Wrapper }  from './../components/ui/Wrapper';
import { Formik, Form } from "formik";


import { useRouter } from "next/router";


// @ts-ignore
import DateInput from '@opuscapita/react-dates'
import PharmaciesMap from "../components/layouts/PharmaciesMap"


interface IFormInputs {
  email: string
  password: string
}


export default function Denied() {
  return (
    <div>denied</div>
  );
}

