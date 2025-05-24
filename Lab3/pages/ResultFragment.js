import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  Button, 
  ScrollView, 
  ActivityIndicator, 
  Alert 
} from 'react-native';
import * as FileSystem from 'expo-file-system';

const ResultFragment = ({ onCancel }) => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fileUri = FileSystem.documentDirectory + 'order.txt';

  useEffect(() => {
    const loadOrderData = async () => {
      try {
        const content = await FileSystem.readAsStringAsync(fileUri, { encoding: FileSystem.EncodingType.UTF8 });
        const ordersArray = content
          .split('-------------------------')
          .map(order => order.trim())
          .filter(order => order.length > 0);
        setOrders(ordersArray);
      } catch (error) {
        Alert.alert('Помилка при читанні файлу!', error.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadOrderData();
  }, []);

  const updateFile = async (newOrders) => {
    const newContent =
      newOrders.length > 0
        ? newOrders.map(order => order.trim()).join('\n-------------------------\n') + '\n-------------------------\n'
        : '';
    try {
      await FileSystem.writeAsStringAsync(fileUri, newContent, { encoding: FileSystem.EncodingType.UTF8 });
    } catch (error) {
      Alert.alert('Помилка при оновленні файлу!', error.message);
    }
  };

  const deleteOrder = (orderIndex) => {
    Alert.alert(
      'Видалення замовлення',
      'Ви впевнені, що хочете видалити це замовлення?',
      [
        { text: 'Скасувати', style: 'cancel' },
        {
          text: 'Так',
          onPress: async () => {
            const newOrders = orders.filter((_, index) => index !== orderIndex);
            setOrders(newOrders);
            await updateFile(newOrders);
          },
          style: 'destructive'
        }
      ]
    );
  };

  if (isLoading) {
    return (
      <View style={styles.orderInfo}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.orderTitle}>Завантаження...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.orderInfo}>
      <Text style={styles.orderTitle}>Замовлення:</Text>
      {orders.length > 0 ? (
        orders.map((order, index) => (
          <View key={index} style={styles.singleOrder}>
            <Text style={styles.orderText}>{order}</Text>
            <View style={styles.buttonContainer}>
              <Button
                title="Х"
                onPress={() => deleteOrder(index)}
                color="#D32F2F"
              />
            </View>
            {index < orders.length - 1 && <View style={styles.orderDivider} />}
          </View>
        ))
      ) : (
        <Text style={styles.orderText}>Немає замовлень</Text>
      )}
      <Button title="Повернутися" onPress={onCancel} color="#405fdb" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  orderInfo: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    minHeight: 200,
  },
  orderTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  orderText: {
    fontSize: 16,
    marginLeft: 10,
    marginBottom: 5,
    textAlign: 'left',
  },
  singleOrder: {
    marginBottom: 15,
  },
  orderDivider: {
    width: "100%",
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 10,
  },
  buttonContainer: {
    marginTop: 5,
    marginHorizontal: 10,
  },
});

export default ResultFragment;
