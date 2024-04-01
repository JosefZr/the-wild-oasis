import toast from "react-hot-toast";
import { createEditCabin } from "../../services/apiCabins";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateCabin(){
    const queryClient= useQueryClient()

    const {mutate:createCabin, isLoading:isCreating} = useMutation({// we use mutation if we want to create or delete a new row or so..
        mutationFn:createEditCabin,
        onSuccess:()=>{
            toast.success("New cabin succesfully created");
            queryClient.invalidateQueries({queryKey:["cabins"]});
        },
        onError:(err)=> toast.error(`An error occurred while creating the new cabin: ${err?.message}`)
    });
    return {isCreating, createCabin}
}