import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const GetStarted = () => {
  const navigation = useNavigation();

  const handleNavigation = () => {
    navigation.navigate('Home');
  };
  return (
    <>
      <View style={styles.container}>
        <Image
          source={require('../assets/images/getStarted.jpeg')}
          style={styles.image}
        />
        <View style={styles.coffeeContainer}>
        <Text style={styles.coffeeCls}>
          Fall in Love with Coffee in Blissful Delight
        </Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={() => handleNavigation('Home')}>
          <Text style={styles.txtCls}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default GetStarted;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: '100%',
    opacity: 0.9,
  },
  coffeeContainer:{
    position: 'absolute',
    bottom: '22%',
    justifyContent:'center',
    alignSelf: 'center',
  },
  coffeeCls: {
    color: '#ffff',
    fontSize: 40,
    fontWeight: 'bold',
    alignItems:'center',
    textAlign: 'center',
  },
  button: {
    alignSelf: 'center',
    backgroundColor: 'rgb(111, 78, 55)',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    bottom: '10%',
    position: 'absolute',
  },
  txtCls: {
    color: '#ffff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems:'center',
  },

});
