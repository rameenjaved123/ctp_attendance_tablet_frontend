import axios from 'axios';
import {OFFICE_IDS} from "../constants/constants";

export const fetchSessions = async () => {
    const url = `https://ctpattendance.co.uk/v1/sessions/?campus_id=${OFFICE_IDS.NOTTINGHAM}&session_date=${new Date().toISOString().split('T')[0]}`;
    try {
        const response = await axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
                'X-Api-Key': 'test'
            },
        });

        return response.data;

    } catch (error) {
        if (error.response) {
            console.error('API request failed with status:', error.response.status, error.response.data);
        } else {
            console.error('Error making API request:', error.message || error);
        }
        return null;
    }
};
