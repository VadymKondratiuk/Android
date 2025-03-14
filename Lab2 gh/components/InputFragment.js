import React, { useState } from 'react';
import { Text, TextInput, Button, ScrollView, Alert, StyleSheet } from 'react-native';
import Radio from './Radio';
import CheckBox from './CheckBox';

const InputFragment = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [size, setSize] = useState('');
  const [extra, setExtra] = useState([]);

  const handleOrder = () => {
    if (!name || !type || !size) {
      Alert.alert('Будь ласка, заповніть всі обов’язкові поля!');
      return;
    }
    onSubmit({ name, type, size, extra: extra.length > 0 ? extra.join(', ') : 'Без додаткових опцій' });
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
            { label: 'Гавайська', value: 'Гавайська' }
        ]}
        selectedValue={type}
        onChange={setType} 
       />
      <Text style={styles.label}>Оберіть розмір:</Text>
      <Radio 
        options={[
            { label: 'Мала', value: 'Мала' }, 
            { label: 'Середня', value: 'Середня' }, 
            { label: 'Велика', value: 'Велика' }
        ]} 
        selectedValue={size} 
        onChange={setSize} 
      />
      <Text style={styles.label}>Додаткові інгредієнти:</Text>
      <CheckBox 
        options={[
            { label: 'Сир', value: 'Сир' }, 
            { label: 'Гриби', value: 'Гриби' }, 
            { label: 'Шинка', value: 'Шинка' }
        ]} 
        checkedValues={extra} 
        onChange={setExtra} 
      />
      <Button 
        title="Замовити" 
        onPress={handleOrder} 
        color="#4CAF50" 
      />
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
});

export default InputFragment;