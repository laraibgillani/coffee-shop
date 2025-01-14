import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Shopping from '../screens/Shopping';
import Notifications from '../screens/Notifications';
import HomePage from '../screens/HomePage';
import GetStarted from '../components/GetStarted';
import Settings from '../screens/Setting';
import LoginScreen from '../screens/LoginScreen';
import Detailscreen from '../screens/Detailscreen';
import Favourites from '../screens/Favorites';
import OrderDetail from '../screens/OrderDetail';

const AuthStack = createStackNavigator();

function AuthStackNavigator() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }} initialRouteName='getAStarted'>
      <AuthStack.Screen name="getAStarted" component={GetStarted} />
      <AuthStack.Screen name='loginScreen' component={LoginScreen} />
      <AuthStack.Screen name="Home" component={HomePage} />
      <AuthStack.Screen name="DetailScreen" component={Detailscreen} />
      <AuthStack.Screen name="shopping" component={Shopping} />
      <AuthStack.Screen name="favorites" component={Favourites} />
      <AuthStack.Screen name="notifications" component={Notifications} />
      <AuthStack.Screen name="settings" component={Settings} />
      <AuthStack.Screen name="OrderDetail" component={OrderDetail} />
    </AuthStack.Navigator>
  );
}

export default AuthStackNavigator;