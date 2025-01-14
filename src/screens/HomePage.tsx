import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Banner from '../components/Banner';
import Filters from '../components/Filters';
import Cardlist from '../components/Cardlist';
import Footer from '../components/Footer';

const HomePage = () => {
  const [selectedFilter, setSelectedFilter] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = query => {
    setSearchQuery(query); 
  };
  return (
    <>
      <View style={styles.container}>
        <Banner onSearch={handleSearch} />
        <Filters onFilterChange={setSelectedFilter} />
        <Cardlist filter={selectedFilter} searchQuery={searchQuery} />
        <Footer />
      </View>
    </>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
