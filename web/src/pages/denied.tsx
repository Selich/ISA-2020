import { Button } from '@chakra-ui/react';
import { useRouter } from "next/router";
// import { yupResolver } from '@hookform/resolvers/yup';
import React from "react";






interface IFormInputs {
  email: string
  password: string
}


export default function Denied() {
	const router = useRouter();
  return (
		<>
    <h1>404</h1>
		<p> Return to homepage </p>
		<Button onClick={() => router.push('/')}>Go back</Button>
	</>
  );
}

