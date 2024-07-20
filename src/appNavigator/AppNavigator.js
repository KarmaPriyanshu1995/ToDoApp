import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/mainScreen/HomeScreen'
import TaskScreen from '../screens/mainScreen/TaskScreen'
const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ToDo">
        <Stack.Screen name="ToDo" component={HomeScreen} />
        <Stack.Screen name="AddTask" component={TaskScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
