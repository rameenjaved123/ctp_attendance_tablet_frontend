import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import { OFFICE_IDS } from "../../constants/constants";

const BuildingOccupants = ({ route }) => {
    const { date } = route.params;
    const [tableData, setTableData] = useState([]);
    const [tableHead, setTableHead] = useState([
        'Name', 'Contact Number', 'Job Title', 'Email', 'Office', 'Gender', 'Time', 'Id'
    ]);

    useEffect(() => {
        const fetchEntries = async () => {
            try {
                setTableData([]); // Clear the table data before fetching new data
                const response = await fetch(`http://159.65.87.253:8081/v1/office-management/checkin-checkout/daily-report?office_id=${OFFICE_IDS.NOTTINGHAM}&date=${date}`);

                if (response.ok && response.headers.get('content-type')?.includes('application/json')) {
                    const text = await response.text();
                    const data = JSON.parse(text);

                    if (data.items && data.items.length > 0) {
                        const rows = data.items.map(item => [
                            item.name,
                            item.contact_number,
                            item.job_title || '-',
                            item.email || '-',
                            item.office_name,
                            item.gender,
                            item.time || item?.check_in_time,
                            item.staff_id || item.id
                        ]);
                        setTableData(rows);
                    } else {
                        setTableData(null); // Set tableData to null if no entries found
                    }
                } else {
                    setTableData(null); // Set tableData to null if no entries found
                }
            } catch (error) {
                setTableData(null); // Set tableData to null if there is an error
            }
        };

        fetchEntries();
    }, [date]);

    return (
        <ScrollView style={styles.container}>
            {tableData && tableData.length > 0 ? (
                <Table borderStyle={{ borderWidth: 1 }}>
                    <Row data={tableHead} style={styles.head} textStyle={styles.headText} />
                    <Rows data={tableData} textStyle={styles.text} />
                </Table>
            ) : (
                <Text style={styles.noDataText}>No occupants are currently in the building.</Text>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: { height: 50, backgroundColor: '#f1f8ff' },
    headText: { margin: 6, fontWeight: 'bold', fontSize: 15 },
    text: { margin: 6, fontSize: 14 },
    noDataText: {
        textAlign: 'center',
        fontSize: 18,
        color: '#888',
        marginTop: 20,
    },
});

export default BuildingOccupants;
