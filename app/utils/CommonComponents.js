import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';
import { BarCodeScanner } from 'expo-barcode-scanner';
import styles from '../../assets/styles/styles';

export const MenuButton = ({ onPress }) => (
    <TouchableOpacity style={styles.menuButton} onPress={onPress}>
        <Text style={styles.buttonText}>MENU</Text>
    </TouchableOpacity>
);

export const QRCodeScannerView = ({ scanData, handleBarCodeScanned }) => {
    const [hasPermission, setHasPermission] = useState(null);

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            console.log(`Camera permission status: ${status}`);
            setHasPermission(status === 'granted');
        })();
    }, []);

    if (hasPermission === null) {
        return <Text>Requesting camera permission...</Text>;
    }

    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    console.log('Rendering BarCodeScanner...');
    return (
        <View style={{ alignItems: 'center', alignSelf: 'flex-end', marginTop: -50, marginRight: 70 }}>
            <AntDesign name="qrcode" size={40} color="black" />
            <Text style={{ fontWeight: '600', fontSize: 20, marginBottom: 30 }}>
                Please move your QR code towards the camera
            </Text>
            <BarCodeScanner
                type={BarCodeScanner.Constants.Type.front}
                style={{ width: 600, height: 550 }}
                onBarCodeScanned={scanData ? undefined : handleBarCodeScanned}
            />
        </View>
    );
};

export const CodeEntryView = ({ type, visitorCode, setVisitorCode, handleSubmitCode, isDisabled }) => (
    <>
        <View style={{ flexDirection: 'row', alignItems: 'center', position: 'absolute', height: 40, left: 20, top: 150 }}>
            <TextInput
                style={styles.input}
                value={visitorCode}
                placeholder={`Please enter ${type} code here`}
                placeholderTextColor="gray"
                onChangeText={setVisitorCode}
            />
        </View>
        <TouchableOpacity
            style={[styles.button, isDisabled && { backgroundColor: '#e0e0e0' }]}
            disabled={isDisabled}
            onPress={handleSubmitCode}
        >
            <Text style={styles.buttonText}>SUBMIT</Text>
        </TouchableOpacity>
    </>
);
