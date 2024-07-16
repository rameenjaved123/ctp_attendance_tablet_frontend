import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, TextInput } from "react-native";
import { checkOutForSession } from "../../apis/checkOut.api";
import { useRoute, useNavigation } from "@react-navigation/native";
import {OFFICE_IDS} from "../../constants/constants";
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function CheckOutScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [inputCode, setInputCode] = useState("");
  const route = useRoute();
  const {sessionId} = route.params;
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const {status} = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = async ({type, data}) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    const email = extractEmailFromQRCode(data);
    if (email) {
      const student_email = email;
      const success = await checkOutForSession({student_email, session_id: sessionId, campus_id: OFFICE_IDS.NOTTINGHAM});
      if (success) {
        navigation.navigate('Welcome');
      } else {
        alert("Check-out failed");
      }
    } else {
      alert("Invalid QR code data");
    }
  };

  const handleCodeSubmit = async () => {
    const success = await checkOutForSession({
      student_code: inputCode,
      session_id: sessionId,
      campus_id: OFFICE_IDS.NOTTINGHAM
    })
   if (success) {
    navigation.navigate('Welcome');
   } else {
    alert("Check-out failed");
   }
  };

  const extractEmailFromQRCode = (data) => {
    try {
      const parsedData = JSON.parse(data);
      return parsedData.email;
    } catch (error) {
      console.error("Error parsing QR code data:", error);
      return null;
    }
  };

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return (
        <View style={styles.container}>
          <Text style={styles.text}>Camera permission not granted</Text>
        </View>
    );
  }

  return (
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to the Check-Out Screen!</Text>
        <Text style={styles.paragraph}>Scan a QR code or enter the code manually to check in.</Text>
        <View style={styles.cameraContainer}>
          <BarCodeScanner
              onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
              style={styles.camera}
              type={BarCodeScanner.Constants.Type.front}
          />
          {scanned && (
              <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
          )}
        </View>
        <View style={styles.manualInputContainer}>
          <Text style={{ marginBottom: 20 }}>Please Enter Code Below</Text>
          <TextInput
              style={styles.input}
              placeholder="Enter code manually"
              value={inputCode}
              onChangeText={setInputCode}
              keyboardType="numeric"
              maxLength={6}
              returnKeyType="done"
          />
          <Button title="Submit Code" onPress={handleCodeSubmit} />
        </View>
      </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 30,
  },
  cameraContainer: {
    width: '30%',
    aspectRatio: 1,
    overflow: 'hidden',
    borderRadius: 10,
    marginBottom: 20,
  },
  camera: {
    flex: 1,
  },
  manualInputContainer: {
    width: '30%',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: 'blue',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
