import React from 'react'
import styled from 'styled-components'
import {useAuth0} from '@auth0/auth0-react'

const Wrapper = styled.nav`
  padding: 1.5rem;
  margin-bottom: 4rem;
  background: var(--clr-white);
  text-align: center;
  display: grid;
  grid-template-columns: auto auto 100px;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  h4 {
    margin-bottom: 0;
    font-weight: 400;
  }
  img {
    width: 35px !important;
    height: 35px;
    border-radius: 50%;
    object-fit: cover;
  }
  button {
    border-radius: 5px;
      border-color: transparent;
      padding: 0.25rem 0.5rem;
      text-transform: uppercase;
      letter-spacing: var(--spacing);
      background: var(--clr-primary-5);
      color: var(--clr-white);
      transition: var(--transition);
      cursor: pointer;
      &:hover {
        background: var(--clr-primary-8);
        color: var(--clr-primary-1);
      }
  }
`;

const Navbar = () => {
    const {isAuthenticated, loginWithRedirect, logout, user, isLoading} = useAuth0()

    console.log('authentication', {isAuthenticated,user,isLoading})

    const userCredentials = isAuthenticated && user
    console.log(userCredentials)
    
    return (
        <Wrapper>
            {/* user image */}
            {userCredentials && userCredentials.picture &&
             <img src={userCredentials.picture} alt={userCredentials.picture} />}
             {/* user name and welcome message */}
             {userCredentials && userCredentials.name && 
             <h4>Welcome, <strong>{userCredentials.name}</strong></h4>}
             {/* login button */}
            {!isAuthenticated && <button onClick={loginWithRedirect}>Login</button>}
            {isAuthenticated && <button onClick={()=>{logout({returnTo: window.location.origin})}}>Logout</button>}
        </Wrapper>
    )
}

export default Navbar
