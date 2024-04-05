import { useMutation} from "@tanstack/react-query"
import { updateBooking } from "../../services/apiBookings";
import {toast} from "react-hot-toast"
import { useQueryClient } from '@tanstack/react-query';

import {useNavigate} from "react-router-dom"

export function useChecking(){

    const queryClient = useQueryClient()
    const navigate = useNavigate();

    const {mutate: checkin , isLoading: isCheckingIn} = useMutation({
        mutationFn: (bookingId)=> updateBooking(bookingId, {
            status:"checked-in",
            isPaid: true,
        }),
        onSuccess: (data)=>{
            toast.success(`booking #${data.id} successfully checked in `)
            queryClient.invalidateQueries({active: true})
            navigate("/")
        },
        onError:()=> toast.error('there was an error while chekin in ')
    });
    return {checkin,isCheckingIn};
}