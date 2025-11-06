import React, { useState } from 'react';
import { View, TextInput, Button, Text, FlatList, StyleSheet } from 'react-native';

export default function ChatbotScreen({ route }) {
  const { userId } = route.params;
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input) return;
    // Add user message
    setMessages(prev => [...prev, { type: 'user', text: input }]);

    // Push to Botpress memory via API
    await fetch('https://your-botpress-server/api/v1/bots/19228e29-7dd7-474b-ae6f-76cab1a95362/converse/' + userId, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'text', text: input })
    });

    // For now, simulate bot reply
    setMessages(prev => [...prev, { type: 'bot', text: 'Processing...' }]);
    setInput('');
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <Text style={{ alignSelf: item.type === 'user' ? 'flex-end' : 'flex-start' }}>
            {item.text}
          </Text>
        )}
        keyExtractor={(_, i) => i.toString()}
      />
      <TextInput
        value={input}
        onChangeText={setInput}
        placeholder="Ask me anything..."
        style={styles.input}
      />
      <Button title="Send" onPress={sendMessage} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  input: { borderWidth: 1, padding: 10, marginVertical: 10 },
});
