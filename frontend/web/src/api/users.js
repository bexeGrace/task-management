import axios from 'axios';

export const loadAllUsers = async (data) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/all`, data)
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}