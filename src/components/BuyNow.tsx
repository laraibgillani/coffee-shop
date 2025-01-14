import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import database from '@react-native-firebase/database';
import moment from 'moment';
import Toast from 'react-native-toast-message';
import { useNotifications } from './NotificationProvider';
import Modal from './Modal';

interface BuyNowProps {
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
  selectedType: {
    bike?: string;
    coffee?: string;
    sugar?: string;
    size?: string;
  };
  totalPrice?: number;
  image: string;
  name: string;
}

const BuyNow: React.FC<BuyNowProps> = ({
  openModal,
  setOpenModal,
  selectedType,
  totalPrice,
  image,
  name,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [productDetail, setProductDetail] = useState(null);
  const handleQuantityIncrement = () => {
    setQuantity(quantity + 1);
  };
  const handleQuantityDecrement = () => {
    setQuantity(quantity > 1 ? quantity - 1 : 1);
  };
  const {addNotification} = useNotifications();

  const deliveryCharges =
    selectedType.bike === 'Pick Up' ? (0.0).toFixed(2) : (0.5).toFixed(2);
  const total = parseFloat(totalPrice * quantity) + parseFloat(deliveryCharges);
  const handlePayment = async () => {
    try {
      const newOrder = database().ref('coffeeShopDatabase/uuid').push();
      const getSizeLabel = () => {
        switch (selectedType?.size) {
          case 'S':
            return 'Small';
          case 'M':
            return 'Medium';
          case 'L':
            return 'Large';
          default:
            return 'Unknown';
        }
      };
      const orderDetail = {
        id: newOrder?.key,
        deliveryMethod: selectedType?.bike,
        coffeeType: selectedType?.coffee,
        sugarPreference: selectedType?.sugar,
        size: getSizeLabel(),
        quantity: quantity,
        basePrice: totalPrice,
        deliveryCharges: deliveryCharges,
        total: total.toFixed(2),
        timestamp: moment().format('YYYY-MM-DD HH:mm'),
        image: image,
        name: name,
      };
      await newOrder.set(orderDetail);
      showToast();
      setOpenModal(false);
    } catch (error) {
      console.error('Error adding order to Firebase:', error);
    }
  };

  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Success',
      text2: 'Order Placed successfully! 👋',
    });
  };

  const onDisplayNotification = async ({title, body}) => {
    try {
     

        addNotification({title, body, timestamp: new Date().toISOString()});
      
    } catch (error) {
      console.error('Error displaying notification:', error);
    }
    setOpenModal(false);
  };

  return (
    <Modal
      visible={openModal}
      onClose={() => setOpenModal(false)}
      showTitle
      title="Product Detail"
      selectedType={selectedType}
      setSelectedType={() => {}}
      modalPosition={styles.modalPosition}
      modalWidth={'100%'}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.header}>Selected categories: </Text>
        <View style={styles.options}>
          <Text style={styles.optionLeftText}>Delivery Method: </Text>
          <Text style={styles.optionRightText}>{selectedType?.bike}</Text>
        </View>
        <View style={styles.options}>
          <Text style={styles.optionLeftText}>Coffee Type: </Text>
          <Text style={styles.optionRightText}>{selectedType?.coffee}</Text>
        </View>
        <View style={styles.options}>
          <Text style={styles.optionLeftText}>Sugar Preference: </Text>
          <Text style={styles.optionRightText}>{selectedType?.sugar}</Text>
        </View>
        <View style={styles.quantity}>
          <Text style={styles.qtyHeader}>Coffee quantity: </Text>
          <View style={styles.btns}>
            <TouchableOpacity
              style={styles.btn}
              onPress={handleQuantityDecrement}>
              <Text style={styles.qtyText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.qtyText}>{quantity}</Text>
            <TouchableOpacity
              style={styles.btn}
              onPress={handleQuantityIncrement}>
              <Text style={styles.qtyText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.border} />
        <View style={styles.options}>
          <Text style={styles.billingText}>Base Price:</Text>
          <Text style={styles.optionRightText}>${totalPrice}</Text>
        </View>
        <View style={styles.options}>
          <Text style={styles.billingText}>Coffee Quantity:</Text>
          <Text style={styles.optionRightText}>{quantity}</Text>
        </View>
        <View style={styles.options}>
          <Text style={styles.billingText}>Delivery Charges:</Text>
          <Text style={styles.optionRightText}>${deliveryCharges}</Text>
        </View>
        <View style={styles.border} />
        <View style={styles.optionsTotal}>
          <Text style={styles.billingTotal}>Total:</Text>
          <Text style={styles.optionRightText}>${total.toFixed(2)}</Text>
        </View>
        <TouchableOpacity
          style={styles.payBtn}
          onPress={() => {
            onDisplayNotification({
              title: 'Success',
              body: 'Order Placed successfully!',
            }),
              handlePayment();
          }}>
          <Text style={styles.payText}>Pay</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalPosition: {
    justifyContent: 'flex-end',
    width: '100%',
  },
  container: {
    marginHorizontal: 10,
    padding: 10,
  },
  header: {
    fontSize: 20,
    color: 'black',
    fontWeight: 500,
    paddingVertical: 10,
  },
  options: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  optionLeftText: {
    fontSize: 18,
    color: 'black',
    marginVertical: 3,
    fontWeight: 500,
  },
  optionRightText: {
    fontSize: 16,
    color: '#C67C4E',
    marginVertical: 3,
    fontWeight: 500,
  },
  border: {
    marginTop: 10,
    marginBottom: 10,
    borderTopWidth: 1,
    borderColor: '#E3E3E3',
  },
  quantity: {
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  qtyHeader: {
    fontSize: 18,
    color: 'black',
    fontWeight: 500,
    marginVertical: 3,
  },
  btns: {
    flexDirection: 'row',
    gap: 10,
    borderWidth: 1,
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 16,
    borderColor: '#919191',
  },
  btn: {
    paddingHorizontal: 10,
    backgroundColor: '#E3E3E3',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtyText: {
    fontSize: 18,
    color: 'black',
    fontWeight: 500,
  },
  billingText: {
    fontSize: 16,
    fontWeight: 500,
    color: 'black',
    paddingVertical: 3,
    marginBottom: 10,
  },
  billingTotal: {
    fontSize: 20,
    fontWeight: 600,
    color: 'black',
  },
  optionsTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  payBtn: {
    backgroundColor: '#C67C4E',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    color: 'white',
    fontWeight: '700',
    fontSize: 20,
    marginVertical: 10,
    marginBottom: 10,
  },
  payText: {
    fontSize: 20,
    color: 'white',
    fontWeight: '700',
    alignItems: 'center',
    textAlign: 'center',
  },
});

export default BuyNow;