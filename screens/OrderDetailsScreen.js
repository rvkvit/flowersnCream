import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, SafeAreaView, Alert, Linking, Modal } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const OrderDetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { item } = route.params;
  
  const [quantity, setQuantity] = useState(1);
  const [showOrderOptions, setShowOrderOptions] = useState(false);
  
  // Calculate the total price based on quantity
  const calculateTotal = () => {
    const priceWithoutSymbol = item.price.replace('€', '');
    const price = parseFloat(priceWithoutSymbol);
    return (price * quantity).toFixed(2);
  };
  
  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };
  
  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const handleAddToCart = () => {
    const cartItem = {
      ...item,
      quantity: quantity
    };
    
    const existingCartItems = global.cartItems || [];
    const existingItemIndex = existingCartItems.findIndex(i => i.id === item.id);
    
    if (existingItemIndex >= 0) {
      existingCartItems[existingItemIndex].quantity += quantity;
    } else {
      existingCartItems.push(cartItem);
    }
    
    global.cartItems = existingCartItems;
    
    Alert.alert(
      "Added to Cart",
      `${quantity} ${item.name}(s) added to your cart.`,
      [
        { 
          text: "Continue Shopping",
          onPress: () => navigation.goBack()
        },
        { 
          text: "View Cart",
          onPress: () => navigation.navigate('Cart'),
          style: 'default'
        }
      ]
    );
  };
  
  const handlePlaceOrder = () => {
    setShowOrderOptions(true);
  };
  
  const orderViaOpBank = () => {
    const cartItem = {
      ...item,
      quantity: quantity
    };
    
    global.cartItems = [cartItem];
    setShowOrderOptions(false);
    navigation.navigate('Cart');
  };
  
  const orderViaWhatsApp = () => {
    const total = calculateTotal();
    const message = `Hello Flowers N Creams! I would like to order:\n\n${quantity} x ${item.name} (€${total})\n\nPlease let me know how to proceed with payment and delivery. Thank you!`;
    
    // WhatsApp Finnish number format +358 40 123 4567
    Linking.openURL(`whatsapp://send?phone=+358401234567&text=${encodeURIComponent(message)}`)
      .catch(err => {
        Alert.alert(
          'WhatsApp Not Installed',
          'Please install WhatsApp to use this feature, or choose another ordering method.',
          [{ text: 'OK' }]
        );
      });
      
    setShowOrderOptions(false);
  };
  
  const orderViaInstagram = () => {
    // Open Instagram profile and then show instructions
    Linking.openURL('https://www.instagram.com/flowers_n_creams/')
      .catch(err => {
        Alert.alert(
          'Instagram Not Installed',
          'Please install Instagram to use this feature, or choose another ordering method.',
          [{ text: 'OK' }]
        );
      });
      
    setTimeout(() => {
      Alert.alert(
        'Ordering via Instagram',
        'Please send a direct message to @flowers_n_creams with your order details.',
        [{ text: 'OK' }]
      );
    }, 1000);
    
    setShowOrderOptions(false);
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      
      {/* Header Image */}
      <View style={styles.imageContainer}>
        <Image 
          source={typeof item.image === 'string' ? { uri: item.image } : item.image} 
          style={styles.image}
          resizeMode="cover"
        />
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.detailsContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.price}>{item.price}</Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Details</Text>
          
          <View style={styles.quantityContainer}>
            <Text style={styles.quantityLabel}>Quantity:</Text>
            <View style={styles.quantityControls}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={handleDecreaseQuantity}
              >
                <Text style={styles.quantityButtonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantityValue}>{quantity}</Text>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={handleIncreaseQuantity}
              >
                <Text style={styles.quantityButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.totalContainer}>
            <Text style={styles.totalLabel}>Total:</Text>
            <Text style={styles.totalValue}>€{calculateTotal()}</Text>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Special Instructions</Text>
          <View style={styles.instructionsContainer}>
            <Text style={styles.instructionsText}>
              • Freshly baked on order day
            </Text>
            <Text style={styles.instructionsText}>
              • Custom messages available upon request
            </Text>
            <Text style={styles.instructionsText}>
              • Allergen information available at our store
            </Text>
          </View>
        </View>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.cartButton]}
            onPress={handleAddToCart}
          >
            <Ionicons name="cart" size={20} color="white" style={styles.buttonIcon} />
            <Text style={[styles.buttonText, styles.cartButtonText]}>Add to Cart</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.button, styles.orderButton]}
            onPress={handlePlaceOrder}
          >
            <Ionicons name="bag-check" size={20} color="#D06B61" style={styles.buttonIcon} />
            <Text style={[styles.buttonText, styles.orderButtonText]}>Buy Now</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      
      {/* Order Options Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showOrderOptions}
        onRequestClose={() => setShowOrderOptions(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Choose Ordering Method</Text>
              <TouchableOpacity 
                style={styles.modalCloseButton}
                onPress={() => setShowOrderOptions(false)}
              >
                <Text style={styles.modalCloseButtonText}>✕</Text>
              </TouchableOpacity>
            </View>
            
            <TouchableOpacity 
              style={styles.orderOption}
              onPress={orderViaOpBank}
            >
              <View style={styles.orderOptionIcon}>
                <Ionicons name="card-outline" size={24} color="#D06B61" />
              </View>
              <View style={styles.orderOptionTextContainer}>
                <Text style={styles.orderOptionTitle}>OP Bank Payment</Text>
                <Text style={styles.orderOptionDescription}>Pay securely online with OP Bank</Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color="#999" />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.orderOption}
              onPress={orderViaWhatsApp}
            >
              <View style={[styles.orderOptionIcon, { backgroundColor: '#25D366' }]}>
                <Ionicons name="logo-whatsapp" size={24} color="white" />
              </View>
              <View style={styles.orderOptionTextContainer}>
                <Text style={styles.orderOptionTitle}>Order via WhatsApp</Text>
                <Text style={styles.orderOptionDescription}>Send your order details directly to our team</Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color="#999" />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.orderOption}
              onPress={orderViaInstagram}
            >
              <View style={[styles.orderOptionIcon, { backgroundColor: '#C13584' }]}>
                <Ionicons name="logo-instagram" size={24} color="white" />
              </View>
              <View style={styles.orderOptionTextContainer}>
                <Text style={styles.orderOptionTitle}>Order via Instagram</Text>
                <Text style={styles.orderOptionDescription}>Message us on Instagram to place your order</Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color="#999" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8F0',
  },
  imageContainer: {
    height: 250,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  backButton: {
    position: 'absolute',
    top: 15,
    left: 15,
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  detailsContainer: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  price: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#D06B61',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  quantityLabel: {
    fontSize: 16,
    color: '#666',
    marginRight: 10,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    backgroundColor: '#D06B61',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  quantityValue: {
    fontSize: 18,
    marginHorizontal: 15,
    fontWeight: 'bold',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#F0E4D7',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  totalValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#D06B61',
  },
  instructionsContainer: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#F0E4D7',
  },
  instructionsText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  button: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cartButton: {
    backgroundColor: '#D06B61',
    marginRight: 5,
  },
  cartButtonText: {
    color: 'white',
  },
  orderButton: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#D06B61',
    marginLeft: 5,
  },
  orderButtonText: {
    color: '#D06B61',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '70%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  modalCloseButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F0E4D7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCloseButtonText: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  orderOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: '#F8F8F8',
  },
  orderOptionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F0E4D7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  orderOptionTextContainer: {
    flex: 1,
  },
  orderOptionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  orderOptionDescription: {
    fontSize: 14,
    color: '#666',
  },
});

export default OrderDetailsScreen; 