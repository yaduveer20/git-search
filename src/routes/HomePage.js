import React, {useContext} from 'react'
import {Navbar,Search,UserDetails,UserCard,Repos} from '../components/index.js'
import {GitSearchContext} from '../context/user-context'
import spinner from '../images/spinner.gif'
import styled from 'styled-components'


const Wrapper = styled.section`
    h3 {
        text-align: center;
        place-items: center;
        color: var(--clr-grey-5)
    }
`

const HomePage = () => {
    const {isPageLoading, isUserMounted,error: errorArr} = useContext(GitSearchContext)
    const [error] = errorArr
    const consoleContent = error.hasError ? `User doesn't exists. Type a valid username` : 'Search an username'
    // console.log('haserror', error, consoleContent)


    if(isPageLoading) return (
        <div>
            <Navbar />
            <Search />
            <img src={spinner} className='spinner' alt='spinner' />
        </div>
    )

    return (
        <div>
            <Navbar />
            <Search />
            {(!isUserMounted || error.hasError) && <section className='section'>
                <Wrapper >
                    <h3>{consoleContent}</h3>
                </Wrapper>
            </section>}
            {!error.hasError && isUserMounted && <UserDetails />}
            {!error.hasError && isUserMounted && <UserCard />}
            {!error.hasError && isUserMounted && <Repos />}
        </div>
    )
}

export default HomePage
