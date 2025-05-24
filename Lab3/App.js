import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Alert } from 'react-native';
import { useState } from 'react';
import InputFragment from './pages/InputFragment';
import ResultFragment from './pages/ResultFragment';
import HomeFragment from './pages/HomeFragment';

export default function App() {
  // Використовуємо currentFragment для контролю відображення:
  // 'home'   – початковий екран;
  // 'input'  – екран введення замовлення;
  // 'result' – екран відображення замовлення.
  const [currentFragment, setCurrentFragment] = useState('home');
  const [orderDetails, setOrderDetails] = useState(null);

  const handleMakeOrder = () => {
    setCurrentFragment('input');
  };

  const handleViewOrders = () => {
    setCurrentFragment('result');
  };

  const handleCancel = () => {
    // Повертаємося до початкового екрану
    setOrderDetails(null);
    setCurrentFragment('home');
  };

  return (
    <View style={styles.container}>
      {currentFragment === 'home' && (
        <HomeFragment 
          onMakeOrder={handleMakeOrder} 
          onViewOrders={handleViewOrders}
        />
      )}
      {currentFragment === 'input' && (
        <InputFragment 
          onSubmit={(order) => {
            setOrderDetails(order);
            setCurrentFragment('result');
          }}
          onCancel={() => setCurrentFragment('home')}
        />
      )}
      {currentFragment === 'result' && (
        <ResultFragment 
          orderDetails={orderDetails} 
          onCancel={handleCancel}
        />
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    backgroundColor: '#fff',
    flex: 1,
  },
});

