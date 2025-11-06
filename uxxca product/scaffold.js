// App.js
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import ChatbotScreen from './screens/ChatbotScreen';
import TransactionsScreen from './screens/TransactionsScreen';
import ReportsScreen from './screens/ReportsScreen';
import InsightsScreen from './screens/InsightsScreen';
import SettingsScreen from './screens/SettingsScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Chatbot" component={ChatbotScreen} />
        <Stack.Screen name="Transactions" component={TransactionsScreen} />
        <Stack.Screen name="Reports" component={ReportsScreen} />
        <Stack.Screen name="Insights" component={InsightsScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
// CompanyForm.js
import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CompanyForm({ navigation }) {
  const [companyName, setCompanyName] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [country, setCountry] = useState('');
  const [currency, setCurrency] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    // Generate or fetch userId
    const initUser = async () => {
      let storedId = await AsyncStorage.getItem('uxcaUserId');
      if (!storedId) {
        storedId = 'user_' + Date.now();
        await AsyncStorage.setItem('uxcaUserId', storedId);
      }
      setUserId(storedId);
    };
    initUser();
  }, []);

  const handleSubmit = async () => {
    if (!companyName || !businessType || !country || !currency) {
      return Alert.alert('Please fill all fields');
    }

    // Push data to Botpress user memory
    try {
      await fetch('https://your-botpress-server/api/v1/bots/YOUR_BOT_ID/converse/' + userId, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'user.update',
          payload: { companyName, businessType, country, currency }
        }),
      });
      Alert.alert('Company info saved!');
      // Navigate to Home or Chatbot
      navigation.replace('Home', { userId });
    } catch (err) {
      console.log(err);
      Alert.alert('Failed to save info');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Business Info</Text>
      <TextInput placeholder="Company Name" style={styles.input} value={companyName} onChangeText={setCompanyName} />
      <TextInput placeholder="Business Type" style={styles.input} value={businessType} onChangeText={setBusinessType} />
      <TextInput placeholder="Country" style={styles.input} value={country} onChangeText={setCountry} />
      <TextInput placeholder="Currency" style={styles.input} value={currency} onChangeText={setCurrency} />
      <Button title="Save & Continue" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  input: { borderWidth: 1, padding: 10, marginBottom: 15, borderRadius: 5 },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
});
