// LoginScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './loginStil';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
  const navigation = useNavigation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (username.trim() === '' || password.trim() === '') {
      Alert.alert('Hata', 'Kullanıcı adı ve şifre alanlarını doldurun');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Hata', 'Şifre en az 6 karakter olmalıdır');
      return;
    }

    try {

      const storedUser = await AsyncStorage.getItem('users');
      if (storedUser !== null) {
        const users = JSON.parse(storedUser);
        const foundUser = users.find(user => user.username === username && user.password === password);
        if (foundUser) {
          console.log('Giriş başarılı');
          navigation.navigate('Category');
          return;
        }
      }
      Alert.alert('Hata', 'Kullanıcı adı veya şifre hatalı');
    } catch (error) {
      console.log('Giriş hatası:', error);
      Alert.alert('Hata', 'Giriş yapılırken bir hata oluştu');
    }
  };

  const handleForgotPassword = () => {
    Alert.alert('Şifremi Unuttum', 'Şifrenizi sıfırlamak için e-posta adresinizi girin.', [
      { text: 'İptal', style: 'cancel' },
      { text: 'Gönder', onPress: () => resetPassword() }
    ]);
  };

  const resetPassword = () => {

    Alert.alert('Başarılı', 'Şifre sıfırlama bağlantısı e-posta adresinize gönderildi.');
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <FontAwesome name="user" size={25} color="#8D6248" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Kullanıcı Adı"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />
      </View>

      <View style={styles.inputContainer}>
        <FontAwesome name="lock" size={25} color="#8D6248" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Şifre"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Giriş Yap</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={styles.forgotPassword}>Şifremi Unuttum</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
