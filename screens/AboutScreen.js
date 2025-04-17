import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, SafeAreaView, Linking } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';

const AboutScreen = () => {
  const navigation = useNavigation();
  
  const openInstagram = () => {
    Linking.openURL('https://www.instagram.com/flowers_n_creams/');
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>About Us</Text>
      </View>
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.logoContainer}>
          <Image 
            source={require('../assets/images/flowers_n_creams_logo.png')} 
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Our Story</Text>
          <Text style={styles.paragraph}>
            Flowers N Creams Bakery was founded in 2015 with a simple mission: to create delicious, 
            handcrafted baked goods using only the finest ingredients. What started as a small 
            family-owned bakery has grown into a beloved establishment known for its 
            exceptional quality and unique flavors.
          </Text>
          <Text style={styles.paragraph}>
            Our passion is to bring joy through our baking, combining traditional recipes with 
            innovative creations that delight our customers. Each item is made fresh daily with 
            love and attention to detail.
          </Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Our Values</Text>
          <View style={styles.valueItem}>
            <Text style={styles.valueTitle}>Quality Ingredients</Text>
            <Text style={styles.valueDescription}>
              We source the finest ingredients, supporting local farmers and suppliers whenever possible.
            </Text>
          </View>
          <View style={styles.valueItem}>
            <Text style={styles.valueTitle}>Handcrafted Excellence</Text>
            <Text style={styles.valueDescription}>
              Every item is carefully crafted by our skilled bakers, ensuring perfection in every bite.
            </Text>
          </View>
          <View style={styles.valueItem}>
            <Text style={styles.valueTitle}>Community Focus</Text>
            <Text style={styles.valueDescription}>
              We're proud to be part of our local community, participating in events and supporting local causes.
            </Text>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Visit Us</Text>
          <View style={styles.contactItem}>
            <Text style={styles.contactTitle}>Address:</Text>
            <Text style={styles.contactInfo}>123 Bakery Lane, Sweetville, CA 90210</Text>
          </View>
          <View style={styles.contactItem}>
            <Text style={styles.contactTitle}>Hours:</Text>
            <Text style={styles.contactInfo}>Monday - Friday: 7:00 AM - 7:00 PM</Text>
            <Text style={styles.contactInfo}>Saturday - Sunday: 8:00 AM - 5:00 PM</Text>
          </View>
          <View style={styles.contactItem}>
            <Text style={styles.contactTitle}>Phone:</Text>
            <Text style={styles.contactInfo}>(555) 123-4567</Text>
          </View>
        </View>
        
        <View style={styles.socialSection}>
          <Text style={styles.sectionTitle}>Follow Us</Text>
          <TouchableOpacity style={styles.socialButton} onPress={openInstagram}>
            <Text style={styles.socialButtonText}>Visit our Instagram</Text>
          </TouchableOpacity>
          <Text style={styles.socialHandle}>@flowers_n_creams</Text>
          
          <View style={styles.imageGrid}>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500' }} 
              style={styles.gridImage}
            />
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?w=500' }} 
              style={styles.gridImage}
            />
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=500' }} 
              style={styles.gridImage}
            />
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1583529245872-c37154a68bcf?w=500' }} 
              style={styles.gridImage}
            />
          </View>
        </View>
        
        <TouchableOpacity 
          style={styles.orderButton}
          onPress={() => navigation.navigate('Catalog')}
        >
          <Text style={styles.orderButtonText}>Browse Our Products</Text>
        </TouchableOpacity>
      </ScrollView>
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
  scrollView: {
    flex: 1,
  },
  logoContainer: {
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 200,
    height: 100,
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0E4D7',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  paragraph: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginBottom: 15,
  },
  valueItem: {
    marginBottom: 15,
  },
  valueTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#D06B61',
    marginBottom: 5,
  },
  valueDescription: {
    fontSize: 15,
    color: '#666',
    lineHeight: 22,
  },
  contactItem: {
    marginBottom: 15,
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  contactInfo: {
    fontSize: 15,
    color: '#666',
    lineHeight: 22,
  },
  socialSection: {
    padding: 20,
  },
  socialButton: {
    backgroundColor: '#D06B61',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 10,
  },
  socialButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  socialHandle: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridImage: {
    width: '48%',
    height: 120,
    borderRadius: 10,
    marginBottom: 10,
  },
  orderButton: {
    backgroundColor: '#D06B61',
    paddingVertical: 15,
    marginHorizontal: 20,
    marginBottom: 30,
    borderRadius: 10,
    alignItems: 'center',
  },
  orderButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AboutScreen; 