import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, SafeAreaView } from 'react-native';

export default function App() {
  const popularItems = [
    { id: 1, name: 'Chocolate Cake', price: '$25.99', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500' },
    { id: 2, name: 'Strawberry Cupcake', price: '$4.50', image: 'https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?w=500' },
    { id: 3, name: 'Vanilla Cream Pie', price: '$19.99', image: 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=500' },
    { id: 4, name: 'Cinnamon Roll', price: '$3.99', image: 'https://images.unsplash.com/photo-1583529245872-c37154a68bcf?w=500' },
  ];

  const categories = [
    { id: 1, name: 'Cakes', icon: '🎂' },
    { id: 2, name: 'Cookies', icon: '🍪' },
    { id: 3, name: 'Pastries', icon: '🥐' },
    { id: 4, name: 'Breads', icon: '🍞' },
    { id: 5, name: 'Donuts', icon: '🍩' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.logo}>Flowers N Creams</Text>
          <Text style={styles.subtitle}>Bakery & Cafe</Text>
        </View>

        {/* Banner */}
        <View style={styles.bannerContainer}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=1080' }} 
            style={styles.banner}
            resizeMode="cover"
          />
          <View style={styles.bannerOverlay}>
            <Text style={styles.bannerText}>Freshly Baked Everyday</Text>
            <TouchableOpacity style={styles.bannerButton}>
              <Text style={styles.bannerButtonText}>Order Now</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Categories */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
            {categories.map(category => (
              <TouchableOpacity key={category.id} style={styles.categoryItem}>
                <Text style={styles.categoryIcon}>{category.icon}</Text>
                <Text style={styles.categoryName}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Popular Items */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Popular Items</Text>
          <View style={styles.popularItemsContainer}>
            {popularItems.map(item => (
              <TouchableOpacity key={item.id} style={styles.itemCard}>
                <Image source={{ uri: item.image }} style={styles.itemImage} />
                <View style={styles.itemInfo}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemPrice}>{item.price}</Text>
                  <TouchableOpacity style={styles.addButton}>
                    <Text style={styles.addButtonText}>Add to Cart</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Special Offer */}
        <View style={styles.specialOfferContainer}>
          <Text style={styles.specialOfferTitle}>Special Offer</Text>
          <Text style={styles.specialOfferSubtitle}>Get 20% off on all orders above $30</Text>
          <Text style={styles.specialOfferCode}>Use code: SWEET20</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8F0',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    alignItems: 'center',
    marginTop: 20,
  },
  logo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#D06B61',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  bannerContainer: {
    position: 'relative',
    height: 200,
    marginBottom: 20,
  },
  banner: {
    width: '100%',
    height: '100%',
  },
  bannerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  bannerButton: {
    backgroundColor: '#D06B61',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
  },
  bannerButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  sectionContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  categoriesContainer: {
    flexDirection: 'row',
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 20,
    width: 70,
  },
  categoryIcon: {
    fontSize: 30,
    marginBottom: 5,
  },
  categoryName: {
    textAlign: 'center',
    color: '#666',
  },
  popularItemsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  itemCard: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  itemImage: {
    width: '100%',
    height: 120,
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
  addButton: {
    backgroundColor: '#D06B61',
    padding: 8,
    borderRadius: 20,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  specialOfferContainer: {
    margin: 20,
    padding: 20,
    backgroundColor: '#D06B61',
    borderRadius: 10,
    alignItems: 'center',
  },
  specialOfferTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  specialOfferSubtitle: {
    color: 'white',
    textAlign: 'center',
    marginBottom: 10,
  },
  specialOfferCode: {
    backgroundColor: 'white',
    color: '#D06B61',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    fontWeight: 'bold',
  },
});
