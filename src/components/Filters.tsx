import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Filters = ({ onFilterChange }) => {
  const [selectedTab, setSelectedTab] = useState(0); 

  const filters = ['All coffee', 'Machiato', 'Latte', 'American']; 
  const handleFilterPress = (filter, index) => {
    setSelectedTab(index);
    onFilterChange(filter === 'All coffee' ? null : filter); 
  };
  return (
    <View style={styles.container}>
      {filters.map((filter, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.tab,
            selectedTab === index && styles.selectedTab, 
          ]}
          onPress={() => handleFilterPress(filter, index)}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === index && styles.selectedTabText, 
            ]}
          >
            {filter}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Filters;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around', 
    marginTop: 110,
    paddingHorizontal: 30,
    marginBottom:10
  },
  tab: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  selectedTab: {
    backgroundColor: '#C67C4E',
  },
  tabText: {
    color: 'black',
    fontSize: 16,
    fontWeight: '500',
  },
  selectedTabText: {
    color: 'white',
  },
});
