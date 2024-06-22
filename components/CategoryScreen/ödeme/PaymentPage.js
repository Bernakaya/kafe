import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import PaymentPageStyles from './PaymentPageStyles';

const PaymentPage = ({ navigation }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [nameOnCard, setNameOnCard] = useState('');

  const handlePayment = () => {
    Alert.alert('Ödeme Tamamlandı', 'Ödeme işlemi başarıyla tamamlandı.', [
      { text: 'Anasayfaya Git', onPress: () => navigation.navigate('Home') }
    ]);
  };

  return (
    <View style={PaymentPageStyles.container}>
    

      <View style={PaymentPageStyles.cardContainer}>
        <Image 
          source={{ uri: 'https://via.placeholder.com/300x200' }} 
          style={PaymentPageStyles.cardImage} 
        />
        <Text style={PaymentPageStyles.title}>Kart Bilgileri</Text>
        
        <View style={PaymentPageStyles.inputContainer}>
          <TextInput
            style={PaymentPageStyles.input}
            placeholder="Card Number"
            keyboardType="numeric"
            value={cardNumber}
            onChangeText={setCardNumber}
          />
        </View>
        
        <View style={PaymentPageStyles.inputContainer}>
          <TextInput
            style={PaymentPageStyles.input}
            placeholder="Expiry Date (MM/YY)"
            keyboardType="numeric"
            value={expiryDate}
            onChangeText={setExpiryDate}
          />
        </View>
        
        <View style={PaymentPageStyles.inputContainer}>
          <TextInput
            style={PaymentPageStyles.input}
            placeholder="CVV"
            keyboardType="numeric"
            secureTextEntry={true}
            value={cvv}
            onChangeText={setCvv}
          />
        </View>
        
        <View style={PaymentPageStyles.inputContainer}>
          <TextInput
            style={PaymentPageStyles.input}
            placeholder="Name on Card"
            value={nameOnCard}
            onChangeText={setNameOnCard}
          />
        </View>
        
        <TouchableOpacity onPress={handlePayment} style={PaymentPageStyles.button}>
          <Text style={PaymentPageStyles.buttonText}>Ödemeyi Tamamla</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PaymentPage;
