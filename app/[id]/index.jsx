import { View, Image, StyleSheet, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import db from "@/api/api";
import * as Speech from "expo-speech";
import { Button, Surface, Modal, Portal, Text, FAB } from "react-native-paper";
import { useFontSettings } from "@/components/FontContext";
import Markdown from "react-native-markdown-display";

function NotePage() {
  const { id } = useLocalSearchParams();

  const { setLoading } = useFontSettings();
  const [note, setNote] = useState();
  const [visible, setVisible] = useState(false);
  const [content, setContent] = useState();

  const fetchNote = async () => {
    const response = await db.get(`/record/${id}`);
    setNote(response.data);
  };

  const explain = async () => {
    setLoading(true);
    const response = await db.post(`/explain`, { user_message: note.text });
    setContent(response.data.response.answer);
    setVisible(true);
    setLoading(false);
  };

  const recommend = async () => {
    setLoading(true);
    const response = await db.post(`/recommend`, { user_message: note.text });
    setContent(response.data.response.answer);
    setVisible(true);
    setLoading(false);
  };

  const check = async () => {
    setLoading(true);
    const response = await db.post(`/check`, { user_message: note.text });
    setNote({...note,text:response.data.response.answer})
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
            <Markdown style={styles.text}>{note.text}</Markdown>
          </>
        )}
        <Button onPress={explain}> Explain </Button>
        <Button onPress={recommend}> Recommend resources </Button>
        <Button onPress={check}> Spell Check </Button>
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
  const [isPlaying, setIsPlaying] = useState(false);
  const { setLoading, language } = useFontSettings();
  const containerStyle = {
    backgroundColor: "white",
    padding: 25,
    margin: 25,
    maxHeight: "75%",
  };

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

  const playText = () => {
    if (!isPlaying) {
      Speech.speak(content, {
        onDone: () => setIsPlaying(false),
      });
      setIsPlaying(true);
    }
  };

  const pauseText = () => {
    Speech.pause();
  };

  const stopText = () => {
    Speech.stop();
    setIsPlaying(false);
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={() => {
          setVisible(false);
          stopText();
        }}
        contentContainerStyle={containerStyle}
      >
        <ScrollView>
          <Markdown>{content}</Markdown>
        </ScrollView>
        <Button onPress={translate}>Translate!</Button>

        <View style={styles.fabContainer}>
          <FAB
            icon="play"
            style={styles.fab}
            onPress={playText}
            disabled={isPlaying}
          />
          <FAB
            icon="pause"
            style={styles.fab}
            onPress={pauseText}
            disabled={!isPlaying}
          />
          <FAB
            icon="stop"
            style={styles.fab}
            onPress={stopText}
            disabled={!isPlaying}
          />
        </View>
      </Modal>
    </Portal>
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
