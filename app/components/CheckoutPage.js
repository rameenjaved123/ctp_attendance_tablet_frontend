import _ from 'lodash';
import {
    StatusBar,
    Text,
    View,
    KeyboardAvoidingView,
    Alert,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useNavigation } from '@react-navigation/native';
import { MenuButton, QRCodeScannerView, CodeEntryView } from '../utils/CommonComponents';
import styles from '../../assets/styles/styles';
import {OFFICE_IDS} from "../../constants/constants";

export default function CheckoutPage(props) {
    const [hasPermission, setHasPermission] = useState(false);
    const [scanData, setScanData] = useState();
    const navigation = useNavigation();
    const [currentDateTime, setCurrentDateTime] = useState(new Date());
    const [visitorCode, setVisitorCode] = useState();
    const [isDisabled, setIsDisabled] = useState(false);
    const { type } = props?.route?.params ? props.route.params : { type: "" };

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    if (!hasPermission) {
        return (
            <View style={styles.container}>
                <Text>Please grant camera permissions to the app.</Text>
            </View>
        );
    }

    const handleGoBack = () => {
        navigation.navigate('MainScreen');
    };

    const handleBarCodeScanned = async ({ data }) => {
        setCurrentDateTime(new Date());
        setScanData(data);
        const noteRegex = /NOTE:(\w+)/;
        const matches = data.match(noteRegex);
        const visitorData = {
            office_id: OFFICE_IDS.NOTTINGHAM,
            checkOutTime: currentDateTime.toLocaleString(),
        };

        let staffStudentData;
        if(type === "staff" || type === "student") {
            staffStudentData = {
                time: currentDateTime.toLocaleString(),
                office_id: OFFICE_IDS.NOTTINGHAM,
                code: visitorCode,
            };
        }

        if (matches && matches.length > 1) {
            const uniqueId = matches[1];
            try {
                const url = getUrl(type, uniqueId);
                const response = await fetch(
                    url,
                    {
                        method: getMethod(type),
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(
                            _.mapKeys(type === "visitor" ? visitorData : staffStudentData, (value, key) => _.snakeCase(key))
                        ),
                    }
                );
                if (response.ok) {
                    Alert.alert('Success', 'Checked out successfully!');
                    handleGoBack();
                    return response;
                } else {
                    // Request failed
                    console.log('Failed to send QR code data:', response.status);
                }
            } catch (error) {
                console.log('Error sending QR code data:', error);
            }
        }
    };

    const handleSubmitCode = async () => {
        setIsDisabled(true);
        const visitorData = {
            checkOutTime: currentDateTime.toLocaleString(),
            office_id: OFFICE_IDS.NOTTINGHAM,
            code: visitorCode,
        };
        let staffStudentData;
        if(type === "staff" || type === "student") {
            staffStudentData = {
                time: currentDateTime.toLocaleString(),
                office_id: OFFICE_IDS.NOTTINGHAM,
                code: visitorCode,
            };
        }
        const url = getUrl(type);
        const response = await fetch(
            url,
            {
                method: getMethod(type),
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    _.mapKeys(type === "visitor" ? visitorData : staffStudentData, (value, key) => _.snakeCase(key))
                ),
            }
        );
        if (response.ok) {
            Alert.alert('Success', 'Checked out successfully!');
            handleGoBack();
            return response;
        } else {
            Alert.alert('Failure', 'Wrong Code, Please enter again!');
            setIsDisabled(false);
        }
    };

    const getUrl = (type, uniqueId = "") => {
        switch (type) {
            case "staff":
                return uniqueId ? `http://159.65.87.253:8081/v1/office-management/checkout/${uniqueId}` : `http://159.65.87.253:8081/v1/office-management/checkout`;
            case "visitor":
                return uniqueId ? `http://159.65.87.253:8081/v1/office-management/visitors/${uniqueId}` : `http://159.65.87.253:8081/v1/office-management/visitors`;
            case "student":
                return uniqueId ? `http://159.65.87.253:8081/v1/office-management/checkout/${uniqueId}` : `http://159.65.87.253:8081/v1/office-management/checkout`;
            default:
                return "";
        }
    };

    const getMethod = (type) => {
        switch (type) {
            case "staff":
                return 'POST';
            case "visitor":
                return 'PATCH';
            case "student":
                return 'POST';
            default:
                return 'POST';
        }
    };

    return (
        <KeyboardAvoidingView
            style={{ backgroundColor: '#fff', flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <View style={{ marginTop: 50 }}>
                <MenuButton onPress={handleGoBack} />
                <QRCodeScannerView scanData={scanData} handleBarCodeScanned={handleBarCodeScanned} />
                <StatusBar style="auto" />
                <CodeEntryView
                    type={type}
                    visitorCode={visitorCode}
                    setVisitorCode={setVisitorCode}
                    handleSubmitCode={handleSubmitCode}
                    isDisabled={isDisabled}
                />
            </View>
        </KeyboardAvoidingView>
    );
}
