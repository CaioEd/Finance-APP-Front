import axios from 'axios';
import { id } from 'date-fns/locale';
const BASE_URL = import .meta.env.VITE_API_URL;

class ApiExpenses {
    static async GetAllExpenses() {
        try {
            const response = await axios.get(
                `${BASE_URL}/expenses/`
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

    static async GetExpenseByID({ id }) {
        try {
            const response = await axios.get(
                `${BASE_URL}/expenses/${id}/`
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
                `${BASE_URL}/expenses/`,
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
            const response = await axios.put(`${BASE_URL}/expenses/${id}`, data)
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
            const response = await axios.delete(`${BASE_URL}/expenses/${id}`)
            if (response.status === 200) {
                return response.status
            }
            return response.data
        } catch (error) {
            console.log(error)
        }
    }


}

export default ApiExpenses