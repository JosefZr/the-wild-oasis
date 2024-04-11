import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUser } from "../../services/apiAuth";

export function useUpdateUser(){
    const  queryClient = useQueryClient();

    const {mutate:updateUser, isLoading:isUpdating} = useMutation({// we use mutation if we want to create or delete a new row or so..
        mutationFn:updateCurrentUser,
        onSuccess:()=>{
            toast.success(" user account succefuly updated ");
            queryClient.invalidateQueries({queryKey:["user"]});
        },
        onError:(err)=> toast.error(`An error occurred while creating the new cabin: ${err?.message}`)
    });
    return {isUpdating,  updateUser};
}