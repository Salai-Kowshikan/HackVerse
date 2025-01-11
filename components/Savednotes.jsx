import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Avatar, Button, Card, Text } from 'react-native-paper';
import data from './data.json';
import { Link } from 'expo-router';
import { useFontSettings } from '@/components/FontContext';

const SavedNotes = () => {
  const categories = data.categories;
const { fontSettings, updateFontSettings } = useFontSettings();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedNotes, setSelectedNotes] = useState([]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    
    const filteredNotes = data.notes.filter(note => note.category === category);
    setSelectedNotes(filteredNotes);
  };

 
  const handleBackClick = () => {
    setSelectedCategory(null);
    setSelectedNotes([]);
  };

  return (
    <ScrollView style={styles.container}>
      {selectedCategory ? (
        <View style={styles.noteContainer}>
          <Button  icon="arrow-left-drop-circle-outline" size={60} style={styles.backButton} onPress={handleBackClick} />
          <View style={styles.listContainer}>
            {selectedNotes.map((note, index) => (
              <Card key={index} style={styles.card}>
                <Card.Content>
                  <Text style={[styles.title,{ fontSize: fontSettings.fontSize, lineHeight: fontSettings.lineHeight }]}>{note.title}</Text>
                  <Text style={[styles.preview,{ fontSize: fontSettings.fontSize, lineHeight: fontSettings.lineHeight }]}>{note.content}</Text>
                </Card.Content>
                <Card.Actions>
                <Button>Explain</Button>
                
                </Card.Actions>
              </Card>
            ))}
          </View>
        </View>
      ) : (
       
        <View style={styles.listContainer}>
          {categories.map((category, index) => (
            <Card key={index} style={styles.card} onPress={() => handleCategoryClick(category)}>
              <Card.Content>
                <Text style={[styles.category,{ fontSize: fontSettings.fontSize, lineHeight: fontSettings.lineHeight }]}>{category}</Text>
              </Card.Content>
              
            </Card>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  
  card: {
    width: '100%',
    marginBottom: 16,
  },
  category: {
   
    fontWeight: 'bold',
  },
  title: {
  
    fontWeight: 'bold',
  },
  preview: {
   
    color: '#424242',
  },
  selectedCategoryText: {
    
    fontWeight: 'bold',
    marginBottom: 10,
  },
  backButton: {
    alignSelf: 'flex-start',  
    marginBottom: 10,       
  },
});

export default SavedNotes;
