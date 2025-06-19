import axios from 'axios';
import { id } from 'date-fns/locale';
const BASE_URL = import .meta.env.VITE_API_URL;


class ApiBalance {
    static async getAllBalances() {
        try {
            const token = localStorage.getItem("access");
            const response = await axios.get(
                `http://localhost:8000/balance/`,
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
}

export default ApiBalance