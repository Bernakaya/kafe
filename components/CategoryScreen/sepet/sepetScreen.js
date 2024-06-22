import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './SepetStil';

const SepetScreen = ({ route }) => {
  const [cartItems, setCartItems] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    loadCartItems();
  }, []);

  useEffect(() => {
    saveCartItems();
  }, [cartItems]);

  const loadCartItems = async () => {
    try {
      const storedCartItems = await AsyncStorage.getItem('cartItems');
      if (storedCartItems !== null) {
        setCartItems(JSON.parse(storedCartItems));
      }
    } catch (error) {
      console.error('Sepet ürünleri yüklenirken hata oluştu', error);
    }
  };

  const saveCartItems = async () => {
    try {
      await AsyncStorage.setItem('cartItems', JSON.stringify(cartItems));
      await AsyncStorage.setItem('cartItemCount', cartItems.length.toString());
    } catch (error) {
      console.error('Sepet ürünleri kaydedilirken hata oluştu', error);
    }
  };

  const increaseQuantity = (itemId) => {
    setCartItems(cartItems.map(item =>
      item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  const decreaseQuantity = (itemId, itemName, itemQuantity) => {
    if (itemQuantity === 1) {
      Alert.alert(
        `${itemName} Ürününü Sepetten Çıkarmak İstiyor Musunuz?`,
        "Bu işlem geri alınamaz.",
        [
          { text: "Vazgeç", style: "cancel" },
          {
            text: "Tamam",
            onPress: () => {
              const updatedCartItems = cartItems.filter(item => item.id !== itemId);
              setCartItems(updatedCartItems);
            }
          }
        ],
        { cancelable: true }
      );
    } else {
      setCartItems(cartItems.map(item =>
        item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item
      ));
    }
  };

  const removeFromCart = (itemId, itemName) => {
    Alert.alert(
      `${itemName} Ürününü Sepetten Çıkarmak İstiyor Musunuz?`,
      "Bu işlem geri alınamaz.",
      [
        { text: "Vazgeç", style: "cancel" },
        {
          text: "Tamam",
          onPress: () => {
            const updatedCartItems = cartItems.filter(item => item.id !== itemId);
            setCartItems(updatedCartItems);
          }
        }
      ],
      { cancelable: true }
    );
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
            await AsyncStorage.setItem('cartItems', JSON.stringify([]));
            await AsyncStorage.setItem('cartItemCount', '0');
            navigation.navigate('Sepetim', { cartItems: [] });
          }
        }
      ],
      { cancelable: true }
    );
  };

  const handleConfirm = () => {
    navigation.navigate('PaymentPage');
  };

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItemContainer}>
      <View style={styles.itemInfo}>
        <Image source={{ uri: item.image }} style={styles.image} resizeMode="contain" />
        <View>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.price}>{item.price}</Text>
        </View>
      </View>
      <View style={styles.quantityContainer}>
        <TouchableOpacity onPress={() => decreaseQuantity(item.id, item.name, item.quantity)}>
          <FontAwesome name="minus" size={20} color="#8D6248" />
        </TouchableOpacity>
        <Text style={styles.quantity}>{item.quantity}</Text>
        <TouchableOpacity onPress={() => increaseQuantity(item.id)}>
          <FontAwesome name="plus" size={20} color="#8D6248" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.removeButton} onPress={() => removeFromCart(item.id, item.name)}>
        <FontAwesome name="trash-o" size={20} color="white" style={styles.removeButtonIcon} />
      </TouchableOpacity>
    </View>
  );

  const totalPrice = cartItems.reduce((total, item) => {
    const itemPrice = item.price ? parseFloat(item.price.replace(' TL', '')) : 0;
    return total + (itemPrice * item.quantity);
  }, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sepetim</Text>
      <FlatList
        data={cartItems}
        renderItem={renderCartItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.flatListContainer}
      />

      <View style={styles.totalPriceContainer}>
        <Text style={styles.totalPrice}>Toplam Fiyat: {totalPrice.toFixed(2)} TL</Text>
      </View>
      <TouchableOpacity style={styles.clearCartButton} onPress={clearCart}>
        <Text style={styles.clearCartButtonText}>Sepeti Temizle</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
        <Text style={styles.confirmButtonText}>Sepeti Onayla</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SepetScreen;
