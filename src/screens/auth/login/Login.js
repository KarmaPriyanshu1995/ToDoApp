import React, { useRef, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import InputHandler from '../../../components/inputHandler/InputHandler';
import { useDispatch, useSelector } from 'react-redux';
import { login, selectUser } from '../../../redux/slices/LoginSlice';
import CustomHeader from '../../../components/customHeader/CustomHeader';
import CustomButton from '../../../components/customButton/CustomButton';
import { colors } from '../../../constant/color/Colors';
import CustomBottomSheet from '../../../components/customBottomSheet/CustomBottomSheet';
import { setSignupData, updatePassword } from '../../../redux/slices/SignUpSlice';
const loginValidationSchema = yup.object().shape({
  email: yup.string().email('Please enter a valid email').required('Email Address is required'),
  password: yup.string().min(8, ({ min }) => `Enter a valid Password`).required('Password is required'),
});
const forgotValidationSchema = yup.object().shape({
  email: yup.string().email('Please enter a valid email').required('Email Address is required'),
});
const signupValidationSchema = yup.object().shape({
  name: yup.string().trim().required('Name is required'),
  email: yup.string().email('Please enter a valid email').required('Email Address is required'),
  password: yup.string().min(8, ({ min }) => `Password must be at least ${min} characters`).required('Password is required'),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required'),
});

const newPasswordValidationSchema = yup.object().shape({
  password: yup.string().min(8, ({ min }) => `Password must be at least ${min} characters`).required('Password is required'),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required'),
});


const Login = () => {
  const dispatch = useDispatch();
  const signupData = useSelector(state => state.signUp.users|| [])
  const user = useSelector(selectUser);
  
  console.log('aaya ki ni', signupData)

  const [error, setError] = useState('');
  const [forgoterror, setForgotError] = useState('');
  const [forgotEmail, setForgotEmail] = useState('');
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
    setPasswordRef.current.close();
  };
  const [sameEmailError,setSameEmailError]=useState('')
  const handleSignUp = (values) => {
    const email =values.email.toLowerCase().trim();
    const password =values.password.toLowerCase();
    const name =values.name.toLowerCase();
    const signUpData = { email, password, name };
    console.log(signUpData)
    const user = signupData.find(user => user.email === email);

    if (user) {
        setSameEmailError('This Email Already Exists');
    } else {
      console.log("signUpDatasignUpDatasignUpData",signUpData)
        dispatch(setSignupData(signUpData));
        dispatch(login(signUpData))
        signUpRef.current.close();
        setPasswordRef.current.close();
        setSameEmailError('');
       
    }
   
  };
  const forgotRef = useRef();
  const signUpRef = useRef();
  const setPasswordRef = useRef();

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <CustomHeader headerTitle="Login Screen" />
        <View style={styles.loginContainer}>
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={loginValidationSchema}
            onSubmit={(values) => {
              console.log({values})
              const user = signupData.find(user => user.email === values.email.toLowerCase() && user.password === values.password);
              console.log('condad', user)
              if (user) {
                dispatch(login(user));
              } else {
                setError('Invalid login credentials');
              }
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
              <>
               <View style={{marginBottom:15}}>
               <InputHandler
                  name="email"
                  placeholderName="Email Address"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  keyboardType="email-address"
                />
                {errors.email && touched.email && (
                  <Text style={styles.errorText}>{errors.email}</Text>
                )}
               </View>
              
                <InputHandler
                  name="password"
                  placeholderName="Password"
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  secureTextEntry
                />
                {errors.password && touched.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}
              <TouchableOpacity
                
                  style={{ marginTop:-5,paddingBottom:10 }}
                  onPress={() => forgotRef.current.open()}
                >
                  <Text style={{ textAlign: 'right' }}>Forgot Password ?</Text>
                </TouchableOpacity>

                {error && <Text style={styles.errorText}>{error}</Text>}
                <CustomButton
                  buttonTitle="Login"
                  style={styles.buttonStyle}
                  onPress={handleSubmit}
                />
                <View style={{ alignItems: 'center' }}>
                  <Text>
                    Don't have an account ?
                    <TouchableOpacity
                      style={{ paddingTop: 11 }}
                      onPress={() => signUpRef.current.open()}
                    >
                      <Text style={{ textAlign: 'center', top: 5 }}>Sign Up</Text>
                    </TouchableOpacity>
                  </Text>
                </View>
              </>
            )}
          </Formik>

          <CustomBottomSheet
          height={430}
            ref={forgotRef}
            component={
              <View style={styles.forgotMainContainer}>
                <CustomHeader headerTitle="Forgot Password" />
                <Formik
                  initialValues={{ email: '' }}
                  validationSchema={forgotValidationSchema}
                  onSubmit={(values) => {
                    const user = signupData.find(user => user.email === values.email);
                    if (user) {
                      setForgotEmail(values.email)
                      setPasswordRef.current.open()
                      forgotRef.current.close()
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
            }
          />

          <CustomBottomSheet
          height={550}
            ref={signUpRef}
            component={
              <View style={styles.signupContainer}>
                <ScrollView>
                  <CustomHeader headerTitle={"SignUp Screen"}/>
                  <Formik
                    initialValues={{
                      name: '',
                      email: '',
                      password: '',
                      confirmPassword: '',
                    }}
                    validationSchema={signupValidationSchema}
                    onSubmit={(values) =>{ handleSignUp(values)}}
                  >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                      <View>
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
                        {sameEmailError&&(
                          <Text style={styles.errorText}>{sameEmailError}</Text>
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
                        <CustomButton
                          buttonTitle="Signup"
                          style={styles.buttonStyle}
                          onPress={handleSubmit}
                        />
                      </View>
                    )}
                  </Formik>
                </ScrollView>
              </View>
            }
          />

          <CustomBottomSheet
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
          />
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
    padding: 20
  },
  errorText: {
    color: 'red',
    marginBottom:8,
  },
});
