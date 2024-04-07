/* eslint-disable no-unused-vars */
import { getCurrentUser } from "../../services/apiAuth";
import {useQuery} from  '@tanstack/react-query';

function useUser(){
    const {isLoading, data: user } = useQuery({
        queryKey:["user"],
        queryFn: getCurrentUser
    })
    return {isLoading, user, isAuthenticated: user?.role ==="authenticated"}
}
export  default useUser;