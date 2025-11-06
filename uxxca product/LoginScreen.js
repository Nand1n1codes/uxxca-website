import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }) {
  const [pin, setPin] = useState('');

  const handleLogin = async () => {
    if (pin.length === 4) {
      // save pin / generate userId
      let userId = await AsyncStorage.getItem('uxcaUserId');
      if (!userId) {
        userId = 'user_' + Date.now();
        await AsyncStorage.setItem('uxcaUserId', userId);
      }
      navigation.replace('Home', { userId });
    } else alert('Enter 4-digit PIN');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>UXCA Login</Text>
      <TextInput
        placeholder="Enter 4-digit PIN"
        keyboardType="numeric"
        maxLength={4}
        secureTextEntry
        value={pin}
        onChangeText={setPin}
        style={styles.input}
      />
      <Button title="Login" onPress={handleLogin} />
      {/* Add fingerprint login integration here */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, marginBottom: 20 },
  input: { borderWidth: 1, padding: 10, marginBottom: 20, width: '60%', textAlign: 'center' },
});
