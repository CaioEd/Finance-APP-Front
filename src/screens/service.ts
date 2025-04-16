import axios from "axios";
const BASE_URL = import .meta.env.VITE_API_URL;


class ApiDashboard {
    static async getTotalExpenses() {
        try {
            const response = await axios.get(
                `${BASE_URL}/expenses/month`
            )
            if (response.status === 200) {
                return response.data
            }
            return response.data

        } catch (error) {
            console.log(error)
        }
    }

    static async getTotalIncomes() {
        try {
            const response = await axios.get(
                `${BASE_URL}/incomes/month`
            )
            if (response.status === 200) {
                return response.data
            }
            
            return response.data
        } catch (error) {
            console.log(error)
        }
    }

    static async getBalance() {
        try {
            const response = await axios.get(
                `${BASE_URL}/balance/month/`
            )
            if (response.status === 200) {
                return response.data
            }
            
            return response.data
        } catch (error) {
            console.log(error)
        }
    }

    static async getBalanceByDate(start_date: string, end_date: string) {
        try {
            const response = await axios.get(
                `${BASE_URL}/balance/date/?start_date=${start_date}&end_date=${end_date}`
            )
            if (response.status === 200) {
                return response.data
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export default ApiDashboard