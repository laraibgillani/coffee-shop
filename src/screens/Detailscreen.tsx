import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal from '../components/Modal';
import BuyNow from '../components/BuyNow';
import { useFavourites } from '../components/FavouriteProvides';
import { Icons } from '../Data';

const DetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {item} = route.params || {};
  const [onShowMore, setOnShowMore] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [selectedType, setSelectedType] = useState({
    bike: 'Pick Up',
    coffee: 'Hot Coffee',
    sugar: 'With Sugar',
    size: 'S',
  });

  const {favourites, toggleFavourite} = useFavourites();
  const isFavourites = favourites.some(fav => fav?.id === item?.id);

  const [openModal, setOpenModal] = useState(false);
  const [openBuyNowModal, setOpenBuyNowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const icons = Icons;
  const sizes = ['S', 'M', 'L'];
  const getPrice = () => {
    if (activeTab === 0) {
      return item?.price;
    } else if (activeTab === 1) {
      return (item?.price * 1.1).toFixed(2);
    } else if (activeTab === 2) {
      return (item?.price * 1.2).toFixed(2);
    }
  };
  const totalPrice = getPrice();
  const handleSizeSelection = index => {
    setActiveTab(index);
    setSelectedType(prev => ({
      ...prev,
      size: sizes[index],
    }));
  };
  const handleIconPress = image => {
    setSelectedImage(image);
    setOpenModal(true);
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require('../assets/icons/back.png')}
              style={styles.iconStyle}
            />
          </TouchableOpacity>
          <View style={styles.textStyle}>
            <Text style={styles.text}>Detail</Text>
          </View>
          <TouchableOpacity onPress={() => toggleFavourite(item)}>
            <Image
              source={
                isFavourites
                  ? require('../assets/icons/redHeart.png')
                  : require('../assets/icons/heartGray.png')
              }
              style={styles.iconStyle}
            />
          </TouchableOpacity>
        </View>
        <ScrollView style={{padding: 20}}>
           <Image style={styles.imageStyle} source={item?.image} />
          <Text style={styles.title}>{item?.title}</Text>
          <View style={styles.detail}>
            <Text style={styles.text1}>Choose More</Text>
            <View style={styles.options}>
              {icons?.map((value, index) => (
                <View style={styles.iconContainer} key={index}>
                  <TouchableOpacity onPress={() => handleIconPress(value)}>
                    <Image source={value?.image} style={styles.icons} />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
          <View style={styles.bottomBorder} />
          <View>
            <Text style={styles.desTitle}>Description</Text>
            <Text style={styles.description}>
              {onShowMore
                ? item?.description
                : `${item?.description.slice(0, 100)}...`}
            </Text>
            {item?.description?.length > 100 && (
              <TouchableOpacity
                style={styles.showMoreButton}
                onPress={() => setOnShowMore(!onShowMore)}>
                <Text style={styles.showMoreText}>
                  {onShowMore ? 'Read Less' : 'Read More'}
                </Text>
              </TouchableOpacity>
            )}
          </View>
          <View style={{marginBottom: 30}}>
            <Text style={styles.desTitle}>Size</Text>
            <View style={styles.btnStyle}>
              {sizes?.map((size, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleSizeSelection(index)}>
                  <Text
                    style={
                      activeTab === index ? styles.activeColor : styles.btn
                    }>
                    {size}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>
        <View style={styles.footer}>
          <View style={styles.footerTextStyle}>
            <Text style={styles.footerText1}>Price</Text>
            <Text style={styles.footerText}>${totalPrice}</Text>
          </View>
          <TouchableOpacity
            style={styles.footerButton}
            onPress={() => setOpenBuyNowModal(true)}>
            <Text style={styles.footerBtnText}>Buy Now</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        visible={openModal}
        onClose={() => setOpenModal(false)}
        title={selectedImage?.title}
        selectedType={selectedType}
        setSelectedType={setSelectedType}>
        <View style={styles.modal}>
          {selectedImage && (
            <Image source={selectedImage?.image} style={styles.modalImg} />
          )}
        </View>
      </Modal>
      <BuyNow
        openModal={openBuyNowModal}
        setOpenModal={setOpenBuyNowModal}
        selectedType={selectedType}
        totalPrice={totalPrice}
        image={item?.image}
        name={item?.name}
      />
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    paddingVertical: 10,
    padding: 20,
  },
  iconStyle: {
    width: 30,
    height: 30,
  },
  textStyle: {
    flex: 1,
  },
  text: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  imageStyle: {
    width: '100%',
    height: 200,
    borderRadius: 20,
    marginBottom: 20,
  },
  image: {
    width: '100%',
    resizeMode: 'cover',
    borderRadius: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  detail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
  },
  text1: {
    fontSize: 16,
    color: '#919191',
  },
  options: {
    flexDirection: 'row',
    borderRadius: 6,
    gap: 10,
  },
  iconContainer: {
    padding: 6,
    backgroundColor: '#E3E3E3',
    borderRadius: 6,
  },
  icons: {
    width: 30,
    height: 30,
  },
  bottomBorder: {
    borderWidth: 0.6,
    borderColor: '#E3E3E3',
    margin: 20,
  },
  desTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    color: '#919191',
    marginVertical: 10,
    lineHeight: 20,
  },
  showMoreButton: {
    alignSelf: 'flex-end',
  },
  showMoreText: {
    color: '#C67C4E',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  btnStyle: {
    flexDirection: 'row',
    borderRadius: 6,
    width: '100%',
    justifyContent: 'space-evenly',
  },
  btn: {
    paddingHorizontal: '14%',
    paddingVertical: '4%',
    backgroundColor: '#E3E3E3',
    borderRadius: 8,
    color: 'black',
    fontWeight: '500',
    fontSize: 20,
    marginVertical: 10,
  },
  activeColor: {
    backgroundColor: '#EDD6C8',
    color: '#B56431',
    fontWeight: '500',
    paddingHorizontal: '14%',
    paddingVertical: '4%',
    borderRadius: 8,
    fontSize: 20,
    marginVertical: 10,
  },
  footer: {
    paddingVertical: 30,
    backgroundColor: '#F2F2F2',
    borderStartStartRadius: 20,
    borderEndStartRadius: 20,
    flexDirection: 'row',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  footerTextStyle: {
    marginHorizontal: 20,
    textAlign: 'center',
  },
  footerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#C67C4E',
  },
  footerText1: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#696969',
  },
  footerButton: {
    width: '70%',
    backgroundColor: '#C67C4E',
    padding: 15,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerBtnText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalImg: {
    width: 100,
    height: 100,
    alignSelf: 'center',
  },
});
export default DetailScreen;