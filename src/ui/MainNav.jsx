/* eslint-disable no-unused-vars */
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { IoHomeOutline } from "react-icons/io5";
import { CiCalendar } from "react-icons/ci";
import { HiOutlineHomeModern } from "react-icons/hi2";
import { HiOutlineUsers } from "react-icons/hi2";
import { HiOutlineCog6Tooth } from "react-icons/hi2";


const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    color: var(--color-grey-600);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
  }

  /* This works because react-router places the active class on the active NavLink */
  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800);
    background-color: var(--color-grey-50);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-600);
  }
`;

function MainNav(){
  return (
    <nav>
      <NavList>
        <li>
          <StyledNavLink to='/dashboard'>
          <IoHomeOutline />
            home
          </StyledNavLink> 
        </li> {/* we use navlinks to prevent the page from reloawding avery time we click on a link */}
        <li>
          <StyledNavLink to='/bookings'>
            <CiCalendar />
            booking
          </StyledNavLink> 
        </li>
        <li>
          <StyledNavLink to='/cabins'>
            <HiOutlineHomeModern />
            Cabins
          </StyledNavLink> 
        </li>
        <li>
          <StyledNavLink to='/users'>
          <HiOutlineUsers />
            Users
          </StyledNavLink> 
        </li>
        <li>
          <StyledNavLink to='/settings'>
            <HiOutlineCog6Tooth />
            Settings
          </StyledNavLink> 
        </li>

      </NavList>
    </nav>
  );
}

export default MainNav;
