/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import PAGE_SIZE from "../../ui/constant";

export function useBookings(){
    const queryClient = useQueryClient()
    const [searchParams ] = useSearchParams();

    // filter
    const filterValue = searchParams.get("status");
    const filter  = !filterValue || filterValue ==="all" ? null : {field: "status", value: filterValue}
    
    //sorting

    const sortByRaw = searchParams.get('sortBy') || "startDate-desc"
    const [field, direction] = sortByRaw.split('-');
    
    //pagintaion
    
    const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));
    
    // query
    const sortBy = {field, direction};
    const {
        isLoading,
        data: {data:bookings, count}={},
        error
    } = useQuery({
        queryKey: ["bookings",filter,sortBy,page], // to render the data 
        queryFn: ()=>getBookings({filter, sortBy,page})
    })

    // pre fetching
    const pageCount = Math.ceil(count /PAGE_SIZE)
    
    if(page<pageCount)
        queryClient.prefetchQuery({
            queryKey: ["bookings",filter,sortBy,page+1], // to render the data 
            queryFn: ()=>getBookings({filter, sortBy,page:page + 1})
    })
    if(page>1)
    queryClient.prefetchQuery({
        queryKey: ["bookings",filter,sortBy,page-1], // to render the data 
        queryFn: ()=>getBookings({filter, sortBy,page:page - 1})
    })
    return {isLoading, bookings, error, count};
}