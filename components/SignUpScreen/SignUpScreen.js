
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './SignUpStil';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignUpScreen = () => {
  const navigation = useNavigation();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignUp = async () => {
    if (!username || !email || !password) {
      setErrorMessage('Lütfen tüm alanları doldurun.');
      return;
    }

    if (!emailIsValid(email)) {
      setErrorMessage('Geçerli bir e-posta adresi girin.');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('Şifre en az 6 karakter olmalıdır.');
      return;
    }

    try {
      const existingUsers = await AsyncStorage.getItem('users');
      let users = [];
      if (existingUsers) {
        users = JSON.parse(existingUsers);

        if (users.some(user => user.username === username)) {
          setErrorMessage('Bu kullanıcı adı zaten kullanımda.');
          return;
        }
        if (users.some(user => user.email === email)) {
          setErrorMessage('Bu e-posta adresi zaten kullanımda.');
          return;
        }
      }

     
      const newUser = { username, email, password };
      const updatedUsers = [...users, newUser];
      await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));
      console.log('Kullanıcı başarıyla kaydedildi:', newUser);

      navigation.navigate('Category');
    } catch (error) {
      setErrorMessage('Bir hata oluştu. Lütfen tekrar deneyin.');
      console.log('Kayıt hatası:', error);
    }
  };

  const emailIsValid = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  return (
    <View style={styles.container}>
      {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}

      <View style={styles.inputContainer}>
        <FontAwesome name="user" size={25} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Kullanıcı Adı"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
          keyboardType="default"
          autoCompleteType="username"
          textContentType="username"
        />
      </View>

      <View style={styles.inputContainer}>
        <FontAwesome name="envelope" size={20} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="E-posta"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.inputContainer}>
        <FontAwesome name="lock" size={27} color="black" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Şifre"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>ÜYE Ol</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUpScreen;
