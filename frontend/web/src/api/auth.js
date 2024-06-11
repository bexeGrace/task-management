import axios from 'axios';

export const login = async (data) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const register = async (data) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, data)
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}