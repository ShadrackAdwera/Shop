import React, { useEffect, useState } from 'react'
import UserList from '../components/UserList'
import { CircularProgress } from '@material-ui/core'
import ErrorModal from '../../UI/ErrorModal'

const Users = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState()
    const [users, setUsers] = useState([])

    useEffect(()=>{
        fetchUsers()
    }, [])

    const fetchUsers = async () => {
        setIsLoading(true)
        try {
            const response = await fetch('http://localhost:5000/api/users')
        const resData = await response.json()
        if(!response.ok) {
            throw new Error('Could not find users')
        }
        setUsers(resData.users)
        setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            setError('Could not find users')
        }
    }

 return <React.Fragment>
     <ErrorModal error={error} onClear={()=>setError(null)}/>
     {isLoading? <div className='center'><CircularProgress/></div>: <UserList users={users}/>}
 </React.Fragment>
}

export default Users