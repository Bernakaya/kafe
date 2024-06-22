import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EBD6C9',
  },
  textContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    marginHorizontal: 5,
    color: '#8b4513', // SaddleBrown
  },
  buttonsContainer: {
    marginTop: 20,
    width: '100%', // Butonların tam genişlikte olmasını sağlar
    paddingHorizontal: 20, // Butonların kenar boşluğu
  },
  button: {
    backgroundColor: '#8D6248',
    width: '100%', // Butonların tam genişlikte olmasını sağlar
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 10,
    elevation: 3, // Add elevation for a shadow effect
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
