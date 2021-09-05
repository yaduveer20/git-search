import React from 'react'
import {Route,Redirect} from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'

const RegulatedRoute = ({children, ...props}) => {
    const {isAuthenticated, user} = useAuth0()
    const userExists = isAuthenticated && user

    console.log('user', userExists)

    return <Route {...props} render={()=>{
        return userExists ? children : <Redirect to='login'></Redirect>
    }}>
    </Route>
}

export default RegulatedRoute
