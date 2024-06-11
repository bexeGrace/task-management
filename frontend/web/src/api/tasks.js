import axios from 'axios';

export const createTask = async (data) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/tasks/create`, data)
        return response.data
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const loadAllTasksByGroup = async (data) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/tasks/all`, data)
        return response.data;
    } catch (error){
        console.log(error);
        throw error;
    }
}