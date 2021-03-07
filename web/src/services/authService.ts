import { useMeQuery } from "../generated/graphql";
import { useLoginMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/errorMap";
import Cookies from 'js-cookie'
import { initCart } from '../utils/cart'

export async function login(values, setErrors, setUser, setToken){
    const [_, login] = useLoginMutation();
    const response = await login(values);

    if (response.data?.login.errors) {
        setErrors(toErrorMap(response.data.login.errors));
    } else if (response.data?.login.token) {
        let {token,user} = response.data.login
        Cookies.set('token', token)
        initCart()
        setUser(user)
        setToken(token)
        return user
    }
}

export const getCurrentUser = (token) => {
    let [{ data, fetching }] = useMeQuery();
    if(fetching){
        return { data: undefined, role: undefined }
    } else 
    if(!data || !data.me) {

        let role = 'none'
        return { data, role }
    }
    else {
        let role = data.me.role
        return { data, role}
    }
}