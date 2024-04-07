/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import styled from  'styled-components';
import  useUser  from "../features/authentication/useUser"
import Spinner from "./Spinner"
import {useNavigate} from "react-router-dom"
import { useEffect } from 'react';

const FullPage = styled.div`
    height: 100vh ;
    background-color: var(--color-grey-50);
    display: flex;
    align-items: center;
    justify-content: center;
`
function ProtectedRoute({children}) {
    const navigate = useNavigate()
    // 1) load the authanticated user

    const {isAuthenticated, isLoading} = useUser()

   
    //2) if there is no auth user redirect to the login page 
    
    useEffect(function(){
        if(!isAuthenticated && !isLoading) navigate("/login");
    },[isLoading, isAuthenticated, navigate])

     //3) wile loading show spinner

    if(isLoading) 
    return (  
        <FullPage>
            <Spinner/>
        </FullPage>
    )

    // 4) if there is a user render the app
    if(isAuthenticated) return (
        children
    )
}

export default ProtectedRoute