import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import APP from './components/CategoryScreen/HomePage/homePage'; 
import LoginScreen from './components/LoginScreen/loginScreen'; 
import SignUpScreen from './components/SignUpScreen/SignUpScreen'; 
import Category from './components/CategoryScreen/anasayfa/category';
import UsersScreen from './components/UsersScreen';
import FavoriScreen from './components/CategoryScreen/favori/favoriScreen';
import SepetScreen from './components/CategoryScreen/sepet/sepetScreen';
import PaymentPage from './components/CategoryScreen/ödeme/PaymentPage';
import ClassicsScreen from './components/CategoryScreen/kategoriler/Classic';
import IceClassic from './components/CategoryScreen/kategoriler/IceClassic';
import Tatlılar from'./components/CategoryScreen/kategoriler/Tatlılar';
import Tea from './components/CategoryScreen/kategoriler/Tea';
import Geleneksel from './components/CategoryScreen/kategoriler/Geleneksel';
import Fruities from './components/CategoryScreen/kategoriler/Fruities';


const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator  
        screenOptions={{
          headerStyle: {
            backgroundColor: '#EBD6C9', 
          },
          headerTintColor: '#fff', 
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
           <Stack.Screen name="Home"  component={APP} options={{ headerShown: false }}  />
                <Stack.Screen name="Category" component={Category} />

  
       
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
        <Stack.Screen name="Users" component={UsersScreen} /> 
        <Stack.Screen name="Favori" component={FavoriScreen} /> 
        <Stack.Screen name="Sepetim" component={SepetScreen} /> 
        <Stack.Screen name="PaymentPage" component={PaymentPage} /> 
        <Stack.Screen name="Classics" component={ClassicsScreen} options={{ title: 'Classics' }} />
        <Stack.Screen name="IceClassic" component={IceClassic} />
        <Stack.Screen name="Tatlılar" component={Tatlılar} />
        <Stack.Screen name="Tea" component={Tea} />
        <Stack.Screen name="Geleneksel" component={Geleneksel} />
        <Stack.Screen name="Fruities" component={Fruities} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
