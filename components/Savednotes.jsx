import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import { Card, Modal, Portal, Button, TextInput, IconButton } from 'react-native-paper';

const SavedNotes = () => {
  const [notes, setNotes] = useState([
    {
      id: 1,
      date: '2025-01-10',
      title: 'Grocery List',
      content: 'Buy milk, eggs, and bread.',
    },
    {
      id: 2,
      date: '2025-01-09',
      title: 'Meeting Notes',
      content: 'Discuss project milestones and deadlines.',
    },
    {
      id: 3,
      date: '2025-01-08',
      title: 'Ideas',
      content: 'Brainstorm app features.',
    },
    {
      id: 4,
      date: '2025-01-07',
      title: 'Workout Plan',
      content: 'Monday: Cardio, Wednesday: Strength.',
    },
    {
      id: 5,
      date: '2025-01-06',
      title: 'Recipe',
      content: 'Chocolate cake recipe with ingredients.',
    },
    {
      id: 6,
      date: '2025-01-05',
      title: 'To-Do',
      content: 'Finish coding assignment.',
    },
  ]);

  const [visible, setVisible] = useState(false);
  const [currentNote, setCurrentNote] = useState(null);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingContent, setIsEditingContent] = useState(false);
  const [editedNote, setEditedNote] = useState({ title: '', content: '' });
  const [showSaveButton, setShowSaveButton] = useState(false);

  const openModal = (note) => {
    setCurrentNote(note);
    setEditedNote({ title: note.title, content: note.content });
    setVisible(true);
  };

  const closeModal = () => {
    setVisible(false);
    setIsEditingTitle(false);
    setIsEditingContent(false);
    setShowSaveButton(false);
  };

  const enableEditing = (field) => {
    if (field === 'title') setIsEditingTitle(true);
    if (field === 'content') setIsEditingContent(true);
    setShowSaveButton(true);
  };

  const saveNote = () => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === currentNote.id
          ? { ...note, title: editedNote.title, content: editedNote.content, date: new Date().toISOString().split('T')[0] }
          : note
      )
    );
    closeModal();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.gridContainer}>
        {notes.map((note) => (
          <Card
            key={note.id}
            style={styles.card}
            onPress={() => openModal(note)}
          >
            <Card.Content>
              <Text style={styles.date}>{note.date}</Text>
              <Text style={styles.title}>{note.title}</Text>
              <Text style={styles.preview}>{note.content}</Text>
            </Card.Content>
          </Card>
        ))}
      </View>

      <Portal>
        <Modal visible={visible} onDismiss={closeModal} contentContainerStyle={styles.modalContainer}>
          {currentNote && (
            <>
              <View style={styles.modalHeader}>
                <IconButton icon="close" onPress={closeModal} style={styles.closeIcon} />
              </View>
              <View style={styles.inputWrapper}>
                <TextInput
                  label="Title"
                  value={editedNote.title}
                  disabled={!isEditingTitle}
                  onChangeText={(text) => setEditedNote({ ...editedNote, title: text })}
                  style={styles.input}
                />
                <IconButton
                  icon="pencil"
                  onPress={() => enableEditing('title')}
                  style={styles.inlineEditIcon}
                />
              </View>
              <View style={styles.inputWrapper}>
                <TextInput
                  label="Content"
                  value={editedNote.content}
                  disabled={!isEditingContent}
                  multiline
                  onChangeText={(text) => setEditedNote({ ...editedNote, content: text })}
                  style={[styles.input, styles.contentInput]}
                />
                <IconButton
                  icon="pencil"
                  onPress={() => enableEditing('content')}
                  style={styles.inlineEditIcon}
                />
              </View>
              {showSaveButton && (
                <Button mode="contained" onPress={saveNote} style={styles.saveButton}>
                  Save
                </Button>
              )}
            </>
          )}
        </Modal>
      </Portal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 8,
  },
  card: {
    width: '45%',
    margin: 8,
    aspectRatio: 1,
    justifyContent: 'center',
  },
  date: {
    fontSize: 12,
    color: '#757575',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 4,
  },
  preview: {
    fontSize: 14,
    color: '#424242',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 16,
    margin: 16,
    borderRadius: 8,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  closeIcon: {
    margin: 0,
  },
  input: {
    flex: 1,
    marginBottom: 16,
  },
  contentInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inlineEditIcon: {
    marginLeft: 8,
  },
  saveButton: {
    alignSelf: 'center',
    marginTop: 16,
  },
});

export default SavedNotes;
