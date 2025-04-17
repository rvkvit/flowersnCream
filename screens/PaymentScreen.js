import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput, SafeAreaView, Alert, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as WebBrowser from 'expo-web-browser';

const PaymentScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { amount } = route.params;
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('op_bank');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  // This would be your actual OP Bank payment endpoint
  const OP_PAYMENT_URL = 'https://payment.op.fi/';

  const handleFormChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      Alert.alert('Missing Information', 'Please enter your full name');
      return false;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      Alert.alert('Missing Information', 'Please enter a valid email address');
      return false;
    }
    if (!formData.phone.trim()) {
      Alert.alert('Missing Information', 'Please enter your phone number');
      return false;
    }
    if (!formData.address.trim()) {
      Alert.alert('Missing Information', 'Please enter your delivery address');
      return false;
    }
    return true;
  };

  const handlePayment = async () => {
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Simulate API call to payment gateway
    setTimeout(async () => {
      setIsLoading(false);
      
      try {
        // Open browser with OP Bank payment URL
        const result = await WebBrowser.openBrowserAsync(OP_PAYMENT_URL);
        
        // Handle payment result
        if (result.type === 'success') {
          // Payment was successful
          Alert.alert(
            'Payment Successful',
            'Thank you for your order! You will receive a confirmation email shortly.',
            [
              {
                text: 'OK',
                onPress: () => {
                  global.cartItems = [];
                  navigation.navigate('Home');
                },
              },
            ]
          );
        } else {
          // Payment was cancelled or failed
          Alert.alert('Payment Cancelled', 'Your payment was cancelled or failed.');
        }
      } catch (error) {
        Alert.alert('Error', 'There was an error processing your payment. Please try again.');
        console.error(error);
      }
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.amountContainer}>
          <Text style={styles.amountLabel}>Total Amount:</Text>
          <Text style={styles.amount}>€{amount.toFixed(2)}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          <TouchableOpacity
            style={[
              styles.paymentOption,
              paymentMethod === 'op_bank' && styles.selectedPayment,
            ]}
            onPress={() => setPaymentMethod('op_bank')}
          >
            <Text style={styles.paymentOptionText}>OP Bank (Secure Payment)</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Billing Information</Text>
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            placeholderTextColor="#999"
            value={formData.name}
            onChangeText={(text) => handleFormChange('name', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#999"
            keyboardType="email-address"
            value={formData.email}
            onChangeText={(text) => handleFormChange('email', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            placeholderTextColor="#999"
            keyboardType="phone-pad"
            value={formData.phone}
            onChangeText={(text) => handleFormChange('phone', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Delivery Address"
            placeholderTextColor="#999"
            multiline
            numberOfLines={3}
            value={formData.address}
            onChangeText={(text) => handleFormChange('address', text)}
          />
        </View>

        <TouchableOpacity 
          style={styles.payButton} 
          onPress={handlePayment}
          disabled={isLoading}
        >
          {isLoading ? (
            <View style={styles.loadingButton}>
              <ActivityIndicator size="small" color="white" />
              <Text style={[styles.payButtonText, styles.loadingButtonText]}>Processing...</Text>
            </View>
          ) : (
            <Text style={styles.payButtonText}>Pay with OP Bank</Text>
          )}
        </TouchableOpacity>
        
        <View style={styles.securityNote}>
          <Text style={styles.securityNoteText}>
            🔒 Your payment is secured with OP Bank's industry-leading encryption.
            All information is transmitted securely.
          </Text>
        </View>
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
  content: {
    flex: 1,
    padding: 20,
  },
  amountContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  amountLabel: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  amount: {
    fontSize: 24,
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
  paymentOption: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#F0E4D7',
  },
  selectedPayment: {
    borderColor: '#D06B61',
    backgroundColor: '#FFF8F0',
  },
  paymentOptionText: {
    fontSize: 16,
    color: '#333',
  },
  input: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#F0E4D7',
  },
  payButton: {
    backgroundColor: '#D06B61',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 20,
  },
  payButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingButtonText: {
    marginLeft: 10,
  },
  securityNote: {
    backgroundColor: '#F0E4D7',
    padding: 15,
    borderRadius: 10,
    marginBottom: 30,
  },
  securityNoteText: {
    color: '#666',
    fontSize: 14,
    lineHeight: 20,
  },
});

export default PaymentScreen; 