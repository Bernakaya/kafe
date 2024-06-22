import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './favoristyle';

const FavoriScreen = ({ route, navigation }) => {
  const [favoriItems, setFavoriItems] = useState(route.params.favoriItems || []);
  const [cartItems, setCartItems] = useState([]);
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    loadFavorites();
    loadCartItems();
  }, []);

  useEffect(() => {
    saveFavorites(favoriItems);
  }, [favoriItems]);

  useEffect(() => {
    saveCartItems();
  }, [cartItems, cartItemCount]);

  const saveFavorites = async (favorites) => {
    try {
      await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
    } catch (error) {
      console.error('Error saving favorites', error);
    }
  };

  const loadFavorites = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem('favorites');
      if (storedFavorites) {
        setFavoriItems(JSON.parse(storedFavorites));
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
      if (storedCartItems) {
        setCartItems(JSON.parse(storedCartItems));
      }
      if (storedCartItemCount) {
        setCartItemCount(parseInt(storedCartItemCount, 10));
      }
    } catch (error) {
      console.error('Error loading cart items', error);
    }
  };

  const addToCart = (item) => {
    const updatedCartItems = [...cartItems];
    const itemIndex = updatedCartItems.findIndex(cartItem => cartItem.id === item.id);

    if (itemIndex !== -1) {
      updatedCartItems[itemIndex].quantity += 1;
    } else {
      updatedCartItems.push({ ...item, quantity: 1 });
    }

    setCartItems(updatedCartItems);
    setCartItemCount(cartItemCount + 1);
    Alert.alert('Sepet', `${item.name} sepete eklendi!`);
  };

  const removeFromFavorites = (itemId) => {
    const updatedFavorites = favoriItems.filter(item => item.id !== itemId);
    setFavoriItems(updatedFavorites);
    saveFavorites(updatedFavorites);
    Alert.alert('Favoriler', 'Ürün favorilerden kaldırıldı.');
  };

  const goToCart = () => {
    navigation.navigate('Sepetim', { cartItems: cartItems });
  };

  const renderFavoriItem = ({ item }) => {
    let price = '0.00';
    if (item.price) {
      price = parseFloat(item.price.replace(' TL', '')).toFixed(2);
    }

    return (
      <View style={styles.cartItemContainer}>
        <View style={styles.itemInfo}>
          <Image source={{ uri: item.image }} style={styles.image} resizeMode="contain" />
          <View>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>{price} TL</Text>
          </View>
        </View>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={styles.buttonSpacing}
            onPress={() => addToCart(item)}
          >
            <FontAwesome name="plus" size={20} color="#8D6248" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonSpacing}
            onPress={() => removeFromFavorites(item.id)}
          >
            <FontAwesome name="trash-o" size={20} color="#8D6248" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
  <Text style={styles.title}>Favorilerim</Text>
  <FlatList
    data={favoriItems}
    renderItem={renderFavoriItem}
    keyExtractor={(item) => item.id.toString()}
    contentContainerStyle={styles.flatListContainer}
  />
  <View style={styles.bottomMenu}>
    <TouchableOpacity style={styles.bottomMenuItem} onPress={() => navigation.navigate('Category')}>
      <FontAwesome name="home" size={20} color="#333" />
      <Text style={styles.bottomMenuItemText}>Ana Sayfa</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.bottomMenuItem} onPress={goToCart}>
      <FontAwesome name="shopping-cart" size={20} color="#333" />
      <Text style={styles.bottomMenuItemText}>Sepetim</Text>
      {cartItemCount > 0 && (
        <View style={styles.bottomMenuCartItemCount}>
          <Text style={styles.bottomMenuCartItemCountText}>{cartItemCount}</Text>
        </View>
      )}
    </TouchableOpacity>
  </View>
</View>

  );
};

export default FavoriScreen;
