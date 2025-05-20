class Storage {
    static async StoreUserData(data: any) {
        const name = data['first_name']
        const username = data['username'] 
        const token = data['token']

        try {
            localStorage.setItem('first_name', name)
            localStorage.setItem('username', username)
            localStorage.setItem('token', token)
        } catch (error) {
            console.log(error)
        }
    }

    static RetrieveUserData() {
        try {
            const name = localStorage.getItem('first_name')
            const username = localStorage.getItem('username')
            const token = localStorage.getItem('token')
            return { name, username, token }
        } catch (error) {
            console.log(error)
        }
    }

    static async DeleteUserToken() {
        try {
            localStorage.removeItem('first_name')
            localStorage.removeItem('username')
            localStorage.removeItem('userid')
            localStorage.removeItem('token')
        } catch (error) {
            console.log(error)
        }
    }
}

export default Storage