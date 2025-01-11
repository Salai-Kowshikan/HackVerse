import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useRouter } from 'expo-router';

const Information = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to the Info Page!</Text>
      <Button title="Go Back" onPress={() => router.back()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  text: {
    fontSize: 18,
    color: '#333',
  },
});

export default Information;
