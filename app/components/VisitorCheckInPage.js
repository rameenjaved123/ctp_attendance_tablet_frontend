import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { COLORS, SIZES } from '../../constants';
import { Picker } from '@react-native-picker/picker';
import { Text, Checkbox } from 'react-native-paper';
import { checkedInRequest, generateUniqueId, makeQRRequest } from "../../apis/checkInVisitors.api";
import PhoneNumber from 'libphonenumber-js';

const VisitorCheckInPage = ({ navigation }) => {
  const [visitorName, setVisitorName] = useState('');
  const [gender, setGender] = useState('female');
  const [vehicleNumber, setVehicleNumber] = useState('-');
  const [contactNumber, setContactNumber] = useState('');
  const [whomVisiting, setWhomVisiting] = useState('');
  const [purposeOfVisit, setPurposeOfVisit] = useState('meeting');
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [isValidNumber, setIsValidNumber] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isChecked, setIsChecked] = useState(false); // New state for checkbox

  const handleVendorChange = (value) => {
    setPurposeOfVisit(value);
  };

  const handleContactNumberChange = (inputText) => {
    // Allow only numeric characters
    const numericInput = inputText.replace(/[^0-9]/g, '');

    // Limit input to UK phone number length (including country code)
    if (numericInput.length <= 12) {
      setContactNumber(numericInput);

      // Validate the phone number format
      const phoneNumber = PhoneNumber(numericInput, 'GB');
      setIsValidNumber(phoneNumber?.isValid());
    }
  };

  const handleVisitorSubmit = async () => {
    // Perform form validation
    setCurrentDateTime(new Date());
    if (
        visitorName.trim() === '' ||
        gender === '' ||
        vehicleNumber.trim() === '' ||
        contactNumber.trim() === '' ||
        whomVisiting.trim() === '' ||
        purposeOfVisit === '' ||
        !isValidNumber
    ) {
      Alert.alert('Validation Error', 'Please fill in all the required fields.');
    } else if (!isChecked) {
      Alert.alert('Validation Error', 'Please accept the terms and conditions.');
    } else {
      setIsDisabled(true);
      const dateTime = currentDateTime.toLocaleString();
      // post call
      const postCallToCreateUniqueId = await generateUniqueId({
        name: visitorName,
        vehicleNumber,
        purposeOfVisit,
        gender,
        contactNumber,
        whomVisiting,
        checkInTime: dateTime,
      });

      // qr code generation call
      if (postCallToCreateUniqueId?.id) {
        const qrCodeUrl = await makeQRRequest({
          uname: visitorName,
          phone: contactNumber,
          memo: postCallToCreateUniqueId?.id
        });

        const qr = qrCodeUrl || "https://api.scanova.io/v2/qrcode/vcard?uname=Muhammad%20Abdullah&department=it&phone=%2B447868213399&apikey=rpxmbpbagvkkjmlxlznvkdlflczloyhyfjftuqoa&format=png";

        //checked in request patch call
        const checkedIn = await checkedInRequest({
          id: postCallToCreateUniqueId?.id,
          qrCodeUrl: qr
        });
        checkedIn?.status === 200 && navigation.navigate('QRCodePage', { qrCodeUrl: qr, code: postCallToCreateUniqueId?.code });
      }
    }
  };

  return (
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.headerTitle}>Help us with your information</Text>
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.fieldTitle}>Full Name</Text>
              <TextInput
                  style={styles.input}
                  placeholder="Please enter your full name"
                  value={visitorName}
                  onChangeText={setVisitorName}
              />
              <Text style={styles.fieldTitle}>Gender</Text>
              <View style={[styles.inputContainer, styles.dropdownBorder]}>
                <Picker
                    style={styles.input}
                    selectedValue={gender}
                    onValueChange={(itemValue) => setGender(itemValue)}
                >
                  <Picker.Item label="Please select a gender" value="" color="gray" />
                  <Picker.Item label="Female" value="female" style={styles.pickerItem} />
                  <Picker.Item label="Male" value="male" style={styles.pickerItem} />
                  <Picker.Item label="Other" value="other" style={styles.pickerItem} />
                </Picker>
              </View>
              <Text style={styles.fieldTitle}>Vehicle Reg Number</Text>
              <TextInput
                  style={styles.input}
                  placeholder="Please enter your vehicle registration number"
                  value={vehicleNumber}
                  onChangeText={setVehicleNumber}
              />
            </View>

            <View style={styles.column}>
              <Text style={styles.fieldTitle}>Contact Number</Text>
              <TextInput
                  style={styles.input}
                  placeholder="e.g. 07862299933"
                  value={contactNumber}
                  onChangeText={handleContactNumberChange}
                  keyboardType="numeric"
              />
              {!isValidNumber && (
                  <Text style={styles.errorText}>Invalid phone number</Text>
              )}
              <Text style={styles.fieldTitle}>Purpose of Visit</Text>
              <View style={[styles.inputContainer, styles.dropdownBorder]}>
                <Picker
                    style={styles.input}
                    selectedValue={purposeOfVisit}
                    onValueChange={handleVendorChange}
                >
                  <Picker.Item label="Select a purpose of visit" value="" color="gray" />
                  <Picker.Item label="Interview" value="interview" style={styles.pickerItem} />
                  <Picker.Item label="Meeting" value="meeting" style={styles.pickerItem} />
                  <Picker.Item label="Delivery" value="delivery" style={styles.pickerItem} />
                  <Picker.Item label="Vendor/Supplier" value="vendor" style={styles.pickerItem} />
                  <Picker.Item label="Other" value="other" style={styles.pickerItem} />
                </Picker>
              </View>
              <Text style={styles.fieldTitle}>Visiting whom</Text>
              <TextInput
                  style={styles.input}
                  placeholder="Please mention the name of the person you are visiting"
                  value={whomVisiting}
                  onChangeText={setWhomVisiting}
              />
            </View>
          </View>
          <View style={styles.checkboxContainer}>
            <Checkbox
                status={isChecked ? 'checked' : 'unchecked'}
                onPress={() => setIsChecked(!isChecked)}
            />
            <Text style={styles.checkboxLabel}>I accept the terms and conditions</Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
                style={[styles.button, isDisabled && { backgroundColor: '#e0e0e0' }]}
                disabled={isDisabled}
                onPress={handleVisitorSubmit}
            >
              <Text style={styles.buttonText}>SUBMIT</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  pickerItem: {
    fontSize: 20,
    transform: [{ translateY: -8 }]
  },
  headerTitle: {
    marginTop: 50,
    color: '#0089DA',
    fontSize: 30,
    fontWeight: 'bold',
    lineHeight: 30,
    marginBottom: 20,
  },
  errorText: {
    color: 'red',
    marginTop: 5,
  },
  fieldTitle: {
    marginBottom: 5,
    fontSize: 20,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
    padding: SIZES.medium,
  },
  row: {
    flexDirection: 'row', // Display components side by side
    justifyContent: 'space-between', // Space between columns
  },
  column: {
    flex: 1, // Each column takes equal space
    padding: SIZES.medium,
  },
  content: {
    flex: 1,
    padding: SIZES.medium,
  },
  dropdownBorder: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    height: 70,
    width: '100%',
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 70,
    borderWidth: 1,
    fontSize: 20,
    borderColor: 'gray',
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    width: '50%',
    height: 60,
    backgroundColor: '#0089DA',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: 'gray',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkboxLabel: {
    fontSize: 16,
  },
});

export default VisitorCheckInPage;
