import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState, useRef } from 'react';
import { FAB, Button, TextInput, Modal, Portal } from 'react-native-paper';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import db from '@/api/api'

export default function CameraScreen() {
  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [photo, setPhoto] = useState(null);
  const cameraRef = useRef(null);

  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === 'back' ? 'front' : 'back'));
  }

  const takePicture = async () => {
    try {
      const photoData = await cameraRef.current?.takePictureAsync();
      setPhoto(photoData.uri);
    } catch (error) {
      console.error('Error taking picture:', error);
    }
  };

  const resetCamera = () => {
    setPhoto(null);
  };

  const saveToNotes = async () => {
    if (!photo || !title || !category) {
      alert('Please provide all the required details.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('category', category);
    formData.append('image', {
      uri: photo,
      name: '${title}.jpg',
      type: 'image/jpeg',
    });

    try {
      console.log('Saving to notes:');
      const response = await db.post('/extract', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Upload successful:', response.data);
      alert('Saved to notes successfully!');
      resetCamera();
      setModalVisible(false);
    } catch (error) {
      console.error('Error saving to notes:', error.response ? error.response.data : error.message);
      alert('Failed to save.');
    }
  };

  if (photo) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Captured Image</Text>
        <Image source={{ uri: photo }} style={styles.image} />
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <Button mode="contained" onPress={resetCamera} style={styles.resetButton}>
            Back to Camera
          </Button>
          <Button mode="contained" onPress={() => setModalVisible(true)} style={styles.resetButton}>
            Save to Notes
          </Button>
        </View>

        <Portal>
          <Modal
            visible={modalVisible}
            onDismiss={() => setModalVisible(false)}
            contentContainerStyle={styles.modalContainer}
          >
            <TextInput
              label="Title"
              value={title}
              onChangeText={setTitle}
              mode="outlined"
              style={styles.input}
            />
            <TextInput
              label="Category"
              value={category}
              onChangeText={setCategory}
              mode="outlined"
              style={styles.input}
            />
            <Button mode="contained" onPress={saveToNotes} style={styles.saveButton}>
              Save
            </Button>
          </Modal>
        </Portal>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Button icon="camera-flip-outline" mode="contained" onPress={takePicture}>
              Click me
            </Button>
          </TouchableOpacity>
        </View>
      </CameraView>

      <FAB icon="camera-flip-outline" style={styles.fab} onPress={toggleCameraFacing} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 600,
    width: 400,
    alignSelf: 'center',
    marginTop: 50,
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: -10,
    bottom: 0,
  },
  image: {
    flex: 1,
    width: '100%',
    resizeMode: 'contain',
  },
  resetButton: {
    margin: 20,
    alignSelf: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 10,
  },
  input: {
    marginBottom: 20,
  },
  saveButton: {
    marginTop: 10,
  },
});
