import axios from 'axios';
const BASE_URL = import .meta.env.VITE_API_URL;

class ApiIncomes {

    static async GetAllIncomes() {
        try {
            const response = await axios.get(
                `${BASE_URL}/incomes/`
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


    static async GetIncomeByID({ id }) {
        try {
            const response = await axios.get(
                `${BASE_URL}/incomes/${id}/`
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
                `${BASE_URL}/incomes/`,
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
            const response = await axios.put(`${BASE_URL}/incomes/${id}/`, data)
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
            const response = await axios.delete(`${BASE_URL}/incomes/${id}/`)
            if (response.status === 200) {
                return response.status
            }
            return response.data
        } catch (error) {
            console.log(error)
        }
    }
    
}

export default ApiIncomes