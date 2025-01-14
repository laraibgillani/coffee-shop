import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
} from 'react-native';
import { useNotifications } from '../components/NotificationProvider';

const Notifications = () => {
  const {notifications} = useNotifications();
  // const {notifications, removeNotification} = useNotifications();

  const renderNotification = ({item}) => (
    <View style={styles.notificationCard}>
      <View style={styles.headerView}>
        <View>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.body}>{item.body}</Text>
        </View>
        <Image
          style={styles.image}
          source={require('../assets/icons/filledBell.png')}
        />
      </View>
      <Text style={styles.timestamp}>
        {new Date(item.timestamp).toLocaleString()}
      </Text>
      {/* <TouchableOpacity
      style={styles.deleteButton}
      onPress={() => removeNotification(item.timestamp)}
    >
      <Image style={styles.image} source={require('../assets/close.png')}/>
    </TouchableOpacity> */}
    </View>
  );

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.header}>Notifications</Text>
        {notifications.length === 0 ? (
          <Text style={styles.placeholder}>No notifications yet!</Text>
        ) : (
          <FlatList
            data={notifications}
            renderItem={renderNotification}
            keyExtractor={(item, index) => index.toString()}
          />
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 30,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 10,
  },
  placeholder: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
  notificationCard: {
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 0.1,
    marginHorizontal: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    marginTop: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  body: {
    fontSize: 14,
    color: '#919191',
    marginVertical: 4,
  },
  timestamp: {
    fontSize: 12,
    color: 'black',
    textAlign: 'right',
  },
  headerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image: {
    width: 20,
    height: 20,
  },
  // deleteButton: {
  //   backgroundColor: "#C67C4E",
  //   borderRadius: 20,
  //   position: "absolute",
  //   right: -6,
  //   top: -6,
  // },
});

export default Notifications;