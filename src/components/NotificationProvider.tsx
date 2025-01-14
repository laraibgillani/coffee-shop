import React, {createContext, useState, useContext, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NotificationsContext = createContext();

export const NotificationsProvider = ({children}) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const loadNotifications = async () => {
      try {
        const storedNotifications = await AsyncStorage.getItem('notifications');
        if (storedNotifications) {
          setNotifications(JSON.parse(storedNotifications));
        }
      } catch (error) {
        console.error('Failed to load notifications:', error);
      }
    };
    loadNotifications();
  }, []);

  const addNotification = async notification => {
    try {
      const updatedNotifications = [notification, ...notifications];
      setNotifications(updatedNotifications);
      await AsyncStorage.setItem(
        'notifications',
        JSON.stringify(updatedNotifications),
      );
    } catch (error) {
      console.error('Failed to add notification:', error);
    }
  };
  // For remove notification...........
  // const removeNotification = async (timestamp) => {
  //   try {
  //     const updatedNotifications = notifications.filter(
  //       (notification) => notification.timestamp !== timestamp
  //     );
  //     console.log(updatedNotifications)
  //     setNotifications(updatedNotifications);
  //     await AsyncStorage.setItem('notifications', JSON.stringify(updatedNotifications));
  //   } catch (error) {
  //     console.error('Failed to remove notification:', error);
  //   }
  // };

  return (
    // <NotificationsContext.Provider value={{ notifications, addNotification, removeNotification }}>
    <NotificationsContext.Provider value={{notifications, addNotification}}>
      {children}
    </NotificationsContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationsContext);