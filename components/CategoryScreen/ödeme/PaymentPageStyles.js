import { StyleSheet } from 'react-native';

const PaymentPageStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // light pink background
    alignItems: 'center',
    paddingTop: 130,
  },
  cardContainer: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 15,
    elevation: 5,
  },
  cardImageContainer: {
    width: '100%',
    height: 200,
    borderRadius: 15,
    backgroundColor: '#F48FB1',
    padding: 20,
    justifyContent: 'space-between',
  },
  cardText: {
    color: '#fff',
    fontSize: 18,
  },
  inputContainer: {
    width: '80%',
    marginVertical: 10,
  },
  input: {
    height: 50,
    borderColor: '#8D6248', 
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: '#FFF', 
  },
  button: {
    marginTop: 20,
    width: '80%',
    height: 50,
    backgroundColor: '#8D6248', 
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFF', // white text color
    fontSize: 18,
    fontWeight: 'bold',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
    marginBottom: 20,
  },
  tabText: {
    fontSize: 16,
    paddingVertical: 10,
    color: '#888',
  },
  activeTabText: {
    color: '#E91E63',
    borderBottomWidth: 2,
    borderBottomColor: '#E91E63',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#8D6248',
    marginBottom: 10,
  }
});

export default PaymentPageStyles;
