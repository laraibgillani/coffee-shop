import React, {useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import CommonModal from '../components/Modal';

const Detailscreen = () => {
  const route = useRoute();
  const {item} = route.params || {};
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  const [isBuyModalVisible, setBuyModalVisible] = useState(false);
  const [iconButtonStates, setIconButtonStates] = useState({});
  const [selectedIcon, setSelectedIcon] = useState();
  const [pickupText, setPickupText] = useState('Pick Up');
  const [deliveryText, setDeliveryText] = useState('Delivery');
  const [showMore, setShowMore] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({});

  const iconData = [
    {id: 1, source: require('../assets/icons/motorBike.png')},
    {id: 2, source: require('../assets/icons/sugar.png')},
    {id: 3, source: require('../assets/icons/icedCoffee.png')},
  ];

  const sizes = ['S', 'M', 'L'];

  const toggleDescription = () => {
    setShowMore(prevState => !prevState);
  };

  const handleSizeSelect = size => {
    setSelectedSize(size);
  };

  const handleImageClick = icon => {
    setModalVisible(true);
    setSelectedIcon(icon);

    let newPickupText = 'Pick Up';
    let newDeliveryText = 'Delivery';

    if (icon.id === 1) {
      newPickupText = 'Pickup';
      newDeliveryText = 'Delivery';
    } else if (icon.id === 2) {
      newPickupText = 'With Sugar';
      newDeliveryText = 'Without Sugar';
    } else if (icon.id === 3) {
      newPickupText = 'Cold Coffee';
      newDeliveryText = 'Hot Coffee';
    }

    setPickupText(newPickupText);
    setDeliveryText(newDeliveryText);

    setIconButtonStates(prevState => ({
      ...prevState,
      [icon.id]: false,
    }));
  };

  const toggleButtonState = iconId => {
    setIconButtonStates(prevState => ({
      ...prevState,
      [iconId]: !prevState[iconId],
    }));

    const selectedOption =
      !iconButtonStates[iconId] === true ? deliveryText : pickupText;

    setSelectedOptions(prevState => ({
      ...prevState,
      [iconId]: selectedOption,
    }));
  };

  const handleBuyClick = () => {
    setBuyModalVisible(true);
  };
  const iconDescriptions = {
    1: 'Bike',
    2: 'Sugar',
    3: 'Coffee',
  };

  return (
    <>
      <View style={styles.headrView}>
        <TouchableOpacity onPress={() => navigation.navigate('Home', {item})}>
          <Image
            source={require('../assets/icons/back.png')}
            style={styles.img}
          />
        </TouchableOpacity>
        <Text style={styles.text}>Detail</Text>
        <Image
          source={require('../assets/icons/heart.png')}
          style={styles.img}
        />
      </View>
      <ScrollView>
        <View style={styles.imgView}>
          <Image source={item.image} style={styles.imgStyle} />
          <Text style={styles.title}>{item.title}</Text>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: 100,
              borderBottomWidth: 2,
              borderBottomColor: '#ccc',
              paddingVertical: 10,
            }}>
            <Text
              style={{
                width: '30%',
                fontSize: 18,
                color: '#7a7777',
                marginTop: 3,
              }}>
              Ice/Hot
            </Text>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                gap: 8,
                width: '70%',
              }}>
              {iconData.map(icon => (
                <View key={icon.id} style={styles.iconsView}>
                  <TouchableOpacity onPress={() => handleImageClick(icon)}>
                    <Image source={icon.source} style={styles.img} />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
          <Text style={styles.desc}>Description</Text>
          <Text style={styles.description}>
            {showMore
              ? item.description
              : `${item.description.substring(0, 100)}...`}
          </Text>
          <TouchableOpacity onPress={toggleDescription}>
            <Text style={styles.showMoreButton}>
              {showMore ? 'Show Less' : 'Read More'}
            </Text>
          </TouchableOpacity>
          <Text style={styles.desc}>Size</Text>
          <View style={styles.sizesRow}>
            {sizes.map(size => (
              <TouchableOpacity
                key={size}
                onPress={() => handleSizeSelect(size)}>
                <View
                  style={[
                    styles.sizeView,
                    selectedSize === size && styles.selectedSizeView,
                  ]}>
                  <Text
                    style={[
                      styles.sizeText,
                      selectedSize === size && styles.selectedSizeText,
                    ]}>
                    {size}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: 30,
          backgroundColor: '#E3E3E3',
          marginTop: 10,
          paddingVertical: 25,
          paddingHorizontal: 15,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
        }}>
        <View style={{width: 50, marginTop: 6}}>
          <Text style={{fontSize: 18, fontWeight: '600'}}>Price</Text>
          <Text style={{fontSize: 18, fontWeight: '600', color: '#C67C4E'}}>
            {item.price}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.buyView}
          onPress={() => handleBuyClick()}>
          <Text style={{color: 'white', fontSize: 20, fontWeight: '600'}}>
            Buy Now
          </Text>
        </TouchableOpacity>
      </View>
      <CommonModal
        isVisible={isBuyModalVisible}
        onClose={() => setBuyModalVisible(false)}
        position={styles.bottomModal}>
        <>
          <View style={{width:'100%', paddingHorizontal:50}}>
            <Text style={{fontSize: 20, fontWeight: '600', marginBottom: 10}}>
              Order Summary
            </Text>
            <View style={{display: 'flex', flexDirection: 'row', gap: '80%'}}>
              <Text style={{fontSize: 18}}>Size:</Text>
              <Text style={{fontSize: 18}}>
                {selectedSize || 'Not Selected'}
              </Text>
            </View>
            {Object.entries(selectedOptions).map(([iconId, option]) => (
              <View key={iconId}>
              <Text  style={{fontSize: 18}}>
                {iconDescriptions[iconId]}: 
              </Text>
              <Text style={{fontSize: 18}}>
              {option}
              </Text>
              </View>
            ))}
            <Text style={{fontSize: 18, marginVertical: 10, color: '#C67C4E'}}>
              Price: {item.price}
            </Text>
          </View>
          <TouchableOpacity
            style={[styles.buyView, {alignSelf: 'center', marginTop: 20}]}
            onPress={() => {
              setBuyModalVisible(false);
            }}>
            <Text style={{color: 'white', fontSize: 20, fontWeight: '600'}}>
              Buy
            </Text>
          </TouchableOpacity>
        </>
      </CommonModal>
      <CommonModal
        isVisible={isModalVisible}
        onClose={() => setModalVisible(false)}>
        <>
          {selectedIcon ? (
            <Image source={selectedIcon.source} style={styles.mdlImg} />
          ) : null}
          <TouchableOpacity
            style={[
              styles.pickBtn,
              !iconButtonStates[selectedIcon?.id]
                ? styles.buttonSelected
                : styles.buttonDefault,
            ]}
            onPress={() => toggleButtonState(selectedIcon?.id)}>
            <Text
              style={{
                color: !iconButtonStates[selectedIcon?.id]
                  ? 'white'
                  : '#C67C4E',
                fontSize: 20,
                fontWeight: '600',
              }}>
              {pickupText}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.pickBtn,
              iconButtonStates[selectedIcon?.id]
                ? styles.buttonSelected
                : styles.buttonDefault,
            ]}
            onPress={() => toggleButtonState(selectedIcon?.id)}>
            <Text
              style={{
                color: iconButtonStates[selectedIcon?.id] ? 'white' : '#C67C4E',
                fontSize: 20,
                fontWeight: '600',
              }}>
              {deliveryText}
            </Text>
          </TouchableOpacity>
        </>
      </CommonModal>
    </>
  );
};

export default Detailscreen;

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
    width: '20%',
  },
  img: {
    width: 30,
    height: 30,
  },
  imgStyle: {
    width: '100%',
    borderRadius: 20,
    marginBottom: 15,
  },
  imgView: {
    margin: 20,
  },
  title: {
    fontSize: 27,
    fontWeight: 'bold',
  },
  iconsView: {
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: 45,
    backgroundColor: '#E3E3E3',
  },
  desc: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 15,
  },
  description: {
    fontSize: 16,
  },
  showMoreButton: {
    fontSize: 16,
    color: '#C67C4E',
    fontWeight: 'bold',
    marginTop: 5,
    paddingLeft: '75%',
  },
  sizesRow: {
    display: 'flex',
    flexDirection: 'row',
    gap: 4,
  },
  sizeView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    height: 60,
    width: 120,
    color: 'black',
    backgroundColor: '#cfc5c5',
    borderRadius: 10,
  },
  sizeText: {
    fontSize: 22,
    fontWeight: '600',
    color: 'black',
  },
  selectedSizeView: {
    backgroundColor: '#C67C4E',
  },
  selectedSizeText: {
    color: '#783D06',
  },
  buyView: {
    backgroundColor: '#C67C4E',
    padding: 15,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    width: '80%',
  },
  mdlImg: {
    height: 100,
    width: 100,
  },
  pickBtn: {
    paddingHorizontal: 50,
    paddingVertical: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    width: '80%',
    margin: 10,
    borderWidth: 2,
  },

  buttonDefault: {
    backgroundColor: 'white',
    borderColor: '#C67C4E',
  },

  buttonSelected: {
    backgroundColor: '#C67C4E',
    borderColor: 'white',
  },
  bottomModal: {
    justifyContent: 'flex-end',
    width: '100%',
  },
});
