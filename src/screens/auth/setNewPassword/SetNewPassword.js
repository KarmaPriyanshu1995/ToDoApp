import React, { useRef, useState } from 'react';
import { View, Text,StyleSheet } from 'react-native';
import InputHandler from '../../../components/inputHandler/InputHandler'; 
import * as yup from 'yup';
import CustomHeader from '../../../components/customHeader/CustomHeader';
import { Formik } from 'formik';
import {useDispatch } from 'react-redux';
import CustomButton from '../../../components/customButton/CustomButton';
import { colors } from '../../../constant/color/Colors';
import { updatePassword } from '../../../redux/slices/SignUpSlice';
const newPasswordValidationSchema = yup.object().shape({
  password: yup.string().min(8, ({ min }) => `Password must be at least ${min} characters`).required('Password is required'),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required'),
});
const SetNewPassword = ({ navigation }) => {
  const dispatch =useDispatch()
  const [error, setError] = useState('');
  const [forgotEmail, setForgotEmail] = useState('');
  const setNewConfirmPasswordRef = useRef();
  const handleNewPassword = (values) => {
    if (values.password.trim() === '') {
      setError('New Password is required');
      return;
    }
    if (values.confirmPassword.trim() === '') {
      setError('Confirm Password is required');
      return;
    }
    if (values.password !== values.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    dispatch(updatePassword({ email: forgotEmail, newPassword: values.password }));
    navigation.navigate("Login")
  };

  return (
              <View style={styles.forgotMainContainer}>
                <CustomHeader headerTitle="New Password Screen" />
                <Formik
                  initialValues={{
                    password: '',
                    confirmPassword: '',
                  }}
                  validationSchema={newPasswordValidationSchema}
                  onSubmit={handleNewPassword}
                >
                  {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <View >
                      <InputHandler
                        name="password"
                        placeholderName="New Password"
                        style={styles.input}
                        onChangeText={handleChange('password')}
                        onSubmitEditing={()=>setNewConfirmPasswordRef.current.focus()}
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
                        style={styles.input}
                        ref={setNewConfirmPasswordRef}
                        onChangeText={handleChange('confirmPassword')}
                        onBlur={handleBlur('confirmPassword')}
                        value={values.confirmPassword}
                        secureTextEntry
                      />
                      {errors.confirmPassword && touched.confirmPassword && (
                        <Text style={styles.errorText}>{errors.confirmPassword}</Text>
                      )}
                      {error ? <Text style={styles.errorText}>{error}</Text> : null}
                      <CustomButton
                        onPress={handleSubmit}
                        buttonTitle="Set Password"
                        style={styles.buttonStyle}
                      />
                    </View>
                  )}
                </Formik>
              </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 15,
  },
  loginContainer: {
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  textInput: {
    marginBottom: 10,
    marginTop: 10,
    // paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    color: '#2f4f4f',
  },
  
  forgotMainContainer: {
    marginHorizontal: 20,
    flex:1,
    justifyContent:"center",
    
  },
  signUpName: {
    color: colors.white,
  },
  buttonStyle: {
    backgroundColor: colors.DUTCHWHITE,
    marginTop: 10,
    marginBottom: 10,
    padding: 20
  },
  errorText: {
    color: 'red',
    marginBottom:8,
  },
});

export default SetNewPassword;
