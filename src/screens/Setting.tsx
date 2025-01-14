import React, {useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Settings = () => {
  const navigation = useNavigation();
  const [logout, setLogout] = useState(false);

  //   useEffect(() => {
  //     const user = auth().currentUser;
  //     if (user) {
  //       const [firstName = 'No First Name', lastName = 'No Last Name'] =
  //         user.displayName ? user.displayName.split(' ') : [];
  //       setUserProfile({
  //         firstName,
  //         lastName,
  //         email: user.email || 'No Email Provided',
  //       });
  //     }
  //   }, []);

  const handleLogout = async () => {
    try {
      await auth().signOut();
      navigation.navigate('loginScreen');
      await AsyncStorage.setItem('isLoggedIn', 'false');
    } catch (error) {
      console.log('Error logging out:', error.message);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.head}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require('../assets/icons/back.png')}
              style={styles.back}
            />
          </TouchableOpacity>
          <Text style={styles.header}>Settings</Text>
        </View>
        <ScrollView style={styles.pageWrapper}>
          <TouchableOpacity
            style={styles.btnView}
            onPress={() => setLogout(!logout)}>
            <View style={styles.imgText}>
              <Image
                source={require('../assets/icons/logout.png')}
                style={styles.image}
              />
              <Text style={styles.text}>Logout</Text>
            </View>
            <Image
              source={require('../assets/icons/down.png')}
              style={styles.imageDown}
            />
          </TouchableOpacity>
          {logout && (
            <View style={styles.box}>
              <View style={styles.boxContainer}>
                <Text style={styles.boxHeader}>Logout</Text>
                <Text style={styles.boxBody}>
                  Are you sure you want to logout?
                </Text>
                <TouchableOpacity
                  style={styles.toggleBtn}
                  onPress={handleLogout}>
                  <Text style={styles.toggleText}>Logout</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.toggleBtnCancel}
                  onPress={() => setLogout(false)}>
                  <Text style={styles.toggleTextCancel}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  head: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    width: '60%',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    right: -15,
  },
  back: {
    width: 35,
    height: 35,
  },
  pageWrapper: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  image: {
    width: 50,
    height: 50,
  },
  imageDown: {
    width: 15,
    height: 15,
  },
  btnView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
  },
  imgText: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  text: {
    fontSize: 22,
    fontWeight: '500',
    marginLeft: 10,
  },
  box: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    paddingHorizontal: 20,
  },
  boxContainer: {
    paddingVertical: 20,
  },
  boxHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  boxBody: {
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 10,
    textAlign: 'center',
  },
  toggleBtn: {
    backgroundColor: '#C67C4E',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    margin: 10,
    marginHorizontal: 40,
  },
  toggleBtnCancel: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    marginHorizontal: 40,
    borderWidth: 1,
    borderColor: 'black',
  },
  toggleText: {
    fontSize: 22,
    fontWeight: '500',
    color: 'white',
    textAlign: 'center',
  },
  toggleTextCancel: {
    fontSize: 22,
    fontWeight: '500',
    color: 'black',
    textAlign: 'center',
  },
  profile: {
    alignItems: 'center',
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '500',
  },
});

export default Settings;
