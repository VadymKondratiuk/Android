import React from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';

export default function MenuScreen({ navigation }) {
  const levels = Array.from({ length: 8 }, (_, i) => i + 1);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🧠 Memory Game</Text>
      <Text style={styles.subtitle}>Choose Level:</Text>
      {levels.map((level) => (
        <View key={level} style={styles.buttonContainer}>
          <Button
            title={`Level ${level}`}
            onPress={() => navigation.navigate('Game', { level })}
          />
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: 60,
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
  },
  title: {
    fontSize: 32,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  buttonContainer: {
    marginVertical: 6,
    width: '80%',
  },
});
