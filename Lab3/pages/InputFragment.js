import { useState } from 'react';
import { Text, TextInput, Button, ScrollView, Alert, StyleSheet, View } from 'react-native';
import Radio from '../components/Radio';
import CheckBox from '../components/CheckBox';
import * as FileSystem from 'expo-file-system';

const InputFragment = ({ onSubmit, onCancel }) => {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [size, setSize] = useState('');
  const [extra, setExtra] = useState([]);

  const handleOrder = async () => {
    if (!name || !type || !size) {
      Alert.alert('Будь ласка, заповніть всі обов’язкові поля!');
      return;
    }

    // Формуємо дані ордеру
    const orderData = 
      `Ім'я: ${name}\n` +
      `Тип піци: ${type}\n` +
      `Розмір: ${size}\n` +
      `Додаткові: ${extra.length > 0 ? extra.join(', ') : 'Без додаткових опцій'}\n` +
      `-------------------------\n`;

    // Шлях до файлу
    const fileUri = FileSystem.documentDirectory + 'order.txt';

    try {
      // Спочатку отримуємо поточний вміст файла, якщо він існує
      let existingData = '';
      const fileInfo = await FileSystem.getInfoAsync(fileUri);
      if (fileInfo.exists) {
        existingData = await FileSystem.readAsStringAsync(fileUri, { encoding: FileSystem.EncodingType.UTF8 });
      }
      // Додаємо нові дані до існуючих
      const newData = existingData + orderData;
      await FileSystem.writeAsStringAsync(fileUri, newData, { encoding: FileSystem.EncodingType.UTF8 });

      // Вивід алерту з кнопкою "ОК"
      Alert.alert(
        'Замовлення збережено',
        `Файл збережено за адресою: ${fileUri}`,
        [
          { 
            text: 'ОК', 
            onPress: () => {
              onSubmit({ 
                name, 
                type, 
                size, 
                extra: extra.length > 0 ? extra.join(', ') : 'Без додаткових опцій' 
              });
            } 
          }
        ]
      );

    } catch (error) {
      Alert.alert('Помилка при записі файлу!', error.message);
    }
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

      <View style={styles.separator} />

      <Button 
        title="Скасувати"
        onPress={onCancel}
        color="#f44336"
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
  separator: {
    height: 10,
  },
});

export default InputFragment;
