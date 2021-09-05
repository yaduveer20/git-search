import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import spinner from '../images/spinner.gif';
import styled from 'styled-components';

const Wrapper = styled.section`
  min-height: 100vh;
  display: grid;
  place-items: center;
  img {
    width: 150px;
  }
`;

const Auth0Wrapper = ({children})=> {
    const {isLoading,error} = useAuth0()

    if(isLoading){
        return <Wrapper>
            <img src={spinner} alt='spinner' />
        </Wrapper>
    }

    if(error){
        return <Wrapper>
            <h1>{error.message}</h1>
        </Wrapper>
    }
  return <>{children}</>;
}

export default Auth0Wrapper;