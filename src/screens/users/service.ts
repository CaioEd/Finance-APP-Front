import axios from 'axios';
const BASE_URL = import .meta.env.VITE_API_URL;

class ApiUser {

    static async GetUserByID({ id }) {
        try {
            const response = await axios.get(
                `${BASE_URL}/users/${id}/`
            )
            if (response.status === 200) {
                return response.data
            }
            return response.data
        } catch (error) {
            console.log(error)
        }
    }

    static async Update({ id, data }) {
        try {
            const response = await axios.put(`${BASE_URL}users/${id}/`, data)
            if (response.status === 200) {
                return response.status
            }
            return response.data
        } catch (error) {
            console.log(error)
        }
    }

}

export default ApiUser