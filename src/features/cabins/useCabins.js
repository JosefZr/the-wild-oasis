/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

export function useCabins(){
    const {isLoading, data:cabins, error} = useQuery({
        queryKey: ["cabins"], // unique cache key 
        queryFn: getCabins
    })
    return {isLoading, cabins, error};
}