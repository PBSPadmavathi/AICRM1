import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, ActivityIndicator } from 'react-native';
import axios from 'axios';

// Replace with your machine's IP address if testing on physical device
// For Android Emulator, use 'http://10.0.2.2:8000'
// For iOS Simulator, use 'http://localhost:8000'
// For Physical Device, use your computer's IP (e.g., 192.168.x.x)
const API_URL = 'http://192.168.1.15:8001';

export default function App() {
  const [message, setMessage] = useState('Waiting for connection...');
  const [loading, setLoading] = useState(false);

  const fetchBackend = async () => {
    setLoading(true);
    setMessage('Connecting...');
    try {
      const response = await axios.get(`${API_URL}/`);
      setMessage(`Success: ${response.data.message}`);
    } catch (error) {
      console.error(error);
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBackend();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>React Native + FastAPI</Text>
      <View style={styles.card}>
        <Text style={styles.statusLabel}>Backend Status:</Text>
        {loading ? (
          <ActivityIndicator size="small" color="#0000ff" />
        ) : (
          <Text style={styles.statusText}>{message}</Text>
        )}
      </View>
      <Button title="Retry Connection" onPress={fetchBackend} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statusLabel: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
});
