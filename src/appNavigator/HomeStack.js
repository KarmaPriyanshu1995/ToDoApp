import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/mainScreen/HomeScreen'
import TaskScreen from '../screens/mainScreen/TaskScreen'
const Stack = createStackNavigator();

const HomeStack = () => {
  return (
      <Stack.Navigator  screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="ToDo" component={HomeScreen} />
        <Stack.Screen name="AddTask" component={TaskScreen} />
      </Stack.Navigator>
  );
};

export default HomeStack;
