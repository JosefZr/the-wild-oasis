/* eslint-disable no-unused-vars */
import { useMutation} from "@tanstack/react-query"
import { updateBooking } from "../../services/apiBookings";
import {toast} from "react-hot-toast"
import { useQueryClient } from '@tanstack/react-query';


export function useCheckOut(){

    const queryClient = useQueryClient()

    const {mutate: checkout , isLoading: isCheckingOut} = useMutation({
        mutationFn: (bookingId)=> 
        updateBooking(bookingId, {
            status:"checked-out",
            
        }),
        onSuccess: (data)=>{
            toast.success(`booking #${data.id} successfully checked out `)
            queryClient.invalidateQueries({active: true})
        },
        onError:()=> toast.error('there was an error while chekin out ')
    });
    return {checkout,isCheckingOut};
}