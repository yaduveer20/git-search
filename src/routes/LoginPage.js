
import React from 'react';
import styled from 'styled-components';
import logo from '../images/logo.png'
import {Link} from 'react-router-dom'

import {useAuth0} from '@auth0/auth0-react'

const Wrapper = styled.section`
  min-height: 100vh;
  display: grid;
  place-items: center;
  .container {
    width: 90vw;
    max-width: 600px;
    text-align: center;
  }
  img {
    margin-bottom: 2rem;
  }
  h1 {
    margin-bottom: 1.5rem;
  }
`;

const LoginPage = () => {
  const {loginWithRedirect} = useAuth0()

  return <Wrapper>
      <div className='container'>
          <img src={logo} alt='logo' />
          <Link to='/'>
            <button className='btn' onClick={loginWithRedirect}>Login</button>
          </Link>
      </div>
  </Wrapper>;
};

export default LoginPage;