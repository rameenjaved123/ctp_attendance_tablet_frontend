import {
    StatusBar,
    View,
    Text,
    KeyboardAvoidingView,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useNavigation } from '@react-navigation/native';
import { getCheckInUrl, handleFetch, showAlert } from '../utils/utils';
import { MenuButton, QRCodeScannerView, CodeEntryView } from '../utils/CommonComponents';
import styles from '../../assets/styles/styles';
import {OFFICE_IDS} from "../../constants/constants";

export default function StaffStudentCheckIn(props) {
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
        const updatedData = {
            time: currentDateTime.toLocaleString(),
            office_id: OFFICE_IDS.NOTTINGHAM,
        };
        if (matches && matches.length > 1) {
            const uniqueId = matches[1];
            const url = getCheckInUrl(type, uniqueId);
            if (url) {
                const response = await handleFetch(url, updatedData);
                if (response.ok) {
                    showAlert('Success', 'Checked In successfully!');
                    handleGoBack();
                } else {
                    console.log('Failed to send QR code data:', response.status);
                }
            }
        }
    };

    const handleSubmitCode = async () => {
        setIsDisabled(true);
        const updatedData = {
            time: currentDateTime.toLocaleString(),
            code: visitorCode,
            office_id: OFFICE_IDS.NOTTINGHAM,
        };
        const url = getCheckInUrl(type);
        if (url) {
            const response = await handleFetch(url, updatedData);
            if (response.ok) {
                showAlert('Success', 'Checked In successfully!');
                handleGoBack();
            } else {
                showAlert('Failure', 'Wrong Code, Please enter again!');
                setIsDisabled(false);
            }
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
