import axios from 'axios';

export const checkInForSession = async (data) => {
    const ip = '192.168.0.6';
    const url = `http://${ip}:8085/attendance/checkin`;
    try {
        const response = await axios.post(url, data, {
            headers: {
                'Content-Type': 'application/json',
                'X-Api-Key': 'test'
            }
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
