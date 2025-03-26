import { createContext, useEffect, useState } from 'react'
import Storage from '@/storage'

export const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
    const [authenticated, setAuthenticated] = useState<boolean>(false)
    const [username, setUsername] = useState<string>('')
    const [initials, setInitials] = useState<string>('')
    const [token, setToken] = useState<string>('')
    const [loading, setLoading] = useState(true)

    const HandleAuthenticated = async (status: boolean) => {
        setAuthenticated(status)
    }

    const HandleUserData = async (data) => {
        setUsername(data.user)
        setToken(data['token'])
        setAuthenticated(true)

        const result = cutWords(data.user)
        setInitials(result)
    }

    const getUserData = () => {
        const response = Storage.RetrieveUserData()
        if (response) {
            setAuthenticated(true)
            setUsername(response.name)
            setToken(response.token)
            setInitials(response.initials);
        } else {
            setAuthenticated(false)
            console.log('No Data')
        }
    }

    const getUsername = () => {
        const response = Storage.RetrieveUserData()
        const name = response.name
        return name
    }

    const cutWords = (words: string) => {
        const name = words.split('  ')
        const first = name.map(name => name[0]).join('')
        return first
    }

    const deleteToken = () => {
        Storage.DeleteUserToken()
        setAuthenticated(false)
        setUsername('')
        setInitials('')
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
            initials,
            token,
            HandleAuthenticated,
            HandleUserData,
            deleteToken,
            getUsername
        }}>
            {children}
        </AuthContext.Provider>
    )
}

