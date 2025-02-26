import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Alert } from 'react-native';
import CheckBox from './components/CheckBox';
import Radio from './components/Radio';

const App = () => {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [size, setSize] = useState('');
  const [extra, setExtra] = useState([]);
  interface OrderDetails {
    name: string;
    type: string;
    size: string;
    extra: string;
  }
  
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);

  const handleOrder = () => {
    if (!name || !type || !size) {
      Alert.alert('Будь ласка, заповніть всі обов’язкові поля!');
      return;
    }

    setOrderDetails({
      name,
      type,
      size,
      extra: extra.length > 0 ? extra.join(', ') : 'Без додаткових опцій',
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Замовлення піци</Text>

      <Text style={styles.label}>Ваше ім'я:</Text>
      <TextInput
        style={styles.input}
        placeholder="Введіть ім'я"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Оберіть тип піци:</Text>
      <Radio
        options={[
          { label: 'Маргарита', value: 'Маргарита' },
          { label: 'Пепероні', value: 'Пепероні' },
          { label: 'Гавайська', value: 'Гавайська' },
        ]}
        selectedValue={type}
        onChange={setType}
        style={{ }}
      />

      <Text style={styles.label}>Оберіть розмір:</Text>
      <Radio
        options={[
          { label: 'Мала', value: 'Мала' },
          { label: 'Середня', value: 'Середня' },
          { label: 'Велика', value: 'Велика' },
        ]}
        selectedValue={size}
        onChange={setSize}
        style={{ }}

      />

      <Text style={styles.label}>Додаткові інгредієнти:</Text>
      <CheckBox
        options={[
          { label: 'Сир', value: 'Сир' },
          { label: 'Гриби', value: 'Гриби' },
          { label: 'Шинка', value: 'Шинка' },
        ]}
        checkedValues={extra}
        onChange={setExtra}
        style={{ }}
      />

      <Button title="Замовити" onPress={handleOrder} color="#4CAF50" />

      {orderDetails && (
        <View style={styles.orderInfo}>
          <Text style={styles.orderTitle}>Ваше замовлення:</Text>
          <Text style={styles.orderText}>Ім'я: {orderDetails.name}</Text>
          <Text style={styles.orderText}>Тип піци: {orderDetails.type}</Text>
          <Text style={styles.orderText}>Розмір: {orderDetails.size}</Text>
          <Text style={styles.orderText}>Додаткові опції: {orderDetails.extra}</Text>
        </View>
      )}

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  label: {
    fontSize: 20,
    fontWeight: '500',
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  orderInfo: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  orderTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  orderText: {
    fontSize: 18, 
    fontWeight: '500',
    marginBottom: 5,
  },
});


export default App;
