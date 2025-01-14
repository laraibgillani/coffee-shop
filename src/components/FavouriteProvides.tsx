import React, {createContext, useContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FavouritesContext = createContext();

export const FavouritesProvider = ({children}) => {
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    const loadFavourites = async () => {
      try {
        const storedFavourites = await AsyncStorage.getItem('favourites');
        if (storedFavourites) {
          setFavourites(JSON.parse(storedFavourites));
        }
      } catch (error) {
        console.error('Failed to load favourites:', error);
      }
    };
    loadFavourites();
  }, []);

  const toggleFavourite = async item => {
    const isFavourite = favourites.some(fav => fav.id === item.id);
    const updatedFavourites = isFavourite
      ? favourites.filter(fav => fav.id !== item.id)
      : [...favourites, item];

    setFavourites(updatedFavourites);

    try {
      await AsyncStorage.setItem(
        'favourites',
        JSON.stringify(updatedFavourites),
      );
    } catch (error) {
      console.error('Failed to save favourites:', error);
    }
  };

  return (
    <FavouritesContext.Provider value={{favourites, toggleFavourite}}>
      {children}
    </FavouritesContext.Provider>
  );
};

export const useFavourites = () => useContext(FavouritesContext);