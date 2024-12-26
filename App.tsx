import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import GetStarted from './src/components/GetStarted';
import HomePage from './src/screens/HomePage';
import Detailscreen from './src/screens/Detailscreen';
import Favorites from './src/screens/Favorites';
import Shopping from './src/screens/Shopping';
import Notifications from './src/screens/Notifications';

const App = () => {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="getAStarted" component={GetStarted} options={{headerShown:false}}/>
      <Stack.Screen name="Home" component={HomePage} options={{headerShown:false}}/>
      <Stack.Screen name="DetailScreen" component={Detailscreen} options={{headerShown:false}}/>
      <Stack.Screen name="favorites" component={Favorites} options={{headerShown:false}}/>
      <Stack.Screen name="shopping" component={Shopping} options={{headerShown:false}}/>
      <Stack.Screen name="notifications" component={Notifications} options={{headerShown:false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
