import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EBD6C9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '70%',
    height: 50,
    borderWidth: 1,
    borderColor: '#8D6248',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  button: {
    width: '80%',
    height: 50,
    backgroundColor: '#8D6248',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginTop:20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',


  },
  icon: {
    width: 30,
    justifyContent:'center',
    alignItems: 'center',
    marginRight: 2,
    marginBottom:20,
  },

});
