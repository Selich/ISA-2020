import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {useConfirmRegistrationMutation} from "../../generated/graphql";


export default function Pharmacy() {
	const router = useRouter()
	//const [{ fetching: loginFetch }, login] = useLoginMutation();
	const { id } = router.query

	useEffect(() => {

	}, []);
  return (
		<p>Test {id}</p>

  );
}

