import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import fetchWord from '../utils/fetchWord';

const HomeScreen = ({ navigation }) => {
  const [word, setWord] = useState({});
  
  useEffect(() => {
    loadWord();
  }, []);

  const loadWord = async () => {
    const newWord = await fetchWord();
    setWord(newWord);
    const history = JSON.parse(await AsyncStorage.getItem('history')) || [];
    const today = new Date().toISOString().split('T')[0];
    if (!history.some(entry => entry.date === today)) {
      history.push({ ...newWord, date: today });
      await AsyncStorage.setItem('history', JSON.stringify(history));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Word of the Day</Text>
      <Text style={styles.word}>{word.word}</Text>
      <Text>{word.definition}</Text>
      <Text style={styles.example}>{word.example}</Text>
      <Button title="New Word" onPress={loadWord} />
      <Button title="View History" onPress={() => navigation.navigate('History')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold' },
  word: { fontSize: 20, fontWeight: 'bold', marginTop: 10 },
  example: { fontStyle: 'italic', marginTop: 5 },
});

export default HomeScreen;
