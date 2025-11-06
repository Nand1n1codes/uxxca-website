import React from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';

export default function HomeScreen({ navigation, route }) {
  const { userId } = route.params;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.userPanel}>
        <Text>User ID: {userId}</Text>
        <Text>Business Name: ACME Corp</Text>
        {/* Profile picture here */}
      </View>

      <View style={styles.section}>
        <Button title="Ask Me Anything" onPress={() => navigation.navigate('Chatbot', { userId })} />
      </View>

      <View style={styles.section}>
        <Text>Business Stats</Text>
        <Text>Total Revenue: ₹0</Text>
        <Text>Expenses: ₹0</Text>
        <Text>Net Profit/Loss: ₹0</Text>
      </View>

      <View style={styles.section}>
        <Text>Help</Text>
        <Button title="Book a Consultant" onPress={() => {}} />
        <Button title="Email" onPress={() => {}} />
        <Button title="Schedule" onPress={() => {}} />
      </View>

      <View style={styles.section}>
        <Text>Alerts</Text>
        <Text>GST filing in 5 days</Text>
        <Text>2 overdue payments</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  userPanel: { padding: 10, backgroundColor: '#eee', marginBottom: 10 },
  section: { marginVertical: 10 },
});
