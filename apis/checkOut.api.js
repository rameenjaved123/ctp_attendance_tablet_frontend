import axios from 'axios';

export const checkOutForSession = async (data) => {
    const ip = '192.168.1.114';
    const url = `https://ctpattendance.co.uk/v1/attendance/checkout`;
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
