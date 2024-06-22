import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UsersScreen = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const storedUsers = await AsyncStorage.getItem('users');
        if (storedUsers !== null) {
          const parsedUsers = JSON.parse(storedUsers);
          setUsers(parsedUsers);
        }
      } catch (error) {
        console.log('Kullanıcıları getirme hatası:', error);
      }
    };

    getUsers();
  }, []);

  return (
    <View>
      <Text>Tüm Kullanıcılar</Text>
      <FlatList
        data={users}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>Kullanıcı Adı: {item.username}</Text>
            <Text>E-posta: {item.email}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default UsersScreen;
