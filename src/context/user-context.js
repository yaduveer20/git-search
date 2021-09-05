import userInfo from './userData/userInfo'
import userFollowers from './userData/userFollowers'
import userRepos from './userData/userRepos'
import axios from 'axios'

import React, {useState,useEffect} from 'react'

const GitSearchContext = React.createContext()

const rootGithubUrl = 'https://api.github.com'

const GitSearchProvider = ({children})=>{
    const [user,setUser] = useState(userInfo)
    const [followers, setFollowers] = useState(userFollowers)
    const [repos, setRepos] = useState(userRepos)

    const [isPageLoading, setIsPageLoading] = useState(false)
    const [isUserMounted, setIsUserMounted] = useState(false)

    const [remainingRequests, setRemainingRequests] = useState(0)
    const [error, setError] = useState([{hasError: false, message: ''}])

    const toggleError = (hasError = false, message='')=>{
        // console.log('inside toggle', hasError, message)
        setError([{hasError,message}])
    }
    
    
    const getRemainingRequests = async ()=>{
        try{
            const response = await axios(`${rootGithubUrl}/rate_limit`)
            let {data: {rate: {remaining}}} = response
            // console.log('remaining', response)
            // remaining = 0
            // console.log('remaining', response)
            // remaining = 0
            setRemainingRequests(remaining)
            // console.log('getting remaining', remaining)
            if(!remaining) throw new Error('Sorry, you have exceeded hourly requests limit.')
        }
        catch(error){
            // console.log('error', error)
            toggleError(true,error.message)
        }
    }

    const fetchUserData = async (username)=>{
        try{
            setIsUserMounted(true)
            setIsPageLoading(true)
            toggleError()
            const userData = await axios(`${rootGithubUrl}/users/${username}`)
            .catch(error=> console.Error(error))
            // console.log('userData', userData)
            if(!userData) throw new Error('Invalid username!')
            const {data} = userData

            const {followers_url, repos_url} = data
            // console.log('urls', followers_url, repos_url)


            const promises = await Promise.allSettled([
                axios(`${followers_url}?per_page=100`), 
                axios(`${repos_url}?per_page=100`)
            ]) 

            getRemainingRequests()

            if(promises[0].status !== 'fulfilled' && promises[0].status != 'fulfilled'){
                throw new Error('Failed to fetch required data')
            }

            // console.log('promises', promises)

            const [followers_interm, repos_interm] = promises
            const {value: {data: followers}} = followers_interm
            const {value: {data: repos}} = repos_interm
            
            // console.log('followers', followers, repos)

            setUser(data)
            setFollowers(followers)
            setRepos(repos)

            // if(promises.)
        }
        catch(error){
            toggleError(true,error.message)
        }

        setIsPageLoading(false)
    }

    useEffect(getRemainingRequests,[])

    

    return <GitSearchContext.Provider value={{user,followers,repos,remainingRequests, error, isPageLoading, isUserMounted, fetchUserData}}>
        {children}
    </GitSearchContext.Provider>
}

export {GitSearchContext, GitSearchProvider}