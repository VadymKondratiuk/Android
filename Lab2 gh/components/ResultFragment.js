import { StyleSheet, View, Text, Button} from 'react-native';


const ResultFragment = ({ orderDetails, onCancel }) => {
    return (
      <View style={styles.orderInfo}>
        <Text style={styles.orderTitle}>Ваше замовлення:</Text>
        <Text style={styles.orderText}>Ім'я: {orderDetails.name}</Text>
        <Text style={styles.orderText}>Тип піци: {orderDetails.type}</Text>
        <Text style={styles.orderText}>Розмір: {orderDetails.size}</Text>
        <Text style={styles.orderText}>Додаткові опції: {orderDetails.extra}</Text>
        <Button 
            title="Скасувати" 
            onPress={onCancel} 
            color="#D32F2F" 
        />
      </View>
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
      alignItems: 'center',
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

export default ResultFragment;