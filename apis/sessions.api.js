import axios from 'axios';
import {OFFICE_IDS} from "../constants/constants";

export const fetchSessions = async () => {
    const ip = '192.168.0.6';
    const url = `http://${ip}:8085/sessions?campus_id=${OFFICE_IDS.NOTTINGHAM}`;
    try {
        console.log('Making API request to:', url);
        const response = await axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
                'X-Api-Key': 'test'
            },
        });

        console.log("Response received:", response);
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
