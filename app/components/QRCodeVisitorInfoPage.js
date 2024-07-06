import React, {useState} from 'react';
import {View, Image, ScrollView, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {SIZES} from "../../constants";

const QRCodeVisitorInfoPage = ({ route }) => {
    const { qrCodeUrl, code } = route.params;
    const [isDisabled, setIsDisabled] = useState(true);
    const navigation = useNavigation();

    const handleGoBack = () => {
        navigation.navigate('MainScreen');
    };
    const handlePrintCard = () => {
        console.log("PRINT CARD")
    };
    return (
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
            <View style={styles.row}>
                <View style={[styles.column, {flex: 2}]}>
                    <Image source={{ uri: qrCodeUrl }} style={styles.qrCodeImage} />
                </View>
                <View style={[styles.column, {flex: 1}]}>
                    <TouchableOpacity style={styles.menuButton} onPress={handleGoBack}>
                        <Text style={styles.buttonText}>MENU</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Text style={styles.photo}>
                TAKE THE PICTURE OF THIS QR CODE
            </Text>
            <Text style={{...styles.printText}}>OR</Text>
            <TouchableOpacity style={[styles.printButton, isDisabled && { backgroundColor: '#e0e0e0' }]} disabled={isDisabled} onPress={handlePrintCard}>
                <Text style={styles.buttonText}>PRINT CARD</Text>
            </TouchableOpacity>
            <Text style={styles.code}>
                CODE: <Text style={styles.highlightedCode}>{code}</Text>
            </Text>
            <Text style={styles.description}>
                Please remember to scan during checkout!
            </Text>
                </View>
            </ScrollView>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row', // Display components side by side
        justifyContent: 'space-between', // Space between columns
    },
    column: {
        padding: SIZES.medium,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    highlightedCode: {
        backgroundColor: '#FFD700', // Yellow background color (adjust as needed)
        color: 'black', // Text color (adjust as needed)
        padding: 4, // Padding around the highlighted code (adjust as needed)
        borderRadius: 4, // Rounded corners for the background (adjust as needed)
    },
    qrCodeImage: {
        width: 350,
        height: 350,
        alignSelf: 'flex-end'
    },
    description: {
        padding:10,
        fontWeight: 600,
        fontSize: 18,
    },
    code: {
        padding:10,
        marginTop: 10,
        fontWeight: 600,
        fontSize: 30,
    },
    photo: {
        fontWeight:700,
        fontSize: 30,
        textAlign: 'center',
    },
    printText: {
        margin:10,
        fontSize: 24,
        fontWeight: '700',
        color: '#5e5e5e',
    },
    printButton: {
        width: '20%',
        height: 60,
        backgroundColor: '#0089DA',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    menuButton: {
        alignSelf: 'flex-end',
        width: '30%',
        height: 60,
        backgroundColor: '#0089DA',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white'
    },
});

export default QRCodeVisitorInfoPage;
