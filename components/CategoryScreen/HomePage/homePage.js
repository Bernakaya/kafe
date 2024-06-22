import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles';

const HomePage = () => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  useEffect(() => {
    Animated.timing(
      animatedValue,
      {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }
    ).start();
  }, [animatedValue]);

  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [100, 0],
  });

  const scale = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 2, 1],
  });

  const letters = ["H", "o", "ş", " ", "G", "e", "l", "d", "i", "n", "i", "z"];

  const handleLoginPress = () => {
    navigation.navigate('LoginScreen');
  };

  const handleSignUpPress = () => {
    navigation.navigate('SignUpScreen');
  };

  const buttonScale = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        {letters.map((letter, index) => (
          <Animated.Text
            key={index}
            style={{
              ...styles.text,
              transform: [{ translateY }, { scale }],
            }}
          >
            {letter}
          </Animated.Text>
        ))}
      </View>

      <View style={styles.buttonsContainer}>
        <Animated.View style={[styles.button, { transform: [{ scale: buttonScale }] }]}>
          <TouchableOpacity onPress={handleLoginPress}>
            <Text style={styles.buttonText}>Giriş Yap</Text>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View style={[styles.button, { transform: [{ scale: buttonScale }] }]}>
          <TouchableOpacity onPress={handleSignUpPress}>
            <Text style={styles.buttonText}>Üye Ol</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
};

export default HomePage;
