import axios from 'axios';
import { id } from 'date-fns/locale';
const BASE_URL = import .meta.env.VITE_API_URL;

class ApiExpenses {
    static async GetAllExpenses() {
        try {
            const token = localStorage.getItem("access");
            const response = await axios.get(
                `${BASE_URL}/expenses/`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
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
            const token = localStorage.getItem("access");
            const response = await axios.get(
                `${BASE_URL}/expenses/${id}/`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
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
            const token = localStorage.getItem("access");
            const response = await axios.post(
                `${BASE_URL}/expenses/`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
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
            const token = localStorage.getItem("access");
            const response = await axios.put(`${BASE_URL}/expenses/${id}/`, data,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
            )
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
            const token = localStorage.getItem("access");
            const response = await axios.delete(`${BASE_URL}/expenses/${id}/`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
            )
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