import {useNavigation, useRoute} from '@react-navigation/native';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const OrderDetail = () => {
  const route = useRoute();
  const {item} = route.params || {};
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.head}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../assets/icons/previous.png')}
            style={styles.back}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.head}>
        <Text style={styles.header}>Thanks for your Order!</Text>
      </View>
      <View style={styles.pageWrapper}>
        <Text style={styles.name}>{item?.name}</Text>
        <View style={styles.dateView}>
          <Text style={styles.dateTextHead}>Date:</Text>
          <Text style={styles.date}>{item?.timestamp}</Text>
        </View>
        <View style={styles.wrap}>
          <Image source={item?.image} style={styles.image} />
          <View style={styles.content}>
            <View style={styles.detail}>
              <Text style={styles.text}>Size:</Text>
              <Text style={styles.item}>{item?.size}</Text>
            </View>
            <View style={styles.detail}>
              <Text style={styles.text}>Quantity:</Text>
              <Text style={styles.item}>{item?.quantity}</Text>
            </View>
          </View>
        </View>
        <View style={styles.categoryView}>
          <Text style={styles.categoryText}>Delivery Method:</Text>
          <Text style={styles.category}>{item?.deliveryMethod}</Text>
        </View>
        <View style={styles.categoryView}>
          <Text style={styles.categoryText}>Delivery Charges:</Text>
          <Text style={styles.category}>{item?.deliveryCharges}</Text>
        </View>
        <View style={styles.categoryView}>
          <Text style={styles.categoryText}>Sugar Preference:</Text>
          <Text style={styles.category}>{item?.sugarPreference}</Text>
        </View>
        <View
          style={{borderWidth: 0.6, borderColor: 'black', marginVertical: 20}}
        />
        <View style={styles.detail}>
          <Text style={styles.categoryText1}>Total Price:</Text>
          <Text style={styles.categoryText1}>${item?.total}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
  },
  head: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: '500',
    paddingHorizontal: 10,
    marginBottom: 10,
    color: '#C67C4E',
  },
  back: {
    width: 30,
    height: 30,
    marginVertical: 10,
  },
  pageWrapper: {
    marginHorizontal: 20,
    marginVertical: 4,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  wrap: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    marginBottom: 20,
  },
  image: {
    width: '30%',
    height: 100,
    borderRadius: 10,
  },
  name: {
    paddingHorizontal: 5,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  dateView: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    paddingBottom: 20,
  },
  dateTextHead: {
    paddingHorizontal: 5,
    fontSize: 20,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 16,
    color: 'black',
    fontWeight: 500,
  },
  content: {
    flex: 1,
    justifyContent: 'space-around',
  },
  detail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    flex: 1,
  },
  item: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#783D06',
    textAlign: 'right',
  },
  categoryView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  categoryText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#919191',
    marginBottom: 10,
  },
  category: {
    backgroundColor: '#C67C4E',
    borderRadius: 10,
    color: 'white',
    fontSize: 18,
    paddingHorizontal: 20,
    paddingVertical: 5,
    marginBottom: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  categoryText1: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
  },
});

export default OrderDetail;