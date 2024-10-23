
import axios from 'axios';

const API_BASE_URL = 'https://backend-quicksell.onrender.com'; 
export const fetchTicketsByUser = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/get-id`);
        return response.data; 
    } catch (error) {
        console.error('Error fetching tickets by user:', error);
        throw error;
    }
};

export const fetchTicketsByStatus = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/get-status`);
        console.log(response)
        return response.data; 
    } catch (error) {
        console.error('Error fetching tickets by status:', error);
        throw error;
    }
};

export const fetchTicketsByPriority = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/get-priority`);
        return response.data; 
    } catch (error) {
        console.error('Error fetching tickets by priority:', error);
        throw error;
    }
};
