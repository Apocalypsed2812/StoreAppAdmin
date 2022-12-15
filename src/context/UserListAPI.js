import { useState, useEffect } from 'react'
import { getMethod } from '../utils/fetchData'

function UserListAPI() {
    const [userList, setUserList] = useState([])
    useEffect(() => {
        const getAllUser = async () => {
            let response = await getMethod("get-all-user")
            return response
        }
        getAllUser()
            .then(res => {
                if (res.success) {
                    setUserList(res.users)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    return {
        userList: [userList, setUserList],
    }
}

export default UserListAPI
