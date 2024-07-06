import { Alert } from 'react-native';
import _ from 'lodash';

export const getCheckInUrl = (type, uniqueId) => {
    switch (type) {
        case 'staff':
            return uniqueId
                ? `http://159.65.87.253:8081/v1/office-management/checkin/${uniqueId}`
                : `http://159.65.87.253:8081/v1/office-management/checkin`;
        case 'student':
            return uniqueId
                ? `http://159.65.87.253:8081/v1/student-management/checkin/${uniqueId}`
                : `http://159.65.87.253:8081/v1/student-management/checkin`;
        case 'visitor':
            return uniqueId
                ? `http://159.65.87.253:8081/v1/visitor-management/checkin/${uniqueId}`
                : `http://159.65.87.253:8081/v1/visitor-management/checkin`;
        default:
            return null;
    }
};

export const getCheckOutUrl = (type, uniqueId) => {
    return type === "staff"
        ? `http://159.65.87.253:8081/v1/office-management/checkout/${uniqueId}`
        : `http://159.65.87.253:8081/v1/office-management/visitors/${uniqueId}`;
};

export const handleFetch = async (url, updatedData, method = 'POST') => {
    try {
        const response = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(_.mapKeys(updatedData, (value, key) => _.snakeCase(key))),
        });
        return response;
    } catch (error) {
        console.log('Error sending data:', error);
        return { ok: false };
    }
};

export const showAlert = (title, message) => {
    Alert.alert(title, message);
};
