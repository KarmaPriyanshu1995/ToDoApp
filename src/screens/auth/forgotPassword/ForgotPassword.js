import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import InputHandler from '../../../components/inputHandler/InputHandler'
import { Formik } from 'formik'
import * as yup from 'yup';
import { useSelector } from 'react-redux';
import CustomHeader from '../../../components/customHeader/CustomHeader';
import CustomButton from '../../../components/customButton/CustomButton';
import { colors } from '../../../constant/color/Colors';
const forgotValidationSchema = yup.object().shape({
  email: yup.string().email('Please enter a valid email').required('Email Address is required'),
});
const ForgotPassword = ({navigation}) => {
  const [forgoterror, setForgotError] = useState('');
  const [forgotEmail, setForgotEmail] = useState('');
  const signupCommingData = useSelector(state => state.signUp.users|| [])
  return (
              <View style={styles.forgotMainContainer}>
                <CustomHeader headerTitle="Forgot Password" />
                <Formik
                  initialValues={{ email: '' }}
                  validationSchema={forgotValidationSchema}
                  onSubmit={(values) => {
                    const user = signupCommingData.find(user => user.email === values.email);
                    if (user) {
                      setForgotEmail(values.email)
                    navigation.navigate("SetNewPassword")
                    } else {
                      setForgotError('Email Does not exist!');
                    }
                   
                   }}
                >
                  {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <View>
                      <InputHandler
                        name="email"
                        placeholderName="Email"
                        style={styles.input}
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        value={values.email}
                      />
                      {errors.email && touched.email && (
                        <Text style={styles.errorText}>{errors.email}</Text>
                      )}
                      {forgoterror && <Text style={styles.errorText}>{forgoterror}</Text>}
                      <CustomButton
                        onPress={handleSubmit}
                        buttonTitle="Submit"
                        style={styles.buttonStyle}
                      />
                    </View>
                  )}
                </Formik>
              </View>
  )
}

export default ForgotPassword

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