import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Button, Card, Text, IconButton } from 'react-native-paper';
import data from './data.json';
import { useFontSettings } from '@/components/FontContext';

const SavedNotes = () => {
  const categories = data.categories;
  const { fontSettings } = useFontSettings();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedNotes, setSelectedNotes] = useState([]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    const filteredNotes = data.notes.filter((note) => note.category === category);
    setSelectedNotes(filteredNotes);
  };

  const handleBackClick = () => {
    setSelectedCategory(null);
    setSelectedNotes([]);
  };

  const handleIconPress = (noteTitle) => {
    console.log(`Arrow button clicked for: ${noteTitle}`);
  };

  return (
    <ScrollView style={styles.container}>
      {selectedCategory ? (
        <View style={styles.noteContainer}>
          <Button
            icon="arrow-left-drop-circle-outline"
            labelStyle={styles.backButtonIcon}
            style={styles.backButton}
            onPress={handleBackClick}
          >
            Back
          </Button>
          <View style={styles.listContainer}>
            {selectedNotes.map((note, index) => (
              <Card key={index} style={styles.card}>
                <Card.Content style={styles.cardContent}>
                  <View style={styles.cardTextContainer}>
                    <Text
                      style={[
                        styles.title,
                        { fontSize: fontSettings.fontSize, lineHeight: fontSettings.lineHeight },
                      ]}
                    >
                      {note.title}
                    </Text>
                    <Text
                      style={[
                        styles.preview,
                        { fontSize: fontSettings.fontSize, lineHeight: fontSettings.lineHeight },
                      ]}
                    >
                      {note.content}
                    </Text>
                  </View>
                  <IconButton
                    icon="arrow-right"
                    size={20}
                    onPress={() => handleIconPress(note.title)}
                    style={styles.iconButton}
                  />
                </Card.Content>
              </Card>
            ))}
          </View>
        </View>
      ) : (
        <View style={styles.listContainer}>
          <Text
            style={[
              styles.selectedCategoryText,
              { fontSize: fontSettings.fontSize, lineHeight: fontSettings.lineHeight },
            ]}
          >
            List of Categories
          </Text>
          {categories.map((category, index) => (
            <Card
              key={index}
              style={styles.card}
              onPress={() => handleCategoryClick(category)}
            >
              <Card.Content>
                <Text
                  style={[
                    styles.category,
                    { fontSize: fontSettings.fontSize, lineHeight: fontSettings.lineHeight },
                  ]}
                >
                  {category}
                </Text>
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
    backgroundColor: 'rgb(248, 248, 240)',
    padding: 20,
  },
  listContainer: {
    marginBottom: 20,
  },
  card: {
    backgroundColor: 'rgb(255, 243, 191)',
    borderRadius: 8,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    marginVertical: 10,
    padding: 10,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTextContainer: {
    flex: 1,
  },
  category: {
    fontWeight: 'bold',
    color: 'rgb(102, 85, 0)',
    textAlign: 'center',
  },
  title: {
    fontWeight: 'bold',
    color: 'rgb(102, 85, 0)',
    marginBottom: 10,
  },
  preview: {
    color: 'rgb(77, 70, 57)',
  },
  selectedCategoryText: {
    fontWeight: 'bold',
    paddingVertical: 10,
    textAlign: 'center',
    color: 'rgb(30, 27, 22)',
  },
  backButton: {
    backgroundColor: 'rgb(255, 204, 0)',
    borderRadius: 25,
    marginBottom: 20,
    paddingHorizontal: 15,
    alignSelf: 'flex-start',
  },
  backButtonIcon: {
    fontSize: 20,
    color: 'white',
  },
  iconButton: {
    marginLeft: 10,
  },
});

export default SavedNotes;
