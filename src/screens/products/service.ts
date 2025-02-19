import axios from 'axios';
const BASE_URL = import .meta.env.VITE_API_URL;

class ApiProduct {
    static async GetAllProducts() {
        try {
            const response = await axios.get(
                `${BASE_URL}/products`
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


    static async GetProductByID({ id }) {
        try {
            const response = await axios.get(
                `${BASE_URL}/product/${id}`
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
                `${BASE_URL}products`,
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
            const response = await axios.put(`${BASE_URL}products/${id}`, data)
            if (response.status === 200) {
                return response.status
            }
            return response.data
        } catch (error) {
            console.log(error)
        }
    }

}

export default ApiProduct