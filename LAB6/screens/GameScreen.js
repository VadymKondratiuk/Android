import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Alert, ScrollView } from 'react-native';
import { generateShuffledCards } from '../data/card';
import Card from '../components/Card';

export default function GameScreen({ route, navigation }) {
  const { level } = route.params;
  const pairCount = 4 + level; 
  const [cards, setCards] = useState([]);
  const [selected, setSelected] = useState([]);
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    setCards(generateShuffledCards(pairCount));
    setMoves(0); 
  }, [level]);

  const handlePress = (cardIndex) => {
    if (selected.length === 2 || cards[cardIndex].isFlipped) return;

    const newCards = [...cards];
    newCards[cardIndex].isFlipped = true;
    const newSelected = [...selected, cardIndex];
    setCards(newCards);
    setSelected(newSelected);

    if (newSelected.length === 2) {
      setMoves((prev) => prev + 1); 

      const [firstIdx, secondIdx] = newSelected;
      const first = newCards[firstIdx];
      const second = newCards[secondIdx];

      if (first.emoji === second.emoji) {
        newCards[firstIdx].isMatched = true;
        newCards[secondIdx].isMatched = true;
        setTimeout(() => {
          setCards([...newCards]);
          setSelected([]);
        }, 500);
      } else {
        setTimeout(() => {
          newCards[firstIdx].isFlipped = false;
          newCards[secondIdx].isFlipped = false;
          setCards([...newCards]);
          setSelected([]);
        }, 1000);
      }
    }
  };

  useEffect(() => {
    if (cards.length && cards.every((c) => c.isMatched)) {
      Alert.alert(
        '🎉 Condgratulation!',
        `You passed level ${level} with ${moves} moves!`,
        [{ text: 'Back to Menu', onPress: () => navigation.goBack() }]
      );
    }
  }, [cards]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Level {level}</Text>
      <Text style={styles.moves}>Moves: {moves}</Text>
      <View style={styles.grid}>
        {cards.map((card, index) => (
          <Card key={card.id} card={card} onPress={() => handlePress(index)} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: 40,
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  moves: {
    fontSize: 16,
    marginBottom: 20,
    color: '#333',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '90%',
  },
});
