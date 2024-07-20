import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  Button,
} from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import InputHandler from '../../../components/inputHandler/InputHandler';

const Signup = () => {
  const signupValidationSchema = yup.object().shape({
    name: yup
      .string()
      .required('Name is required'),
    email: yup
      .string()
      .email("Please enter a valid email")
      .required('Email Address is required'),
    password: yup
      .string()
      .min(8, ({ min }) => `Password must be at least ${min} characters`)
      .required('Password is required'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
      <Text style={styles.signUpName}>Signup Screen</Text>
        <View style={styles.signupContainer}>
         
          <Formik
            initialValues={{ name: '', email: '', password: '', confirmPassword: '' }}
            validationSchema={signupValidationSchema}
            onSubmit={values => console.log(values)}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
              <>
              <View style={{marginBottom:15}}>
              <InputHandler
                  name="name"
                  placeholderName="Name"
                  style={styles.textInput}
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  value={values.name}
                />
                {errors.name && touched.name && (
                  <Text style={styles.errorText}>{errors.name}</Text>
                )}
              </View>
               
                <InputHandler
                  name="email"
                  placeholderName="Email Address"
                  style={styles.textInput}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  keyboardType="email-address"
                />
                {errors.email && touched.email && (
                  <Text style={styles.errorText}>{errors.email}</Text>
                )}
                <InputHandler
                  name="password"
                  placeholderName="Password"
                  style={styles.textInput}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  secureTextEntry
                />
                {errors.password && touched.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}
                <InputHandler
                  name="confirmPassword"
                  placeholderName="Confirm Password"
                  style={styles.textInput}
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  value={values.confirmPassword}
                  secureTextEntry
                />
                {errors.confirmPassword && touched.confirmPassword && (
                  <Text style={styles.errorText}>{errors.confirmPassword}</Text>
                )}
                <Button onPress={handleSubmit} title="Signup" />
              </>
            )}
          </Formik>
        </View>
      </SafeAreaView>
    </>
  );
}

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  signupContainer: {
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  textInput: {
    marginBottom: 10,
  },
  errorText: {
    fontSize: 14,
    color: 'red',
    marginBottom: 10,
  },
  signUpName:{
    fontSize:20,
    fontWeight:"bold",
    textAlign:"center",
    paddingBottom:20
  }
});
