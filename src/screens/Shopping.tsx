
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import database from '@react-native-firebase/database';

const Shopping = () => {
  const navigation = useNavigation();
  const [orderList, setOrderList] = useState(null);
  const [toggleView, setToggleView] = useState(true);

  useEffect(() => {
    getDatabase();
  }, []);

  const getDatabase = async () => {
    try {
      const getData = await database()
        .ref('coffeeShopDatabase/uuid')
        .once('value');
      const data = getData.val();

      let dataArray = [];

      if (data) {
        dataArray = Object.entries(data).map(([key, value]) => ({
          ...value,
          id: key,
        }));
        setOrderList(dataArray);
      } else {
        setOrderList([]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const renderItem = ({item}: any) => (
    <TouchableOpacity
      style={toggleView ? styles.gridView : styles.listView}
      onPress={() => navigation.navigate('OrderDetail', {item})}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.title}>{item?.name}</Text>
      <Text style={styles.price}>${item?.total || '0.00'}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.head}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={require('../assets/icons/back.png')} style={styles.back} />
          </TouchableOpacity>
          <Text style={styles.header}>My Order</Text>
          <TouchableOpacity onPress={() => setToggleView(!toggleView)}>
            <Image
              source={
                toggleView
                  ? require('../assets/icons/listView.png')
                  : require('../assets/icons/gridView.png')
              }
              style={styles.grid}
            />
          </TouchableOpacity>
        </View>
        {orderList && orderList.length > 0 ? (
          <FlatList
            key={toggleView ? 'grid' : 'list'}
            data={orderList}
            numColumns={toggleView ? 2 : 1}
            keyExtractor={(item, index) => item.id || index.toString()}
            renderItem={renderItem}
            contentContainerStyle={{gap: 5}}
            style={{marginHorizontal: 10}}
          />
        ) : (
          <View style={styles.noDataWrapper}>
            <Text style={styles.noDataText}>No order placed yet!</Text>
          </View>
        )}
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
    paddingHorizontal: 10,
  },
  head: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  back: {
    width: 35,
    height: 35,
  },
  grid: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
  listWrapper: {
    paddingBottom: 20,
  },
  noDataWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#888',
  },
  listView: {
    backgroundColor: '#E3E3E3',
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  gridView: {
    width: '45%',
    backgroundColor: '#E3E3E3',
    borderRadius: 10,
    padding: 10,
    marginVertical: 20,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 100,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  price: {
    fontSize: 14,
    color: '#783D06',
  },
});

export default Shopping;
