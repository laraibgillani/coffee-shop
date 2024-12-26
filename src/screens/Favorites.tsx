import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const Favorites = () => {
  const route = useRoute();
  const {item} = route.params || {};
  const navigation=useNavigation()
  return (
    <View>
      <View style={styles.headrView}>
        <TouchableOpacity onPress={() => navigation.navigate('Home', {item})}>
          <Image
            source={require('../assets/icons/back.png')}
            style={styles.img}
          />
        </TouchableOpacity>
        <Text style={styles.text}>Favorites</Text>
        <Image
          source={require('../assets/icons/heart.png')}
          style={styles.img}
        />
      </View>
      <View style={{ justifyContent: 'center', alignItems: 'center', top:300}}>
      <Text style={styles.content}>Here is Favorites screen</Text>
      </View>
    </View>
  );
};

export default Favorites;

const styles = StyleSheet.create({
  headrView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 15,
    marginVertical: 30,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    width: '22%',
  },
  img: {
    width: 30,
    height: 30,
  },
  content:{
    fontSize: 20,
    fontWeight: 'bold',
    width: '100%',
    paddingHorizontal:90
  }
})