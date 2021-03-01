import { useMeQuery } from "../generated/graphql";


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