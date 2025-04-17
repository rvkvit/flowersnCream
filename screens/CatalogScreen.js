import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity, SafeAreaView, TextInput } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation, useRoute } from '@react-navigation/native';

const CatalogScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const selectedCategory = route.params?.category;
  
  const [searchText, setSearchText] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState(selectedCategory?.id || null);
  
  const bakeryItems = [
    { id: 1, name: 'Chocolate Cake', price: '$25.99', category: 1, image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500', 
      description: 'Rich, moist chocolate cake with a velvety smooth ganache frosting. Perfect for chocolate lovers.' },
    { id: 2, name: 'Strawberry Cupcake', price: '$4.50', category: 1, image: 'https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?w=500',
      description: 'Light vanilla cupcake topped with fresh strawberry buttercream and a strawberry slice.' },
    { id: 3, name: 'Vanilla Cream Pie', price: '$19.99', category: 1, image: 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=500',
      description: 'Smooth vanilla custard in a buttery crust, topped with whipped cream and vanilla bean specks.' },
    { id: 4, name: 'Cinnamon Roll', price: '$3.99', category: 3, image: 'https://images.unsplash.com/photo-1583529245872-c37154a68bcf?w=500',
      description: 'Soft, fluffy rolls with a cinnamon-sugar filling and cream cheese frosting.' },
    { id: 5, name: 'Red Velvet Cake', price: '$28.99', category: 1, image: 'https://images.unsplash.com/photo-1586788224331-947f68671cf1?w=500',
      description: 'Classic red velvet cake with cream cheese frosting, a perfect blend of cocoa and vanilla.' },
    { id: 6, name: 'Macarons', price: '$2.50', category: 2, image: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=500',
      description: 'Delicate almond meringue cookies with a variety of filling flavors.' },
    { id: 7, name: 'Sourdough Bread', price: '$5.99', category: 4, image: 'https://images.unsplash.com/photo-1585478259715-4857180e83fc?w=500',
      description: 'Artisan sourdough bread with a crispy crust and chewy interior.' },
    { id: 8, name: 'Chocolate Chip Cookies', price: '$1.99', category: 2, image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=500',
      description: 'Classic chocolate chip cookies with crispy edges and soft centers.' },
    { id: 9, name: 'Croissant', price: '$3.50', category: 3, image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=500',
      description: 'Buttery, flaky croissants baked to golden perfection.' },
    { id: 10, name: 'Glazed Donuts', price: '$1.50', category: 5, image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=500',
      description: 'Light and airy donuts with a sweet glaze.' },
    { id: 11, name: 'Baguette', price: '$3.99', category: 4, image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc7b?w=500',
      description: 'Traditional French baguette with a crunchy crust and soft interior.' },
    { id: 12, name: 'Chocolate Donuts', price: '$2.25', category: 5, image: 'https://images.unsplash.com/photo-1527904324834-3bda86da6771?w=500',
      description: 'Chocolate cake donuts topped with chocolate glaze and sprinkles.' },
  ];
  
  const categories = [
    { id: null, name: 'All' },
    { id: 1, name: 'Cakes', icon: '🎂' },
    { id: 2, name: 'Cookies', icon: '🍪' },
    { id: 3, name: 'Pastries', icon: '🥐' },
    { id: 4, name: 'Breads', icon: '🍞' },
    { id: 5, name: 'Donuts', icon: '🍩' },
  ];
  
  useEffect(() => {
    filterItems();
  }, [searchText, activeCategory]);
  
  const filterItems = () => {
    let items = bakeryItems;
    
    // Filter by category
    if (activeCategory !== null) {
      items = items.filter(item => item.category === activeCategory);
    }
    
    // Filter by search text
    if (searchText.trim() !== '') {
      const searchLowerCase = searchText.toLowerCase();
      items = items.filter(item => 
        item.name.toLowerCase().includes(searchLowerCase) || 
        item.description.toLowerCase().includes(searchLowerCase)
      );
    }
    
    setFilteredItems(items);
  };
  
  const handleItemPress = (item) => {
    navigation.navigate('OrderDetails', { item });
  };
  
  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.itemCard}
      onPress={() => handleItemPress(item)}
    >
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>{item.price}</Text>
        <TouchableOpacity 
          style={styles.viewButton}
          onPress={() => handleItemPress(item)}
        >
          <Text style={styles.viewButtonText}>View Details</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Our Catalog</Text>
      </View>
      
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for items..."
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>
      
      <View style={styles.categoriesContainer}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={categories}
          keyExtractor={(item) => item.id?.toString() || 'all'}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.categoryButton,
                activeCategory === item.id ? styles.activeCategoryButton : null
              ]}
              onPress={() => setActiveCategory(item.id)}
            >
              <Text style={[
                styles.categoryButtonText,
                activeCategory === item.id ? styles.activeCategoryButtonText : null
              ]}>
                {item.icon ? `${item.icon} ${item.name}` : item.name}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
      
      <FlatList
        data={filteredItems}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No items found</Text>
            <TouchableOpacity 
              style={styles.resetButton}
              onPress={() => {
                setSearchText('');
                setActiveCategory(null);
              }}
            >
              <Text style={styles.resetButtonText}>Reset Filters</Text>
            </TouchableOpacity>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8F0',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0E4D7',
  },
  backButton: {
    padding: 5,
  },
  backButtonText: {
    fontSize: 16,
    color: '#D06B61',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 30,
  },
  searchContainer: {
    padding: 15,
  },
  searchInput: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#F0E4D7',
  },
  categoriesContainer: {
    paddingHorizontal: 15,
    marginBottom: 5,
  },
  categoryButton: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#F0E4D7',
  },
  activeCategoryButton: {
    backgroundColor: '#D06B61',
    borderColor: '#D06B61',
  },
  categoryButtonText: {
    color: '#666',
  },
  activeCategoryButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  list: {
    padding: 10,
  },
  itemCard: {
    flex: 1,
    backgroundColor: 'white',
    margin: 5,
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  itemImage: {
    width: '100%',
    height: 130,
  },
  itemInfo: {
    padding: 10,
  },
  itemName: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 5,
  },
  itemPrice: {
    color: '#D06B61',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  viewButton: {
    backgroundColor: '#D06B61',
    padding: 8,
    borderRadius: 20,
    alignItems: 'center',
  },
  viewButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
  },
  resetButton: {
    backgroundColor: '#D06B61',
    padding: 10,
    borderRadius: 20,
  },
  resetButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default CatalogScreen; 