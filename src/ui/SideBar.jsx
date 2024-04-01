/* eslint-disable no-unused-vars */
import styled from "styled-components"
import Logo from "./Logo"
import MainNav  from "./MainNav"
import { useCabins } from "../features/cabins/useCabins"
const StyledSideBar = styled.aside`
    background-color: var(--color-grey-0);
    padding: 3.2rem 2.4rem;
    border-right: 1px sold var(--color-grey-100);

    grid-row: 1 / -1;

`
function SideBar() {
    const {isLoading, cabins} = useCabins();
    
    return (
        <StyledSideBar>
            <Logo/>
            <MainNav/>
        </StyledSideBar>
    )
}

export default SideBar