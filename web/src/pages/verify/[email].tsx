import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import swal from 'sweetalert'
import {useConfirmRegistrationMutation} from "../../generated/graphql";


export default function Verify() {
	const router = useRouter()
	//const [{ fetching: loginFetch }, login] = useLoginMutation();
	const { email } = router.query
  const [{ }, confirmRegistration] = useConfirmRegistrationMutation();

	useEffect(() => {
		console.log("Email: ", email)
		//@ts-ignore
		const response = confirmRegistration({email})
		console.log(response)
		swal({
			title: "Confirmed Account",
			text: "Your account has been activated!",
			icon: "success",
		});
		router.push('/')

	}, [email]);
  return (
		<></>

  );
}

