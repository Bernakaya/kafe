import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const itemWidth = (width - 30) / 2; 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  sectionTitle: {
    fontSize: 25,
    margin: 20,
  },
  icecekContainer: {
    width: itemWidth,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    margin: 5,
    padding: 10,
    alignItems: 'center',
  },
  daire: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  patternImage: {
    width: 60,
    height: 60,
  },
  patternName: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  patternPrice: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginBottom: 10,
  },
  addToCartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#8D6248',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 30,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
  },
  favoriteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  bottomMenu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  bottomMenuItem: {
    alignItems: 'center',
    marginHorizontal: 50,
    position: 'relative', // Added to enable absolute positioning of the cart item count
  },
  bottomMenuItemText: {
    fontSize: 12,
    color: '#333',
  },
  cartItemCountContainer: {
    position: 'absolute',
    top: -5,
    right: -10,
    backgroundColor: '#8D6248',
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartItemCountText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  categoryScroll: {
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  categoryItem: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginHorizontal: 5,
    minWidth: 80,
    height: 30,
  },
  categoryText: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
});

export default styles;
