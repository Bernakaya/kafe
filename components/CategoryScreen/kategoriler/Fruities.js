import React, { useState, useEffect } from 'react';
import { Text, View, Image, TouchableOpacity, FlatList, Alert, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import styles from './style/style2';  
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';



const icecekler = [
  {
    id: '11',
    image: 'https://arabicacoffee.com.tr/Uploads/urunler_view/baby-coco1.png',
    name: 'Baby Coco',
    price: '65 TL',
  },
  {
    id: '12',
    image: 'https://arabicacoffee.com.tr/Uploads/urunler_view/ruby-chocolate-soguk1.png',
    name: 'Ruby Chocolate',
    price: '75 TL',
  },
  {
    id: '13',
    image: 'https://arabicacoffee.com.tr/Uploads/urunler_view/cilek-cooler.png',
    name: 'Çilekli Fruities',
    price: '65 TL',
  },
  {
    id: '14',
    image: 'https://arabicacoffee.com.tr/Uploads/urunler_view/kavun-ananas-cooler1.png',
    name: 'Kavun Ananas Fruities',
    price: '45 TL',
  },
  {
    id: '15',
    image: 'https://arabicacoffee.com.tr/Uploads/urunler_view/limonata1.png',
    name: 'Limonata',
    price: '40 TL',
  },
  {
    id: '16',
    image: 'https://arabicacoffee.com.tr/Uploads/urunler_view/cilekli-limonata.png',
    name: 'Çilekli Limonata',
    price: '40 TL',
  },
  {
    id: '17',
    image: 'https://arabicacoffee.com.tr/Uploads/urunler_view/kirmizi-orman-meyveli-cooler1.png',
    name: 'Kırmızı Orman Meyveli Fruities',
    price: '40 TL',
  },
  {
    id: '18',
    image: 'https://arabicacoffee.com.tr/Uploads/urunler_view/mango-cooler1.png',
    name: 'Mangolu Fruities',
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
      console.error('Favorileri kaydetme hatası', error);
    }
  };

  const loadFavorites = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem('favorites');
      if (storedFavorites !== null) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error('Favorileri yükleme hatası', error);
    }
  };

  const saveCartItems = async () => {
    try {
      await AsyncStorage.setItem('cartItems', JSON.stringify(cartItems));
      await AsyncStorage.setItem('cartItemCount', cartItemCount.toString());
    } catch (error) {
      console.error('Sepet öğelerini kaydetme hatası', error);
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
      console.error('Sepet öğelerini yükleme hatası', error);
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