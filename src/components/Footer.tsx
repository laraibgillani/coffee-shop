import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'

const Footer = () => {
    const [selectedIcon, setSelectedIcon] = useState('Home');
    const navigation = useNavigation();
    const iconData = [
      {
        id: 1,
        screen: 'Home',
        source: require('../assets/icons/home.png'),
        activeSource: require('../assets/icons/filledHome.png'),
      },
      {
        id: 2,
        screen: 'favorites',
        source: require('../assets/icons/heartGray.png'),
        activeSource: require('../assets/icons/filledHeart.png'),
      },
      {
        id: 3,
        screen: 'shopping',
        source: require('../assets/icons/shoppingBag.png'),
        activeSource: require('../assets/icons/filledBag.png'),
      },
      {
        id: 3,
        screen: 'notifications',
        source: require('../assets/icons/bell.png'),
        activeSource: require('../assets/icons/filledBell.png'),
      },
    ];
    const handleIconPress = (icon) => {
      setSelectedIcon(icon.screen); 
      navigation.navigate(icon.screen); 
    };
  return (
    <View style={styles.bottomNav}>
    {iconData.map((icon) => (
      <TouchableOpacity key={icon.id} onPress={() => handleIconPress(icon)}>
        <Image
          source={selectedIcon === icon.screen ? icon.activeSource : icon.source}
          style={styles.img}
        />
      </TouchableOpacity>
    ))}
  </View>
  )
}

export default Footer

const styles = StyleSheet.create({
    img: {
        height: 30,
        width: 30,
      },
      bottomNav: {
        display: 'flex',
        flexDirection: 'row',
        gap: 85,
        backgroundColor: '#e6e5e5',
        marginTop: 10,
        paddingVertical: 15,
        paddingHorizontal: 15,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        borderWidth: 0.3,
        borderColor: "#919191",
      },
})