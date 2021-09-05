import React, {useState,useContext}  from 'react';
import styled from 'styled-components';
import { MdSearch } from 'react-icons/md';
import { GitSearchContext } from '../context/user-context';
import axios from 'axios'

const Wrapper = styled.div`
  position: relative;
  display: grid;
  gap: 1rem 1.75rem;
  @media (min-width: 768px) {
    grid-template-columns: 1fr max-content;
    align-items: center;
    h3 {
      padding: 0 0.5rem;
    }
  }
  .form-control {
    background: var(--clr-white);
    display: grid;
    align-items: center;
    grid-template-columns: auto 1fr auto;
    column-gap: 0.5rem;
    border-radius: 5px;
    padding: 0.5rem;
    input {
      border-color: transparent;
      outline-color: var(--clr-grey-10);
      letter-spacing: var(--spacing);
      color: var(--clr-grey-3);
      padding: 0.25rem 0.5rem;
    }
    input::placeholder {
      color: var(--clr-grey-3);
      text-transform: capitalize;
      letter-spacing: var(--spacing);
    }
    button {
      border-radius: 5px;
      border-color: transparent;
      padding: 0.25rem 0.5rem;
      text-transform: capitalize;
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
    svg {
      color: var(--clr-grey-5);
    }
    input,
    button,
    svg {
      font-size: 1.3rem;
    }
    @media (max-width: 800px) {
      button,
      input,
      svg {
        font-size: 0.85rem;
      }
    }
  }
  h3 {
    margin-bottom: 0;
    color: var(--clr-grey-5);
    font-weight: 400;
  }
`;


const ErrorWrapper = styled.article`
  position: absolute;
  width: 90vw;
  top: 0;
  left: 0;
  transform: translateY(-100%);
  text-transform: capitalize;
  p {
    color: red;
    letter-spacing: var(--spacing);
  }
`;

const Search = () => {
    const [username,setUsername] = useState('')
    const {remainingRequests, error: errorArr, isPageLoading, fetchUserData} = useContext(GitSearchContext)
    const [error] = errorArr

    // console.log('remaining requests', remainingRequests)
    // console.log('error message', error)

    // const remaining 

    // const getRateLimit = async ()=>{
    //     const searchResponse = await axios(`https://api.github.com/users/${username}`)
    //     console.log(`${username} search response`, searchResponse)

        // const {remainingRequests: remaining} = useContext(GitSearchContext)

        // setRemainingRequests(remaining)

    //     const response = await axios('https://api.github.com/rate_limit')
    //     console.log('data', response)
    //     const {data: {rate: {remaining}}} = response
    //     console.log('remaining_limit', remaining)
        
    //     setRemainingRequests(remaining)
    //     console.log('remaining', remainingRequests)
    // }

    const formSubmitHandler = event=>{
        event.preventDefault()
        
        fetchUserData(username)
        
        // console.log(username)
    }

    const updateUsername = event=>{
        setUsername(event.target.value)
    }

    return <section className='section'>
        <Wrapper className='section-center'>
            {error.hasError && <ErrorWrapper>
                <p>{error.message}</p>
              </ErrorWrapper>}
            <form className='form-control' onSubmit={formSubmitHandler}>
                <MdSearch></MdSearch>
                <input type='text' placeholder='Enter username' value={username} onChange={updateUsername} />
                {remainingRequests > 0 && !isPageLoading && <button type='submit'>Search</button>}
            </form>
            <h3>Requests: {remainingRequests}/ 60</h3>
        </Wrapper>
    </section>;
};


export default Search;