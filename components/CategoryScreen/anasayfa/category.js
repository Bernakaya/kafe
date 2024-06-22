import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, ScrollView, TextInput } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import styles from './categoryStil';
import { products } from './data'; // Importing products from the common file

const CategoryScreen = () => {
  const categories = ['Classics', 'Ice Classics', 'Tea', 'Tatlılar', 'Geleneksel', 'Fruities'];
  const [favorites, setFavorites] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [searchText, setSearchText] = useState('');
  const [filteredFavorites, setFilteredFavorites] = useState([]);
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);
  const navigation = useNavigation();

  const favoritesData = [
    {
      id: '1',
      image: 'https://arabicacoffee.com.tr/Uploads/urunler_view/cafe-latte--flat-white--white-mocha-cortado--1-1.png',
      name: 'Caffe Latte',
      price: '65 TL',
    },
    {
      id: '2',
      image: 'https://arabicacoffee.com.tr/Uploads/urunler_view/cappuccino---1--7-11zon1.png',
      name: 'Cappuccino',
      price: '75 TL',
    },
    {
      id: '3',
      image: 'https://arabicacoffee.com.tr/Uploads/urunler_view/kavun-ananas-cooler1.png',
      name: 'Kavun Ananas Fruities',
      price: '45 TL',
    },
  ];

  // Combine favoritesData and products ensuring unique ids
  const combinedData = [...favoritesData, ...products].reduce((acc, item) => {
    if (!acc.find(({ id }) => id === item.id)) {
      acc.push(item);
    }
    return acc;
  }, []);

  useEffect(() => {
    loadFavorites();
    loadCartItems();
  }, []);

  useEffect(() => {
    saveFavorites();
  }, [favorites]);

  useEffect(() => {
    saveCartItems();
  }, [cartItems, cartItemCount]);

  useEffect(() => {
    filterFavorites();
  }, [searchText]);

  const saveFavorites = async () => {
    try {
      await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
    } catch (error) {
      console.error('Error saving favorites', error);
    }
  };

  const loadFavorites = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem('favorites');
      if (storedFavorites !== null) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error('Error loading favorites', error);
    }
  };

  const saveCartItems = async () => {
    try {
      await AsyncStorage.setItem('cartItems', JSON.stringify(cartItems));
      await AsyncStorage.setItem('cartItemCount', cartItemCount.toString());
    } catch (error) {
      console.error('Error saving cart items', error);
    }
  };

  const loadCartItems = async () => {
    try {
      const storedCartItems = await AsyncStorage.getItem('cartItems');
      const storedCartItemCount = await AsyncStorage.getItem('cartItemCount');
      if (storedCartItems !== null && storedCartItemCount !== null) {
        setCartItems(JSON.parse(storedCartItems));
        setCartItemCount(parseInt(storedCartItemCount, 10));
      }
    } catch (error) {
      console.error('Error loading cart items', error);
    }
  };

  const addToFavorites = (item) => {
    const newItem = { ...item };
    setFavorites([...favorites, newItem]);
  };

  const removeFromFavorites = (itemId) => {
    setFavorites(favorites.filter((item) => item.id !== itemId));
  };

  const addToCart = (item) => {
    const existingItemIndex = cartItems.findIndex((cartItem) => cartItem.id === item.id);
    if (existingItemIndex !== -1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex].quantity += 1;
      setCartItems(updatedCartItems);
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
    setCartItemCount(cartItemCount + 1);
  };

  const isFavorite = (itemId) => {
    return favorites.some((item) => item.id === itemId);
  };

  const viewFavorites = () => {
    navigation.navigate('Favori', { favoriItems: favorites });
  };

  const goToCart = () => {
    navigation.navigate('Sepetim', { cartItems: cartItems });
  };

  const handleCategoryPress = (category) => {
    if (category === 'Classics') {
      navigation.navigate('Classics', { items: combinedData });
    } else if (category === 'Ice Classics') {
      navigation.navigate('IceClassic', { items: combinedData });
    } else if (category === 'Tatlılar') {
      navigation.navigate('Tatlılar', { items: combinedData });
    } else if (category === 'Tea') {
      navigation.navigate('Tea', { items: combinedData });
    } else if (category === 'Geleneksel') {
      navigation.navigate('Geleneksel', { items: combinedData });
    } else if (category === 'Fruities') {
      navigation.navigate('Fruities', { items: combinedData });
    }
  };

  const filterFavorites = () => {
    const filteredData = combinedData.filter(item =>
      item.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredFavorites(filteredData);
  };

  const toggleSearchBar = () => {
    setIsSearchBarVisible(!isSearchBarVisible);
  };

  return (
    <View style={styles.container}>
      {isSearchBarVisible && (
        <View style={styles.searchBar}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
      )}
      <View style={styles.categoryContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryScroll}>
          {categories.map((category) => (
            <TouchableOpacity key={category} style={styles.categoryItem} onPress={() => handleCategoryPress(category)}>
              <Text style={styles.categoryText}>{category}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {searchText === '' && (
        <>
          <Text style={styles.sectionTitle}>En Çok Tercih Edilenler</Text>
          <FlatList
            data={favoritesData}
            renderItem={({ item }) => (
              <View style={styles.patternContainer}>
                <View style={styles.daire}>
                  <Image source={{ uri: item.image }} style={styles.patternImage} resizeMode="contain" />
                </View>
                <Text style={styles.patternName}>{item.name}</Text>
                <Text style={styles.patternPrice}>{item.price}</Text>
                <TouchableOpacity
                  style={styles.addToCartButton}
                  onPress={() => addToCart(item)}
                >
                  <FontAwesome name="plus" size={20} color="#fff" style={styles.addToCartIcon} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.favoriteButton}
                  onPress={() => (isFavorite(item.id) ? removeFromFavorites(item.id) : addToFavorites(item))}
                >
                  <FontAwesome name={isFavorite(item.id) ? 'heart' : 'heart-o'} size={25} color={isFavorite(item.id) ? 'red' : 'black'} />
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={(item) => item.id}
            numColumns={2}
            showsVerticalScrollIndicator={false}
          />
        </>
      )}

      {searchText !== '' && (
        <FlatList
          data={filteredFavorites}
          renderItem={({ item }) => (
            <View style={styles.patternContainer}>
              <View style={styles.daire}>
                <Image source={{ uri: item.image }} style={styles.patternImage} resizeMode="contain" />
              </View>
              <Text style={styles.patternName}>{item.name}</Text>
              <Text style={styles.patternPrice}>{item.price}</Text>
              <TouchableOpacity
                style={styles.addToCartButton}
                onPress={() => addToCart(item)}
              >
                <FontAwesome name="plus" size={20} color="#fff" style={styles.addToCartIcon} />
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item) => item.id}
          numColumns={2}
          showsVerticalScrollIndicator={false}
        />
      )}

      <View style={styles.bottomMenu}>
        <TouchableOpacity style={styles.bottomMenuItem} onPress={viewFavorites}>
          <FontAwesome name="heart" size={20} color="#333" />
          <Text style={styles.bottomMenuItemText}>Favorilerim</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.searchButtonContainer} onPress={toggleSearchBar}>
          <View style={styles.searchButton}>
            <FontAwesome name="search" size={20} color="#fff" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.bottomMenuItem} onPress={goToCart}>
          <FontAwesome name="shopping-cart" size={20} color="#333" />
          <Text style={styles.bottomMenuItemText}>Sepetim</Text>
          {cartItemCount > 0 && (
            <View style={styles.bottomMenuCartItemCountContainer}>
              <Text style={styles.bottomMenuCartItemCount}>{cartItemCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CategoryScreen;
