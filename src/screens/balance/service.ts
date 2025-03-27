import axios from 'axios';
import { id } from 'date-fns/locale';
const BASE_URL = import .meta.env.VITE_API_URL;


class ApiBalance {
    static async getAllBalances() {
        try {
            const response = await axios.get(
                `http://localhost:8000/balance/`
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