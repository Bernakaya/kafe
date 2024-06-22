import React, { useState, useEffect } from 'react';
import { Text, View, Image, TouchableOpacity, FlatList, Alert, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import styles from './style/style2';  
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const icecekler = [
  {
    id: '32',
    image: 'https://arabicacoffee.com.tr/Uploads/urunler_view/limonlu-cheesecake1.png',
   name: 'Limonlu Cheesecake',
    price: '65 TL',
  },
  {
    id: '33',
    image: 'https://arabicacoffee.com.tr/Uploads/urunler_view/mosaik-pasta1.png',
   name: 'Mozaik Pasta',
    price: '75 TL',
  },
  {
    id: '34',
    image: 'https://arabicacoffee.com.tr/Uploads/urunler_view/red-velvet1.png',
   name: 'Red Velvet',
    price: '65 TL',
  },
  {
    id: '35',
    image: 'https://arabicacoffee.com.tr/Uploads/urunler_view/tiramisu1.png',
   name: 'Tiramisu',
    price: '45 TL',
  },
  {
    id: '36',
    image: 'https://arabicacoffee.com.tr/Uploads/urunler_view/41.png',
   name: 'Purple Velvet',
    price: '40 TL',
  },
  {
    id: '37',
    image: 'https://arabicacoffee.com.tr/Uploads/urunler_view/san-sebastian-kucuk.png',
   name: 'Cheesecake San Sebastian',
    price: '40 TL',
  },
  {
    id: '38',
    image: 'https://arabicacoffee.com.tr/Uploads/urunler_view/19-kucuk.png',
   name: 'Cookie Dark Chocolate',
    price: '40 TL',
  },
  {
    id: '39',
    image: 'https://arabicacoffee.com.tr/Uploads/urunler_view/18-kucuk.png',
   name: ' Cookie Drop',
    price: '40 TL',
  },
  {
    id: '40',
    image: 'https://arabicacoffee.com.tr/Uploads/urunler_view/17911d2a-b845-44d0-bf03-e5a5b2e6058a.jpg',
   name: 'Beyaz Çikolatalı Brownie',
    price: '40 TL',
  },
  {
    id: '41',
    image: 'https://arabicacoffee.com.tr/Uploads/urunler_view/karamelli-cheesecake-kucuk.png',
   name: 'Cheesecake Karamelli Fıstıklı',
    price: '40 TL',
  },
];

export default function App() {
  const [favorites, setFavorites] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [cartItemCount, setCartItemCount] = useState(0);
  const navigation = useNavigation();

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
      if (storedCartItems !== null) {
        setCartItems(JSON.parse(storedCartItems));
      }
      if (storedCartItemCount !== null) {
        setCartItemCount(parseInt(storedCartItemCount, 10));
      }
    } catch (error) {
      console.error('Error loading cart items', error);
    }
  };

  const addToFavorites = (item) => {
    if (!favorites.some(favItem => favItem.id === item.id)) {
      setFavorites([...favorites, item]);
      Alert.alert('Favoriler', `${item.name} favorilere eklendi!`);
    } else {
      setFavorites(favorites.filter(favItem => favItem.id !== item.id));
      Alert.alert('Favoriler', `${item.name} favorilerden çıkarıldı!`);
    }
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

  const renderIcecekler = ({ item }) => (
    <View key={item.id} style={styles.icecekContainer}>
      <View style={styles.daire}>
        <Image
          source={{ uri: item.image }}
          style={styles.patternImage}
          resizeMode='contain'
        />
      </View>
      <Text style={styles.patternName}>{item.name}</Text>
      <Text style={styles.patternPrice}>{item.price}</Text>
      <TouchableOpacity onPress={() => addToCart(item)} style={styles.addToCartButton}>
        <Text style={styles.buttonText}>Sepete Ekle</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => addToFavorites(item)} style={styles.favoriteButton}>
        <FontAwesome name={isFavorite(item.id) ? 'heart' : 'heart-o'} size={25} color={isFavorite(item.id) ? 'red' : 'black'} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
     

      <FlatList
        data={icecekler}
        renderItem={renderIcecekler}
        keyExtractor={(item) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
      />
      
      <View style={styles.bottomMenu}>
      <TouchableOpacity style={styles.bottomMenuItem} onPress={viewFavorites}>
          <FontAwesome name="heart" size={20} color="#333" />
          <Text style={styles.bottomMenuItemText}>Favoriler</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomMenuItem} onPress={goToCart}>
          <FontAwesome name="shopping-cart" size={20} color="#333" />
          {cartItemCount > 0 && (
            <View style={styles.cartItemCountContainer}>
              <Text style={styles.cartItemCountText}>{cartItemCount}</Text>
            </View>
          )}
          <Text style={styles.bottomMenuItemText}>Sepete Git</Text>
        </TouchableOpacity>
     
      </View>
    </View>
  );
}