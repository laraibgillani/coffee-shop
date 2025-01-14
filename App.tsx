import React from 'react';
import ApplicationStack from './src/navigators/Index';
import Toast from 'react-native-toast-message';
import { FavouritesProvider } from './src/components/FavouriteProvides';
import { NotificationsProvider } from './src/components/NotificationProvider';

const App = () => {
  return (
    <NotificationsProvider>
      <FavouritesProvider>
        <ApplicationStack />
        <Toast />
      </FavouritesProvider>
    </NotificationsProvider>
  );
};

export default App;
