import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const WordCard = ({ word, definition, example, date }) => (
  <View style={styles.card}>
    <Text style={styles.word}>{word}</Text>
    <Text style={styles.definition}>{definition}</Text>
    <Text style={styles.example}>{example}</Text>
    {date && <Text style={styles.date}>Date: {date}</Text>}
  </View>
);

const styles = StyleSheet.create({
  card: { padding: 15, marginBottom: 10, backgroundColor: '#f9f9f9', borderRadius: 5 },
  word: { fontSize: 18, fontWeight: 'bold' },
  definition: { marginTop: 5 },
  example: { fontStyle: 'italic', marginTop: 5 },
  date: { marginTop: 5, color: 'gray' },
});

export default WordCard;
