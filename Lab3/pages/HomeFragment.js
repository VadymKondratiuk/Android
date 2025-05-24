import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const HomeFragment = ({ onMakeOrder, onViewOrders }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Додаток замовлення піци</Text>
      <View style={styles.buttonContainer}>
        <Button 
          title="Зробити замовлення" 
          onPress={onMakeOrder} 
          color="#4CAF50" 
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button 
          title="Переглянути замовлення" 
          onPress={onViewOrders} 
          color="#2196F3" 
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  buttonContainer: {
    marginBottom: 20,
    width: '80%',
  },
});

export default HomeFragment;
