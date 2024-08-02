import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Button,
    View,
    Text,
    TouchableOpacity,
    Modal,
    FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Importing icons
import { fetchSessions } from '../../apis/sessions.api';

const MainScreen = () => {
    const navigation = useNavigation();
    const [selectedSession, setSelectedSession] = useState('');
    const [sessions, setSessions] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);

    const getSessions = async () => {
        try {
            const response = await fetchSessions();
            setSessions(response);
        } catch (error) {
            console.error('Error fetching sessions:', error);
        }
    };

    useEffect(() => {
        getSessions(); // Fetch sessions on mount
    }, []);

    const handleSessionSelect = (session) => {
        setSelectedSession(session);
        setModalVisible(false);
    };

    const handleSessionButtonPress = () => {
        getSessions(); // Fetch sessions when the button is clicked
        setModalVisible(true);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.bottomContainer}>
                <Text style={styles.title}>Welcome!</Text>
                <Text style={styles.subtitle}>
                    Please select a session to check in or check out.
                </Text>
                <TouchableOpacity
                    style={styles.sessionButton}
                    onPress={handleSessionButtonPress}
                >
                    <Text style={styles.sessionButtonText}>
                        {selectedSession.name ? selectedSession.name : 'Select a session'}
                    </Text>
                </TouchableOpacity>
                <View style={styles.cardsContainer}>
                    <View style={[styles.card, !selectedSession && styles.cardDisabled]}>
                        <TouchableOpacity
                            style={styles.cardButton}
                            disabled={!selectedSession}
                            onPress={() =>
                                navigation.navigate('CheckIn', { sessionId: selectedSession.id })
                            }
                        >
                            <Icon name="login" size={30} color="#ffffff" />
                            <Text style={styles.cardButtonText}>Check In</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.card, !selectedSession && styles.cardDisabled]}>
                        <TouchableOpacity
                            style={styles.cardButton}
                            disabled={!selectedSession}
                            onPress={() =>
                                navigation.navigate('CheckOutScreen', {
                                    sessionId: selectedSession.id,
                                })
                            }
                        >
                            <Icon name="logout" size={30} color="#ffffff" />
                            <Text style={styles.cardButtonText}>Check Out</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Select a Session</Text>
                        <FlatList
                            data={sessions}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.modalItem}
                                    onPress={() => handleSessionSelect(item)}
                                >
                                    <Text style={styles.modalItemText}>{item.name}</Text>
                                </TouchableOpacity>
                            )}
                        />
                        <Button title="Close" onPress={() => setModalVisible(false)} />
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    bottomContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#4A4A4A',
        bottom: 20,
    },
    subtitle: {
        fontSize: 16,
        color: '#4A4A4A',
        textAlign: 'center',
        width: '80%',
        marginBottom: 150,
    },
    sessionButton: {
        width: '50%',
        padding: 15,
        borderRadius: 10,
        backgroundColor: '#004990',
        alignItems: 'center',
        marginBottom: 20,
    },
    sessionButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    cardsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        marginTop: 20,
    },
    card: {
        flex: 1,
        margin: 5,
        padding: 20,
        borderRadius: 10,
        backgroundColor: '#1C5E9C',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
    },
    cardDisabled: {
        backgroundColor: 'grey',
    },
    cardButton: {
        alignItems: 'center',
    },
    cardButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    modalItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    modalItemText: {
        fontSize: 18,
    },
});

export default MainScreen;
