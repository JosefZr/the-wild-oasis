/* eslint-disable no-unused-vars */
import {useMutation} from "@tanstack/react-query"
import {useNavigate} from "react-router-dom"
import {toast} from "react-hot-toast"
import { login as loginApi} from "../../services/apiAuth";
import {useQueryClient} from  "@tanstack/react-query";
export function useLogin(){
    const queryClient = useQueryClient()
    const navigate = useNavigate();
    const {mutate: login, isLoading}=useMutation({
        mutationFn:({email,password})=> loginApi({
            email,password
        }),
        onSuccess:(user)=>{
            queryClient.setQueriesData(["user"], user)
            navigate("/dashboard")
        },
        onError: (err) => {
            console.log('ERROR', err)
            toast.error("provider email or password are incorrect")
        }
    });
    return {login, isLoading};
}