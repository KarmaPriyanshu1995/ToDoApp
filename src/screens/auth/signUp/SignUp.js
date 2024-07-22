import React, {useRef, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  Button,
  ScrollView,
} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';
import InputHandler from '../../../components/inputHandler/InputHandler';
import CustomHeader from '../../../components/customHeader/CustomHeader';
import CustomButton from '../../../components/customButton/CustomButton';
import {colors} from '../../../constant/color/Colors';
import {useSelector, useDispatch} from 'react-redux';
import {setSignupData} from '../../../redux/slices/SignUpSlice';
import {login} from '../../../redux/slices/LoginSlice';
const signupValidationSchema = yup.object().shape({
  name: yup.string().trim().required('Name is required'),
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Email Address is required'),
  password: yup
    .string()
    .min(8, ({min}) => `Password must be at least ${min} characters`)
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});
const Signup = () => {
  const dispatch = useDispatch();

  const emailRef = useRef();
  const signUpPasswordRef = useRef();
  const signUpConfirmPasswordRef = useRef();
  const [sameEmailError, setSameEmailError] = useState('');
  const signupCommingData = useSelector(state => state.signUp.users || []);
  const handleSignUp = values => {
    const email = values.email.toLowerCase().trim();
    const password = values.password.toLowerCase();
    const name = values.name.toLowerCase();
    const signupData = {email, password, name};
    console.log(signupData, ',.,.,.,.,.,.,.');
    const user = signupCommingData.find(user => user.email === email);

    if (user) {
      setSameEmailError('This Email Already Exists');
    } else {
      console.log('signUpDatasignUpDatasignUpData', signupData);
      dispatch(setSignupData(signupData));
      dispatch(login(signupData));
      setSameEmailError('');
    }
  };
  return (
    <>
      <CustomHeader headerTitle={'SignUp Screen'} />
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 10,
          justifyContent: 'center',
        }}>
        <Formik
          initialValues={{
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
          }}
          validationSchema={signupValidationSchema}
          onSubmit={values => {
            handleSignUp(values);
          }}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View>
              <InputHandler
                name="name"
                placeholderName="Name"
                style={styles.textInput}
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name}
                onSubmitEditing={() => {
                  emailRef.current.focus();
                }}
              />
              {errors.name && touched.name && (
                <Text style={styles.errorText}>{errors.name}</Text>
              )}
              <InputHandler
                name="email"
                placeholderName="Email Address"
                style={styles.textInput}
                ref={emailRef}
                onSubmitEditing={() => {
                  signUpPasswordRef.current.focus();
                }}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                keyboardType="email-address"
              />
              {errors.email && touched.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}
              {sameEmailError && (
                <Text style={styles.errorText}>{sameEmailError}</Text>
              )}
              <InputHandler
                name="password"
                placeholderName="Password"
                style={styles.textInput}
                ref={signUpPasswordRef}
                onSubmitEditing={() => {
                  signUpConfirmPasswordRef.current.focus();
                }}
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
                ref={signUpConfirmPasswordRef}
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
    </>
  );
};

export default Signup;

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
    // marginBottom: 10,
    // marginTop: 10,
    // paddingVertical: 15,
    // borderBottomWidth: 1,
    // borderBottomColor: '#cccccc',
    // color: '#2f4f4f',
  },
  forgotMainContainer: {
    marginHorizontal: 20,
  },
  signupContainer: {
    marginHorizontal: 20,
    flex: 1,
    justifyContent: 'center',
    top: 40,
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
