import {OFFICE_IDS} from "../constants/constants";

const _ = require('lodash');
//QR Request to generate a QR
export const makeQRRequest = async (data) => {
    const zxingBaseUrl = 'https://zxing.org/w/chart';
    const vCardData = `BEGIN:VCARD\nVERSION:3.0\nN:${data?.uname}\nORG:${data?.department}\nTEL:${data?.phone}\n\nNOTE:${data?.memo}\nEND:VCARD`;
    const queryParams = {
        cht: 'qr',
        chs: '350x350',
        chld: 'L',
        choe: 'UTF-8',
        chl: vCardData
    };
    const encodeQueryParams = (params) => {
        return Object.entries(params)
            .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
            .join('&');
    };
    const zxingUrlWithQueryParams = `${zxingBaseUrl}?${encodeQueryParams(queryParams)}`;
    console.log("completeUrl", zxingUrlWithQueryParams);
    try {
        const response = await fetch(zxingUrlWithQueryParams);
        if (response?.status === 200) {
            return response?.url;
        } else if (response.status === 400) {
            const error = await response.json();
            console.error('Bad Request:', error);
        } else if (response.status === 401) {
            const error = await response.json();
            console.error('Authentication Failed:', error);
        } else {
            console.error('API request failed with status:', response.status);
        }
    } catch (error) {
        console.error('Error making API request:', error);
    }
};
// post call for generating unique id
export const generateUniqueId = async (data) => {
    const updatedData = {
        ...data,
        office: {
            id: OFFICE_IDS.NOTTINGHAM
        }
    }
    const url = 'http://159.65.87.253:8081/v1/office-management/visitors';
    try {
        console.log("updatedData 1",updatedData);
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify(_.mapKeys(updatedData, (value, key) => _.snakeCase(key))),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(url, requestOptions);
        if (response.ok) {
            return response.json();
        } else if (response.status === 400) {
            const error = await response.json();
            console.error('Bad Request:', error);
        } else if (response.status === 401) {
            const error = await response.json();
            console.error('Authentication Failed:', error);
        } else {
            console.error('API request failed with status:', response.status);
        }
    } catch (error) {
        console.error('Error making API request:', error);
    }
};

export const checkedInRequest = async (data) => {
    const updatedData = {
        ...data,
        office: {
            id: OFFICE_IDS.NOTTINGHAM
        }
    }
    const url = `http://159.65.87.253:8081/v1/office-management/visitors/${data?.id}`;
    try {
        const requestOptions = {
            method: 'PATCH',
            body: JSON.stringify(_.mapKeys(updatedData, (value, key) => _.snakeCase(key))),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(url, requestOptions);
        if (response.ok) {
            return response;
        } else if (response.status === 400) {
            const error = await response.json();
            console.error('Bad Request:', error);
        } else if (response.status === 401) {
            const error = await response.json();
            console.error('Authentication Failed:', error);
        } else {
            console.error('API request failed with status:', response.status);
        }
    } catch (error) {
        console.error('Error making API request:', error);
    }
};
