import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import error from '../images/error.png'

const Wrapper = styled.section`
    min-height: 100vh;
    display: grid;
    place-items: center;
    background: var(--clr-primary-10);
    text-align: center;
    h1 {
    font-size: 10rem;
    }
    h3 {
    color: var(--clr-grey-3);
    margin-bottom: 1.5rem;
    }
    img{
        display: inline-block
    }
    `

const ErrorPage = () => {
    return (
        <Wrapper>
            <div>
                <img src={error} alt='404' style={{width: '20rem'}}/>
                <h2>Oops! Looks like your're lost...</h2>
                <h3>Stay where you are and we'll send someone to find you! Or..</h3>
                <Link to='/' className='btn'>Return to mainland</Link>
            </div>
        </Wrapper>
    )
}

export default ErrorPage
