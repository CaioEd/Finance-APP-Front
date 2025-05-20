import { createContext, useEffect, useState } from 'react'
import Storage from '@/storage'

export const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
    const [authenticated, setAuthenticated] = useState<boolean>(false)

    const [firstName, setFirstName] = useState<string>('')
    const [username, setUsername] = useState<string>('')
    const [token, setToken] = useState<string>('')

    const [loading, setLoading] = useState(true)

    const HandleAuthenticated = async (status: boolean) => {
        setAuthenticated(status)
    }

    const HandleUserData = async (data) => {
        setFirstName(data.first_name)
        setUsername(data.username)
        setToken(data['token'])
        setAuthenticated(true)
    }

    const getUserData = () => {
        const response = Storage.RetrieveUserData()
        if (response) {
            setAuthenticated(true)
            setFirstName(response.first_name)
            setUsername(response.username)
            setToken(response.token)
        } else {
            setAuthenticated(false)
            console.log('No Data')
        }
    }

    const getFirstName = () => {
        const response = Storage.RetrieveUserData()
        const firstname = response.first_name
        return firstname
    }

    const getUsername = () => {
        const response = Storage.RetrieveUserData()
        const username = response.username
        return username
    }

    const deleteToken = () => {
        Storage.DeleteUserToken()
        setAuthenticated(false)
        setUsername('')
        setToken('')
    }

    useEffect(() => {
        getUserData()
        setLoading(false)
    }, [])

    if (loading) {
        return <div>Carregando...</div>
    }

    return (
        <AuthContext.Provider value={{
            authenticated,
            username,
            firstName,
            token,
            HandleAuthenticated,
            HandleUserData,
            deleteToken,
            getFirstName,
            getUsername,
        }}>
            {children}
        </AuthContext.Provider>
    )
}

