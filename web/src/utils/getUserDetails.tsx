import Cookies from "js-cookie"
import React from "react"

export const getUserDetails = (
  component: JSX.Element,
  hook: any,
) => {
	let token = Cookies.get('token')
	let [{ fetching, data }] = hook({
		variables: {
			token: token
		}
	})
	let body = null
	if (fetching) body = (<p> Loading </p>)
	else if (!data) body = (<p> Loading </p>)
	else if (data.patient) {
    var cloned = React.cloneElement(
      component,
      { data: data }
  );
    body = cloned
  }
  return body
}