import React, { useState, useEffect } from 'react';
import { View, FlatList, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WordCard from '../components/WordCard';

const HistoryScreen = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    const storedHistory = JSON.parse(await AsyncStorage.getItem('history')) || [];
    setHistory(storedHistory);
  };

  const clearHistory = async () => {
    await AsyncStorage.removeItem('history');
    setHistory([]);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={history}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <WordCard
            word={item.word}
            definition={item.definition}
            example={item.example}
            date={item.date}
          />
        )}
      />
      <Button title="Clear History" onPress={clearHistory} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
});

export default HistoryScreen;
