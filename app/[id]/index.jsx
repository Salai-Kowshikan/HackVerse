import { View, Image, StyleSheet, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import db from "@/api/api";
import { Button, Surface, Modal, Portal, Text } from "react-native-paper";
import { useFontSettings } from "@/components/FontContext";

function NotePage() {
  const { id } = useLocalSearchParams();

  const { setLoading } = useFontSettings();
  const [note, setNote] = useState();
  const [visible, setVisible] = useState(false);
  const [content, setContent] = useState();

  const fetchNote = async () => {
    const response = await db.get(`/record/${id}`);
    console.log(response.data);
    setNote(response.data);
  };

  const explain = async () => {
    setLoading(true);
    const response = await db.post(`/explain`, { user_message: note.text });
    setContent(response.data.response.answer);
    setVisible(true);
    setLoading(false);
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
        <Button onPress={explain}> Explain </Button>
      </Surface>
      <ExplainModal
        visible={visible}
        setVisible={setVisible}
        content={content}
        setContent={setContent}
      />
    </View>
  );
}

const ExplainModal = ({ visible, setVisible, content, setContent }) => {
  const { setLoading, language } = useFontSettings();
  const containerStyle = { backgroundColor: "white", padding: 25, margin: 25, maxHeight: "75%" };
  const translate = async () => {
    setLoading(true);
    const response = await db.post(`/translate`, {
      source: "en",
      target: language,
      text: content,
    });
    setContent(response.data.translated_text);
    setLoading(false);
  };
  return (
    <>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={() => setVisible(false)}
          contentContainerStyle={containerStyle}
        >
          <ScrollView>
            <Text>{content}</Text>
          </ScrollView>
          <Button onPress={translate}> Translate! </Button>
        </Modal>
      </Portal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  surface: {
    padding: 20,
    elevation: 4,
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "contain",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  text: {
    fontSize: 16,
    color: "#666",
  },
});

export default NotePage;