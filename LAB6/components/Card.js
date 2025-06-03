import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function Card({ card, onPress }) {
  return (
    <TouchableOpacity
      style={[styles.card, card.isFlipped || card.isMatched ? styles.flipped : styles.hidden]}
      onPress={onPress}
      disabled={card.isFlipped || card.isMatched}
    >
      <Text style={styles.emoji}>
        {card.isFlipped || card.isMatched ? card.emoji : '❓'}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 70, height: 70, margin: 8,
    justifyContent: 'center', alignItems: 'center',
    borderRadius: 12, backgroundColor: '#ccc',
  },
  emoji: {
    fontSize: 28,
  },
  flipped: {
    backgroundColor: '#fff',
  },
  hidden: {
    backgroundColor: '#aaa',
  },
});
