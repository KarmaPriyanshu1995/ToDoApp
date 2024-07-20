import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import InputHandler from '../../../components/inputHandler/InputHandler'; // Adjust the path as per your project structure

const SetNewPassword = ({ navigation }) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleNewPassword = () => {
    if (newPassword.trim() === '') {
      setError('New Password is required');
      return;
    }
    if (confirmPassword.trim() === '') {
      setError('Confirm Password is required');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Set New Password</Text>
      <InputHandler
        name="newPassword"
        placeholderName="New Password"
        style={styles.input}
        onChangeText={setNewPassword}
        value={newPassword}
        secureTextEntry
      />
      <InputHandler
        name="confirmPassword"
        placeholderName="Confirm Password"
        style={styles.input}
        onChangeText={setConfirmPassword}
        value={confirmPassword}
        secureTextEntry
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <Button onPress={handleNewPassword} title="Set Password" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: '100%',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default SetNewPassword;
