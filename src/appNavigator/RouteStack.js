import * as React from 'react';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/mainScreen/HomeScreen';
import TaskScreen from '../screens/mainScreen/TaskScreen';
import AuthStack from './AuthStack';
import HomeStack from './HomeStack';
import {useSelector} from 'react-redux';
import {selectUser} from '../redux/slices/LoginSlice';
const Stack = createStackNavigator();

const RouteStack = () => {
  const user = useSelector(selectUser);
  return (
    <NavigationContainer
      theme={{
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          background: '#fff',
        },
      }}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {user ? (
          <Stack.Screen name="HomeStack" component={HomeStack} />
        ) : (
          <Stack.Screen name="AuthStack" component={AuthStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RouteStack;
