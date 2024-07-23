import React, {useRef, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';
import InputHandler from '../../../components/inputHandler/InputHandler';
import {useDispatch, useSelector} from 'react-redux';
import {login, selectUser} from '../../../redux/slices/LoginSlice';
import CustomHeader from '../../../components/customHeader/CustomHeader';
import CustomButton from '../../../components/customButton/CustomButton';
import {colors} from '../../../constant/color/Colors';
const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Email Address is required'),
  password: yup
    .string()
    .min(8, ({min}) => `Enter a valid Password`)
    .required('Password is required'),
});

const Login = ({navigation}) => {
  const dispatch = useDispatch();
  const signupCommingData = useSelector(state => state.signUp.users || []);
  const user = useSelector(selectUser);

  const [error, setError] = useState('');
  const passwordRef = useRef();
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <CustomHeader headerTitle="Login Screen" />
        <View style={styles.loginContainer}>
          <Formik
            initialValues={{email: '', password: ''}}
            validationSchema={loginValidationSchema}
            onSubmit={values => {
              console.log({values});
              const user = signupCommingData.find(
                user =>
                  user.email === values.email.toLowerCase() &&
                  user.password === values.password,
              );
              console.log('condad', user);
              if (user) {
                dispatch(login(user));
                navigation.navigate('HomeScreen');
              } else {
                setError('Invalid login credentials');
              }
            }}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <>
                <View>
                  <InputHandler
                    name="email"
                    placeholderName="Email Address"
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                    keyboardType="email-address"
                    onSubmitEditing={() => {
                      passwordRef.current.focus();
                    }}
                    errorMsg={errors.email && touched.email && errors.email}
                  />
                </View>

                <InputHandler
                  name="password"
                  placeholderName="Password"
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  ref={passwordRef}
                  secureTextEntry
                  errorMsg={
                    errors.password && touched.password && errors.password
                  }
                />
                <TouchableOpacity
                  style={{marginTop: -5, paddingBottom: 10}}
                  onPress={() => navigation.navigate('ForgotPassword')}>
                  <Text
                    style={{
                      textAlign: 'right',
                      color: colors.BUTTONTEXT,
                      fontWeight: '400',
                    }}>
                    Forgot Password ?
                  </Text>
                </TouchableOpacity>

                {error && <Text style={styles.errorText}>{error}</Text>}
                <CustomButton
                  buttonTitle="Login"
                  style={styles.buttonStyle}
                  onPress={handleSubmit}
                />
                <View style={{alignItems: 'center'}}>
                  <Text style={{color: colors.BUTTONTEXT, fontWeight: '600'}}>
                    Don't have an account ?
                    <TouchableOpacity
                      style={{paddingTop: 11}}
                      onPress={() => {
                        navigation.navigate('Signup');
                      }}>
                      <Text
                        style={{
                          textAlign: 'center',
                          top: 4,
                          color: 'blue',
                        }}>
                        Sign Up
                      </Text>
                    </TouchableOpacity>
                  </Text>
                </View>
              </>
            )}
          </Formik>
          {/* <CustomBottomSheet
            ref={setPasswordRef}
            height={500}
            component={
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
            }
          /> */}
        </View>
      </SafeAreaView>
    </>
  );
};

export default Login;

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
  },
  signupContainer: {
    marginHorizontal: 20,
  },
  signUpName: {
    color: colors.white,
  },
  buttonStyle: {
    backgroundColor: colors.DUTCHWHITE,
    marginTop: 10,
    marginBottom: 10,
    padding: 20,
  },
  errorText: {
    color: 'red',
    marginBottom: 8,
  },
});
