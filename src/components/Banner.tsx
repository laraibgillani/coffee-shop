import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const Banner = ({onSearch}) => {
    const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Image
          source={require('../assets/images/coffeeLogo.png')}
          style={styles.logoImage}
        />
        <Text style={styles.name}>Coffee Shop</Text>
      </View>
      <View style={styles.view}>
        <View style={styles.inputStyle}>
          <Image
            source={require('../assets/icons/icons8-search-64.png')}
            style={{
              height: 30,
              width: 30,
              alignItems: 'center',
              alignSelf: 'center',
            }}
          />
          <TextInput
            placeholder="Search Coffee"
            onChangeText={text => onSearch(text)}
          />
        </View>
        <TouchableOpacity style={styles.btnStyle} onPress={() => navigation.navigate("settings")}>
          <Image
            source={require('../assets/icons/icons8-slider-48.png')}
            style={{width: 30, height: 30}}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.imgView}>
        <Image
          source={require('../assets/images/banner.jpg')}
          style={styles.bannerImg}
        />
        <View style={styles.proView}>
          <Text style={styles.proText}>PROMO</Text>
        </View>
        <View style={styles.promoView}>
          <Text style={styles.promoText}>Buy one get one FREE</Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    height: 300,
    width: '100%',
  },
  logo: {
    top: '10%',
    left: '5%',
    flexDirection: 'row',
    gap: 20,
  },
  logoImage: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
    borderRadius: 100,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: '#C67C4E',
    fontStyle: 'italic',
  },
  view: {
    flexDirection: 'row',
    marginHorizontal:30,
    marginVertical:20,
    gap: 10,
    marginTop: 50,
  },
  inputStyle: {
    paddingHorizontal: 10,
    padding: 6,
    backgroundColor: 'white',
    borderRadius: 8,
    flexDirection: 'row',
    width: '82%',
  },
  textInput: {
    padding: 10,
  },
  btnStyle: {
    backgroundColor: '#C67C4E',
    padding: 10,
    borderRadius: 8,
    width: '15%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnStyleText: {
    color: 'white',
  },
  imgView: {
    marginHorizontal: 20,
    alignSelf: 'center',
    position: 'relative',
  },
  bannerImg: {
    borderRadius: 10,
  },
  proView: {
    position: 'absolute',
    backgroundColor: '#783D06',
    borderRadius: 8,
    alignItems: 'center',
    margin: 10,
  },
  proText: {
    padding: 8,
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  promoView: {
    position: 'absolute',
    backgroundColor: '#C67C4E',
    borderRadius: 8,
    alignItems: 'center',
    top: '30%',
    margin: 10,
    width: '50%',
    padding: 10,
  },
  promoText: {
    padding: 8,
    color: 'white',
    fontSize: 26,
    fontWeight: 'bold',
  },
});
export default Banner;
