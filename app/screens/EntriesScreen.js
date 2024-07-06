import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import { Picker } from '@react-native-picker/picker';
import { OFFICE_IDS } from "../../constants/constants";

const EntriesScreen = ({ route }) => {
    const { date } = route.params;
    const [tableData, setTableData] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('staff');
    const [tableHead, setTableHead] = useState([
        'Name', 'Contact Number', 'Job Title', 'Email', 'Gender', 'Time', 'Id', 'action_type'
    ]);

    const fetchUrl = (category) => {
        if (category === 'staff' || category === 'student') {
            return `http://159.65.87.253:8081/v1/office-management/${category}/checkin-checkout?office_id=${OFFICE_IDS.NOTTINGHAM}&date=${date}`;
        } else {
            return `http://159.65.87.253:8081/v1/office-management/${category}?date=${date}&office_id=${OFFICE_IDS.NOTTINGHAM}`;
        }
    };

    const fetchEntries = async (category) => {
        try {
            setTableData([]); // Clear the table data before fetching new data
            const response = await fetch(fetchUrl(category));

            if (response.ok && response.headers.get('content-type')?.includes('application/json')) {
                const text = await response.text();
                const data = JSON.parse(text);

                if (data.items && data.items.length > 0) {
                    const rows = data.items.map(item => {
                        if (selectedCategory === 'visitors') {
                            return [
                                item.name,
                                item.contact_number,
                                item.gender,
                                item.time || item?.check_in_time,
                                item.staff_id || item.id,
                                item?.check_in_time ? 'Check In' : 'Check out',
                            ];
                        } else {
                            return [
                                item.name,
                                item.contact_number,
                                item.job_title || '-',
                                item.email || '-',
                                item.gender,
                                item.time || item?.check_in_time,
                                item.staff_id || item.id,
                                item?.action_type
                            ];
                        }
                    });
                    setTableData(rows);
                } else {
                    setTableData(null);
                }
            } else {
                setTableData(null); // Set tableData to null if no entries found
            }
        } catch (error) {
            setTableData(null); // Set tableData to null if there is an error
        }
    };

    useEffect(() => {
        fetchEntries(selectedCategory);
    }, [date, selectedCategory]);

    return (
        <ScrollView style={styles.container}>
            <View style={styles.pickerContainer}>
                <Text style={styles.pickerLabel}>Select Category:</Text>
                <View style={styles.pickerBorder}>
                    <Picker
                        selectedValue={selectedCategory}
                        onValueChange={(itemValue) => {
                            setSelectedCategory(itemValue);
                            if (itemValue === "visitors") {
                                setTableHead(['Name', 'Contact Number', 'Gender', 'Time', 'Id', 'Action Type']);
                            } else {
                                setTableHead(['Name', 'Contact Number', 'Job Title', 'Email', 'Gender', 'Time', 'Id', 'Action Type']);
                            }
                            fetchEntries(itemValue); // Fetch new data when category changes
                        }}
                        style={styles.picker}
                    >
                        <Picker.Item label="Staff" value="staff" />
                        <Picker.Item label="Students" value="student" />
                        <Picker.Item label="Visitors" value="visitors" />
                    </Picker>
                </View>
            </View>
            {tableData && tableData.length > 0 ? (
                <Table borderStyle={{ borderWidth: 1 }}>
                    <Row data={tableHead} style={styles.head} textStyle={styles.headText} />
                    <Rows data={tableData} textStyle={styles.text} />
                </Table>
            ) : (
                <Text style={styles.noDataText}>No Data</Text>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: { height: 50, backgroundColor: '#f1f8ff' },
    headText: { margin: 6, fontWeight: 'bold', fontSize: 15 },
    text: { margin: 6, fontSize: 14 },
    pickerContainer: {
        marginBottom: 16,
    },
    pickerLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    pickerBorder: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    picker: {
        height: 50,
        width: '100%',
    },
    noDataText: {
        textAlign: 'center',
        fontSize: 18,
        color: '#888',
        marginTop: 20,
    },
});

export default EntriesScreen;
