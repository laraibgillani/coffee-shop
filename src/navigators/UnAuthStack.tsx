import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import GetStarted from '../components/GetStarted';

const UnAuthStack = createStackNavigator();

function UnAuthStackNavigator() {
  return (
    <UnAuthStack.Navigator screenOptions={{ headerShown: false }}>
      <UnAuthStack.Screen name="loginScreen" component={LoginScreen} />
      <UnAuthStack.Screen name="signupScreen" component={SignupScreen} />
      <UnAuthStack.Screen name="getAStarted" component={GetStarted} />
    </UnAuthStack.Navigator>
  );
}

export default UnAuthStackNavigator;