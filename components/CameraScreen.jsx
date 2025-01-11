import { CameraView, CameraType, useCameraPermissions, Ca } from 'expo-camera';
import { useState, useRef } from 'react';
import { FAB,Button } from 'react-native-paper';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
export default function CameraScreen() {
  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();
  
  const [photo, setPhoto] = useState(null);
  const cameraRef = useRef(null);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
  
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  const takePicture = async () => {
    
      try {
        const photoData = await cameraRef.current?.takePictureAsync(); 
        setPhoto(photoData.uri); 
      } catch (error) {
        console.error("Error taking picture:", error);
      }
    
  };

  const resetCamera = () => {
    setPhoto(null);
  };

  if (photo) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Captured Image</Text>
        <Image source={{ uri: photo }} style={styles.image} />
        <Button mode="contained" onPress={resetCamera} style={styles.resetButton}>
          Back to Camera
        </Button>
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
       
      <FAB
            icon="camera-flip-outline"
            style={styles.fab}
          onPress={toggleCameraFacing}
          />
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
  
});

