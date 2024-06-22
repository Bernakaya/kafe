// categoryStil.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchBar: {
    margin: 10,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 5,
  },
  categoryContainer: {
    marginTop: 10,
    marginBottom: 10,
  },
  categoryScroll: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  categoryItem: {
    marginRight: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  categoryText: {
    fontSize: 16,
    color: '#333',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  patternContainer: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  daire: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    marginBottom: 10,
  },
  patternImage: {
    width: 80,
    height: 80,
  },
  patternName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  patternPrice: {
    fontSize: 14,
    color: '#888',
    marginBottom: 5,
  },
  addToCartButton: {
    backgroundColor: '#333',
    borderRadius: 5,
    padding: 5,
    marginTop: 5,
  },
  addToCartIcon: {
    alignSelf: 'center',
  },
  favoriteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  bottomMenu: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  bottomMenuItem: {
    alignItems: 'center',
  },
  bottomMenuItemText: {
    fontSize: 12,
    marginTop: 2,
  },
  searchButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchButton: {
    backgroundColor: '#333',
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -25,
  },
  bottomMenuCartItemCountContainer: {
    position: 'absolute',
    right: -10,
    top: -10,
    backgroundColor: '#333',
    borderRadius: 10,
    padding: 2,
    paddingHorizontal: 5,
  },
  bottomMenuCartItemCount: {
    color: '#fff',
    fontSize: 12,
  },
});

export default styles;
