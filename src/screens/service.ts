import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_URL;


class ApiDashboard {
    static async getTotalExpenses() {
        try {
            const token = localStorage.getItem("access");
            const response = await axios.get(
                `${BASE_URL}/expenses/month`,
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

    static async getTotalIncomes() {
        try {
            const token = localStorage.getItem("access");
            const response = await axios.get(
                `${BASE_URL}/incomes/month`,
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

    static async getBalance() {
        try {
            const token = localStorage.getItem("access");
            const response = await axios.get(
                `${BASE_URL}/balance/month/`,
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

    static async getBalanceByDate(start_date: string, end_date: string) {
        try {
            const token = localStorage.getItem("access");
            const response = await axios.get(
                `${BASE_URL}/balance/date/?start_date=${start_date}&end_date=${end_date}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            if (response.status === 200) {
                return response.data
            }
        } catch (error) {
            console.log(error)
        }
    }

    static async downloadPdfApi(start_date: string, end_date: string) {
        try {
            const token = localStorage.getItem("access");
            return axios.get(
                `${BASE_URL}/download/balance/date/?start_date=${start_date}&end_date=${end_date}`,
                {
                    responseType: 'blob',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
        } catch (error) {
            console.log(error)
        }
    }

}

export default ApiDashboard