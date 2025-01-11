import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useRouter } from 'expo-router';

const Information = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to the Info Page!</Text>
      <Button title="Go Back" color="rgb(255, 204, 0)" onPress={() => router.back()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20, 
    color: 'rgb(30, 27, 22)', 
    fontWeight: 'bold', 
    marginBottom: 20, 
  },
});

export default Information;
