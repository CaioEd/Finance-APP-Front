import axios from 'axios';
import { id } from 'date-fns/locale';
const BASE_URL = import .meta.env.VITE_API_URL;

class ApiRegister {
    static async GetAllRegisters() {
        try {
            const response = await axios.get(
                `${BASE_URL}/registers`
            )
            console.log('response', response.data)
            if (response.status === 200) {
                return response.data
            }
            return response.data
        } catch (error) {
            console.log(error)
        }
    }

    static async GetRegisterByID({ id }) {
        try {
            const response = await axios.get(
                `${BASE_URL}/register/${id}`
            )
            if (response.status === 200) {
                return response.data
            }
            return response.data
        } catch (error) {
            console.log(error)
        }
    }

    static async Insert( data: any ) {
        try {
            const response = await axios.post(
                `${BASE_URL}register`,
                data
            )
            if (response.status === 201) {
                return response.data
            }
            return response.data
        } catch (error) {
            console.log(error)
        }
    }

    static async Update({ id, data }) {
        try {
            const response = await axios.put(`${BASE_URL}/register/${id}`, data)
            if (response.status === 200) {
                return response.status
            }
            return response.data
        } catch (error) {
            console.log(error)
        }
    }

    static async Delete ({ id }) {
        try {
            const response = await axios.delete(`${BASE_URL}/register/${id}`)
            if (response.status === 200) {
                return response.status
            }
            return response.data
        } catch (error) {
            console.log(error)
        }
    }


}

export default ApiRegister