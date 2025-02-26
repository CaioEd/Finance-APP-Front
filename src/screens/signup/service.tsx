import axios from 'axios'
const BASE_URL = import .meta.env.VITE_API_URL


class ApiSignup {
    static async Login({ data }) {
        try {
            const response = await axios.post(
                `${BASE_URL}login`, data
            )
            if (response.status === 201) {            
                return response.data
            }
            return response.data
        } catch (error) {
            console.log(error)
        }
    }
}

export default ApiSignup