import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Alert, Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const CheckInOutScreen = (props) => {
    const navigation = useNavigation();
    const { type } = props?.route?.params ? props.route.params : { type: "" };

    let imagePath;
    if (type === "staff") {
        imagePath = require('../../assets/images/staff.png');
    } else if (type === "student") {
        imagePath = require('../../assets/images/student.png');
    } else {
        imagePath = require('../../assets/images/visitors.png');
    }

    const handleCheckInPress = () => {
        if (type === "student" || type === "staff") {
            navigation.navigate('StaffStudentCheckIn', { type });
        } else {
            navigation.navigate('CheckIn', {type : "visitor"});
        }
    };

    const handleCheckOutPress = () => {
        if (type === "student" || type === "staff") {
            navigation.navigate('CheckoutPage', { type });
        } else {
            navigation.navigate('CheckoutPage', {type : "visitor"});
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.cardContainer}>
                <Image
                    source={imagePath} // Use the variable imagePath here
                    resizeMode="contain"
                />
            </View>
            <View style={styles.topHalf}>
                <Text style={styles.smallTitle}>Please select one of the options below</Text>
            </View>
            <View style={styles.bottomHalf}>
                <View style={styles.cardContainer}>
                    <TouchableOpacity style={styles.card} onPress={handleCheckInPress}>
                        <Ionicons name="log-in-outline" size={150} color="#0089DA" />
                        <Text style={styles.cardText}>CHECK IN</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.card} onPress={handleCheckOutPress}>
                        <Ionicons name="log-out-outline" size={150} color="#0089DA" />
                        <Text style={styles.cardText}>CHECK OUT</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    topHalf: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    bottomHalf: {
        flex: 3,
        backgroundColor: '#0089DA',
        justifyContent: 'center',
    },
    title: {
        textAlign: 'center',
        fontSize: 34,
        fontWeight: 'bold',
        lineHeight: 40,
        marginTop: 15,
    },
    smallTitle: {
        textAlign: 'center',
        fontSize: 34,
        fontWeight: 'bold',
        lineHeight: 40,
        marginTop: 50,
    },
    cardContainer: {
        marginTop: 50,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    card: {
        backgroundColor: 'white',
        padding: 20,
        width: '40%',
        borderRadius: 8,
        height: '100%',
        boxShadow: '10px 10px 10px 10px #00008b78',
        alignItems: 'center',
    },
    cardText: {
        paddingRight:20,
        paddingLeft:20,
        color: 'black',
        fontSize: 70,
    },
    input: {
        width: '45%',
        height: 50,
        color: 'white',
        borderBottomWidth: 1,
        borderBottomColor: 'white',
        fontSize: 20,
    }
});

export default CheckInOutScreen;
