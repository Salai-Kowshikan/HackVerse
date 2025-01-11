import { View, Text, Image, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import db from "@/api/api";
import { Surface } from "react-native-paper";

function NotePage() {
  const { id } = useLocalSearchParams();
  const [note, setNote] = useState();

  const fetchNote = async () => {
    const response = await db.get(`/record/${id}`);
    console.log(response.data);
    setNote(response.data);
  };

  useEffect(() => {
    fetchNote();
  }, []);

  return (
    <View style={styles.container}>
      <Surface style={styles.surface}>
        {note && (
          <>
            <Image
              source={{ uri: `data:image/jpeg;base64,${note.image}` }}
              style={styles.image}
            />
            <Text style={styles.title}>{note.title}</Text>
            <Text style={styles.text}>{note.text}</Text>
          </>
        )}
      </Surface>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  surface: {
    padding: 20,
    elevation: 4,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  text: {
    fontSize: 16,
    color: '#666',
  },
});

export default NotePage;