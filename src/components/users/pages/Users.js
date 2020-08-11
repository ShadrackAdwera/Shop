import React, { useEffect, useState } from 'react'
import UserList from '../components/UserList'
import { CircularProgress } from '@material-ui/core'

const Users = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [users, setUsers] = useState([])

    useEffect(()=>{
        fetchUsers()
    }, [])

    const fetchUsers = async () => {
        setIsLoading(true)
        const response = await fetch('http://localhost:5000/api/users')
        const resData = await response.json()
        if(!response.ok) {
            setIsLoading(false)
            throw new Error('Could not find users')
        }
        setIsLoading(false)
        setUsers(resData.users)
    }

 return <React.Fragment>
     {isLoading? <CircularProgress/>: <UserList users={users}/>}
 </React.Fragment>
}

export default Users