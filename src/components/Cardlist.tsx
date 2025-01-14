import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const Cardlist = ({filter, searchQuery}) => {
  const navigation = useNavigation();
  const DummyData = [
    {
      id: '1',
      image: require('../assets/images/coffeeCup6.jpeg'),
      title: 'Cappuccino',
      price: '3.50',
      description:
        'A creamy coffee with rich espresso, steamed milk, and a thick foam layer. Perfect for a warm, indulgent treat. A classic coffee made by adding hot water to espresso, offering a balanced and smooth taste.',
    },
    {
      id: '2',
      image: require('../assets/images/coffeeCup5.jpeg'),
      title: 'Latte',
      price: '4.00',
      description:
        'Smooth and creamy, this espresso-based drink is blended with steamed milk and a light touch of foam. A creamy coffee with rich espresso, steamed milk, and a thick foam layer. Perfect for a warm, indulgent treat.',
    },
    {
      id: '3',
      image: require('../assets/images/coffeeCup4.jpeg'),
      title: 'Espresso',
      price: '2.50',
      description:
        'A robust and bold coffee served in small portions, perfect for a quick energy kick at any time. A creamy coffee with rich espresso, steamed milk, and a thick foam layer. Perfect for a warm, indulgent treat.',
    },
    {
      id: '4',
      image: require('../assets/images/coffeeCup3.jpeg'),
      title: 'Machiato',
      price: '3.00',
      description:
        'Espresso diluted with hot water to create a light, smooth coffee with deep flavors. Ideal for a relaxed sip.A creamy coffee with rich espresso, steamed milk, and a thick foam layer. Perfect for a warm, indulgent treat.',
    },
    {
      id: '5',
      image: require('../assets/images/coffeeCup2.jpeg'),
      title: 'American',
      price: '3.00',
      description:
        'A classic coffee made by adding hot water to espresso, offering a balanced and smooth taste. A creamy coffee with rich espresso, steamed milk, and a thick foam layer. Perfect for a warm, indulgent treat.',
    },
  ];
  const filteredData = DummyData.filter(item => {
    const matchesFilter =
      !filter || item.title.toLowerCase() === filter.toLowerCase();
    const matchesSearch =
      !searchQuery ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => navigation.navigate('DetailScreen', {item})}>
        <Image source={item.image} style={styles.img} />
        <View style={styles.viewCls}>
          <Text style={styles.text}>{item.title}</Text>
          <Text style={styles.prctext}>${item.price}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <FlatList
      data={filteredData}
      keyExtractor={item => item.id}
      style={styles.cardWrapper}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E3E3E3',
    padding: 20,
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 20,
    shadowOffset: {width: 0, height: 5},
    shadowRadius: 10,
    shadowOpacity: 0.2,
    elevation: 3,
    marginBottom: 10,
    shadowColor: 'black',
  },
  text: {
    fontSize: 27,
    fontWeight: 'bold',
    marginVertical: 10,
    width: "50%",
  },
  prctext: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#C67C4E',
  },
  img: {
    width: '100%',
    height: 200,
    borderRadius: 20,
    alignSelf: 'center',
    resizeMode: 'cover',
  },
  viewCls: {
    flexDirection: 'row',
    width:'100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#C67C4E',
    paddingHorizontal: 14,
    paddingVertical: 3,
    borderRadius: 10,
  },
  btntxt: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
  },
  cardWrapper: {
    marginBottom: 10,
  },
});

export default Cardlist;
