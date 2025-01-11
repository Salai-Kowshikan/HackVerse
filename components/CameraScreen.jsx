import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState, useRef } from 'react';
import { FAB, Button, TextInput, Modal, Portal } from 'react-native-paper';
import { StyleSheet, Text, TouchableOpacity, View, Image, Dimensions } from 'react-native';
import db from '@/api/api';

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
      name: `${title}.jpg`,
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
        <View style={styles.buttonContainer}>
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
              onChangeText={(value) => setTitle(value)}
              mode="outlined"
              style={styles.input}
            />
            <TextInput
              label="Category"
              value={category}
              onChangeText={(value) => setCategory(value)}
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
        <View style={styles.bottomContainer}>
          <TouchableOpacity onPress={toggleCameraFacing}>
            <FAB
              icon="camera-flip-outline"
              style={styles.fab}
              onPress={toggleCameraFacing}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={takePicture} style={styles.shutterButtonContainer}>
            <Button
              icon="camera"
              mode="contained"
              onPress={takePicture}
              style={styles.shutterButton}
              labelStyle={styles.shutterButtonIcon}
            />
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  
    alignItems: 'center',
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: height * 0.02,
  },
  camera: {
    flex: 1,

  },
  bottomContainer: {
    position: 'absolute',
    bottom: height * 0.1, 
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  shutterButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: width * 0.05, 
  },
  shutterButton: {
    width: height * 0.08, 
    height: height * 0.08, 
    borderRadius: height * 0.04, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  shutterButtonIcon: {
    fontSize: height * 0.044,
    fontWeight: 'lighter',
    marginRight: 0, 
  },
  fab: {
    margin: height * 0.02,
    backgroundColor: '#f0ad4e',
  },
  image: {
    width: '100%',
    height: height * 0.5,
    resizeMode: 'contain',
  },
  resetButton: {
    margin: height * 0.02,
    width: width * 0.4,
    alignSelf: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: width * 0.1,
    margin: width * 0.1,
    borderRadius: 10,
  },
  input: {
    marginBottom: height * 0.02,
  },
  saveButton: {
    marginTop: height * 0.02,
  },
});
