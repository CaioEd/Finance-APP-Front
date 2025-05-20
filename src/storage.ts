class Storage {
    static async StoreUserData(data: any) {
        const name = data['name'] || 'Caio'
        const token = data['token']

        try {
            localStorage.setItem('name', name)
            localStorage.setItem('token', token)
        } catch (error) {
            console.log(error)
        }
    }

    static RetrieveUserData() {
        try {
            const name = localStorage.getItem('name')
            const token = localStorage.getItem('token')
            return { name, token }
        } catch (error) {
            console.log(error)
        }
    }

    static async DeleteUserToken() {
        try {
            localStorage.removeItem('name')
            localStorage.removeItem('userid')
            localStorage.removeItem('token')
        } catch (error) {
            console.log(error)
        }
    }

    static async formatName(name) {
        const result = name.split(' ')
        const first = result.map(name => name[0]).join('')
        return first
    }
}

export default Storage