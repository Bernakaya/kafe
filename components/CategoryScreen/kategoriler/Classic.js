import React, { useState, useEffect } from 'react';
import { Text, View, Image, TouchableOpacity, FlatList, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import styles from './style/style2';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const icecekler = [
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
    image: 'https://arabicacoffee.com.tr/Uploads/urunler_view/americano--2-1.png',
    name: 'Americano',
    price: '65 TL',
  },
  {
    id: '4',
    image: 'https://arabicacoffee.com.tr/Uploads/urunler_view/espresso-macchiato1.png',
    name: 'Espresso Macchiato',
    price: '45 TL',
  },
  {
    id: '5',
    image: 'https://arabicacoffee.com.tr/Uploads/urunler_view/cafe-latte--flat-white--white-mocha-cortado--2-3.png',
    name: 'Flat White',
    price: '40 TL',
  },
  {
    id: '6',
    image: 'https://arabicacoffee.com.tr/Uploads/urunler_view/espresso-single-9-11zon-11zon1.png',
    name: 'Espresso Single',
    price: '40 TL',
  },
  {
    id: '7',
    image: 'https://arabicacoffee.com.tr/Uploads/urunler_view/filtre-kahve1.png',
    name: 'Filtre Kahve',
    price: '40 TL',
  },
  {
    id: '8',
    image: 'https://arabicacoffee.com.tr/Uploads/urunler_view/sutlu-filtre-kahve1.png',
    name: 'Sütlü Filtre Kahve',
    price: '40 TL',
  },
  {
    id: '9',
    image: 'https://arabicacoffee.com.tr/Uploads/urunler_view/red--black--dead-eye3.png',
    name: 'Red Eye',
    price: '40 TL',
  },
  {
    id: '10',
    image: 'https://arabicacoffee.com.tr/Uploads/urunler_view/cafe-latte--flat-white--white-mocha-cortado--2-11.png',
    name: 'Cortado',
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
      Alert.alert('Favoriler', `${item.name} favorilere eklendi! Fiyat: ${item.price}`);
    } else {
      setFavorites(favorites.filter(favItem => favItem.id !== item.id));
      Alert.alert('Favoriler', `${item.name} favorilerden çıkarıldı!`);
    }
  };

  const addToCart = (item) => {
    const existingItemIndex = cartItems.findIndex((cartItem) => cartItem.id === item.id);
    let updatedCartItems = [...cartItems];
    if (existingItemIndex !== -1) {
      updatedCartItems[existingItemIndex].quantity += 1;
    } else {
      updatedCartItems.push({ ...item, quantity: 1 });
    }
    setCartItems(updatedCartItems);
    setCartItemCount(prevCount => prevCount + 1);
  };

  const isFavorite = (itemId) => {
    return favorites.some((item) => item.id === itemId);
  };

  const viewFavorites = () => {
    navigation.navigate('Favori', { favoriItems: favorites });
  };

  const goToCart = () => {
    if (cartItems.length === 0) {
      Alert.alert(
        "Sepet Boş",
        "Sepetinizde hiçbir ürün bulunmamaktadır.",
        [{ text: "Tamam", style: "cancel" }]
      );
    } else {
      navigation.navigate('Sepetim', { cartItems: cartItems });
    }
  };

  const clearCart = () => {
    Alert.alert(
      "Sepeti Temizle",
      "Tüm ürünleri sepetten çıkarmak istiyor musunuz?",
      [
        { text: "Vazgeç", style: "cancel" },
        {
          text: "Evet",
          onPress: async () => {
            setCartItems([]);
            setCartItemCount(0);
            await AsyncStorage.setItem('cartItems', JSON.stringify([]));
            await AsyncStorage.setItem('cartItemCount', '0');
            navigation.navigate('Sepetim', { cartItems: [] });
          }
        }
      ],
      { cancelable: true }
    );
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
