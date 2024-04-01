import toast from "react-hot-toast";
import { createEditCabin } from "../../services/apiCabins";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateCabin(){
    const  queryClient = useQueryClient();

    const {mutate:editCabin, isLoading:isEditing} = useMutation({// we use mutation if we want to create or delete a new row or so..
        mutationFn:({newCabinData, id})=>createEditCabin(newCabinData,id),
        onSuccess:()=>{
            toast.success(" cabin succesfully edited");
            queryClient.invalidateQueries({queryKey:["cabins"]});
        },
        onError:(err)=> toast.error(`An error occurred while creating the new cabin: ${err?.message}`)
    });
    return {isEditing,  editCabin};
}