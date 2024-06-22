import AsyncStorage from '@react-native-async-storage/async-storage';

// Kullanıcı oturum bilgilerini saklamak için anahtarlar
const USER_SESSION_KEY = 'user_session';
const USERNAME_KEY = 'username';

// Kullanıcı giriş işlemi
const loginUser = async (username, password) => {
  try {
    // Kullanıcı bilgilerini bir nesne olarak sakla
    const userSession = { username, loggedIn: true };
    // Async storage'e kullanıcı oturum bilgilerini kaydet
    await AsyncStorage.setItem(USER_SESSION_KEY, JSON.stringify(userSession));
    // Kullanıcı adını da ayrıca sakla
    await AsyncStorage.setItem(USERNAME_KEY, username);
    // Giriş başarılı olduğunu belirt
    return { success: true, message: 'Giriş başarılı' };
  } catch (error) {
    // Hata durumunda hata mesajını döndür
    return { success: false, message: 'Giriş yapılamadı. Lütfen tekrar deneyin.' };
  }
};

// Kullanıcı oturumunu kontrol et
const checkUserSession = async () => {
  try {
    // Async storage'den kullanıcı oturum bilgilerini al
    const userSession = await AsyncStorage.getItem(USER_SESSION_KEY);
    // Kullanıcı oturumu varsa doğrudan oturum verisini döndür
    if (userSession !== null) {
      return JSON.parse(userSession);
    } else {
      return null;
    }
  } catch (error) {
    // Hata durumunda null döndür
    return null;
  }
};

// Kullanıcı oturumunu sonlandır
const logoutUser = async () => {
  try {
    // Async storage'den kullanıcı oturum bilgilerini sil
    await AsyncStorage.removeItem(USER_SESSION_KEY);
    await AsyncStorage.removeItem(USERNAME_KEY);
    return { success: true, message: 'Çıkış başarılı' };
  } catch (error) {
    // Hata durumunda hata mesajını döndür
    return { success: false, message: 'Çıkış yapılamadı. Lütfen tekrar deneyin.' };
  }
};

// Kullanıcının oturumda olup olmadığını kontrol etmek için bir bileşen
import React, { useEffect } from 'react';
import { View, Text } from 'react-native';

const UserSessionChecker = () => {
  useEffect(() => {
    checkUserSession().then((userSession) => {
      if (userSession) {
        // Oturum açık ise, kullanıcı bilgilerini kontrol etmek için başka bir eylem yapabilirsiniz.
        console.log('Kullanıcı oturumda:', userSession.username);
      } else {
        console.log('Kullanıcı oturumda değil');
      }
    });
  }, []);

  return (
    <View>
      <Text>User Session Checker</Text>
    </View>
  );
};

export default UserSessionChecker;
