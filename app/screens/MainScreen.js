import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const MainScreen = () => {
    const navigation = useNavigation();

    const handleClick = (type) => {
        navigation.navigate('Welcome', { type });
    };

    const navigateToBuildingOccupantsScreen = () => {
        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0];
        navigation.navigate('BuildingOccupants', { date: formattedDate });
    };

    const navigateToEntriesScreen = () => {
        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0];
        navigation.navigate('EntriesScreen', { date: formattedDate });
    };

    return (
        <View style={styles.container}>
            <View style={styles.topHalf}>
                <TouchableOpacity
                    style={[styles.button, { backgroundColor: 'green' }]}
                    onPress={navigateToBuildingOccupantsScreen}
                >
                    <Text style={styles.buttonText}>View Building Occupants</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, { backgroundColor: 'purple', marginLeft: 30 }]}
                    onPress={navigateToEntriesScreen}
                >
                    <Text style={styles.buttonText}>View All Entries</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.bottomHalf}>
                <View style={styles.cardContainer}>
                    <TouchableOpacity style={styles.card} onPress={() => handleClick("staff")}>
                        <Image
                            source={require('../../assets/images/staff.png')}
                            resizeMode="contain"
                            style={{ height: 130, marginBottom: 20 }}
                        />
                        <Text style={styles.cardText}>STAFF</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.card} onPress={() => handleClick("student")}>
                        <Image
                            source={require('../../assets/images/student.png')}
                            resizeMode="contain"
                            style={{ height: 130, marginBottom: 20 }}
                        />
                        <Text style={styles.cardText}>STUDENTS</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.card} onPress={() => handleClick("visitors")}>
                        <Image
                            source={require('../../assets/images/visitors.png')}
                            resizeMode="contain"
                            style={{ height: 130, marginBottom: 20 }}
                        />
                        <Text style={styles.cardText}>VISITORS</Text>
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
        marginTop: 10,
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        justifyContent: 'flex-end',
    },
    bottomHalf: {
        flex: 3,
        backgroundColor: '#0089DA',
        justifyContent: 'center',
    },
    button: {
        backgroundColor: 'green',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    cardContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    card: {
        backgroundColor: 'white',
        padding: 20,
        width: '30%',
        borderRadius: 8,
        boxShadow: '10px 10px 10px 10px #00008b78',
        alignItems: 'center',
    },
    cardText: {
        paddingRight: 20,
        paddingLeft: 20,
        color: 'black',
        fontSize: 55,
    }
});

export default MainScreen;
