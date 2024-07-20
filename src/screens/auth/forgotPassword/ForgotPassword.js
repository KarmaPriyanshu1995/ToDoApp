import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import InputHandler from '../../../components/inputHandler/InputHandler'

const ForgotPassword = () => {
  return (
    <View>
      <Text>ForgotPassword</Text>
      <InputHandler
                  name="email"
                  placeholderName="Email Address"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  keyboardType="email-address"
                />

<Button title="Submit" />
    </View>
  )
}

export default ForgotPassword

const styles = StyleSheet.create({})