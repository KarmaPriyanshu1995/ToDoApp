import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/mainScreen/HomeScreen';
import TaskScreen from '../screens/mainScreen/TaskScreen';
import Login from '../screens/auth/login/Login';
import Signup from '../screens/auth/signUp/SignUp';
import ForgotPassword from '../screens/auth/forgotPassword/ForgotPassword';
import SetNewPassword from '../screens/auth/setNewPassword/SetNewPassword';
const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{headerShown: true, headerTitle: ''}}
      />
      <Stack.Screen name="SetNewPassword" component={SetNewPassword} />
    </Stack.Navigator>
  );
};

export default AuthStack;
