class Storage {
    static async StoreUserData(data) {
        const name = data['user']
        const token = data['access_token']
        const format = await this.formatName(name)

        try {
            localStorage.setItem('name', name)
            localStorage.setItem('token', token)
            localStorage.setItem('initials', format)
        } catch (error) {
            console.log(error)
        }
    }

    static RetrieveUserData() {
        try {
            const name = localStorage.getItem('name')
            const token = localStorage.getItem('token')
            const initials = localStorage.getItem('initials')
            return { name, token, initials }
        } catch (error) {
            console.log(error)
        }
    }

    static async DeleteUserToken() {
        try {
            localStorage.removeItem('name')
            localStorage.removeItem('userid')
            localStorage.removeItem('token')
            localStorage.removeItem('initials')
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