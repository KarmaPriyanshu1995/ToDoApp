import {StyleSheet, Text, View} from 'react-native';
import React, {useRef, useState} from 'react';
import InputHandler from '../../../components/inputHandler/InputHandler';
import {Formik} from 'formik';
import * as yup from 'yup';
import {useSelector} from 'react-redux';
import CustomHeader from '../../../components/customHeader/CustomHeader';
import CustomButton from '../../../components/customButton/CustomButton';
const forgotValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Email Address is required'),
});
const ForgotPassword = ({navigation}) => {
  const pin1 = useRef();
  const focusOnInput = e => {
    pin1.current?.focus();
  };

  navigation.addListener('focus', focusOnInput);
  const [forgoterror, setForgotError] = useState('');
  const [forgotEmail, setForgotEmail] = useState('');
  const signupCommingData = useSelector(state => state.signUp.users || []);
  return (
    <View style={styles.forgotMainContainer}>
      <CustomHeader headerTitle="Forgot Password" />
      <Formik
        initialValues={{email: ''}}
        validationSchema={forgotValidationSchema}
        onSubmit={values => {
          const user = signupCommingData.find(
            user => user.email === values.email,
          );
          if (user) {
            setForgotEmail(values.email);
            navigation.navigate('SetNewPassword', {email: forgotEmail});
          } else {
            setForgotError('Email Does not exist!');
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
          <View>
            <InputHandler
              name="email"
              autoFocus={true}
              placeholderName="Email"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              errorMsg={errors.email && touched.email && errors.email}
            />

            {forgoterror && <Text style={styles.errorText}>{forgoterror}</Text>}
            <CustomButton onPress={handleSubmit} buttonTitle="Submit" />
          </View>
        )}
      </Formik>
    </View>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  forgotMainContainer: {
    marginHorizontal: 20,
    flex: 1,
    justifyContent: 'center',
  },
  errorText: {
    color: 'red',
    marginBottom: 8,
  },
});
