import axios from 'axios';

const BaseUrl = process.env.REACT_APP_API_URL

export const createTask = async (data) => {
    try {
        const response = await axios.post(`${BaseUrl}/api/tasks/create`, data)
        return response.data
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const updateTask = async (id, data) => {
    try {
        const response = await axios.patch(`${BaseUrl}/api/tasks/task/${id}`, data)
        return response.data
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const deleteTask = async (id) => {
    try {
        const response = await axios.delete(`${BaseUrl}/api/tasks/task/${id}`)
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const createTaskGroup = async (data) => {
    try {
        const response = await axios.post(`${BaseUrl}/api/tasks/create-group`, data)
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const deleteTaskGroup = async (id) => {
    try {
        const response = await axios.delete(`${BaseUrl}/api/tasks/group/${id}`)
        return response.data;
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