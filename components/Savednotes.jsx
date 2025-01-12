import { useEffect, useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { Button, Card, Text, IconButton, Searchbar } from "react-native-paper";
import { useFontSettings } from "@/components/FontContext";
import { useRouter } from "expo-router";
import db from "@/api/api";

const SavedNotes = () => {
  const { fontSettings } = useFontSettings();
  const [records, setRecords] = useState([]);
  const [categoryList, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedNotes, setSelectedNotes] = useState([]);
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);

    let filteredNotes = records.filter((note) => note.category === category);
    setSelectedNotes(filteredNotes);
  };

  useEffect(() => {
    if (searchQuery) {
      let filteredNotes = records.filter((note) => note.category === selectedCategory);
      filteredNotes = filteredNotes.filter((note) =>
         note.title.includes(searchQuery)
      );
      setSelectedNotes(filteredNotes);
    }
  }, [searchQuery]);

  const handleBackClick = () => {
    setSelectedCategory(null);
    setSelectedNotes([]);
  };

  const fetchRecords = async () => {
    try {
      const response = await db.get("/records");
      setRecords(response.data);
      const uniqueCategories = [
        ...new Set(response.data.map((record) => record.category)),
      ];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const truncateText = (text, length) => {
    if (text.length <= length) return text;
    return text.substring(0, length) + '...';
  };

  return (
    <ScrollView style={styles.container}>
      {selectedCategory ? (
        <ScrollView>
          <View style={styles.searchBar}>
            <Button
              icon="arrow-left-drop-circle-outline"
              labelStyle={styles.backButtonIcon}
              style={styles.backButton}
              onPress={handleBackClick}
            >
            </Button>
            <View style={styles.searchStyle}>
              <Searchbar
                placeholder="Search"
                onChangeText={(value) => setSearchQuery(value)}
                value={searchQuery}
                style={styles.textField}
              />
            </View>
          </View>
          <View style={styles.listContainer}>
            {selectedNotes.map((note, index) => (
              <Card
                key={index}
                style={styles.card}
                onPress={() => router.push(`${note._id}`)}
              >
                <Card.Content style={styles.cardContent}>
                  <View style={styles.cardTextContainer}>
                    <Text
                      style={[
                        styles.title,
                        {
                          fontSize: fontSettings.fontSize,
                          lineHeight: fontSettings.lineHeight,
                        },
                      ]}
                    >
                      {note.title}
                    </Text>
                    <Text
                      style={[
                        styles.preview,
                        {
                          fontSize: fontSettings.fontSize,
                          lineHeight: fontSettings.lineHeight,
                        },
                      ]}
                    >
                      {truncateText(note.text, 60)}
                    </Text>
                  </View>
                  <IconButton
                    icon="arrow-right"
                    size={20}
                    style={styles.iconButton}
                  />
                </Card.Content>
              </Card>
            ))}
          </View>
        </ScrollView>
      ) : (
        <View style={styles.listContainer}>
          <Text
            style={[
              styles.selectedCategoryText,
              {
                fontSize: 4 + fontSettings.fontSize,
                lineHeight: fontSettings.lineHeight,
              },
            ]}
          >
            List of Tags
          </Text>
          {categoryList.map((category, index) => (
            <Card
              key={index}
              style={styles.card}
              onPress={() => handleCategoryClick(category)}
            >
              <Card.Content>
                <Text
                  style={[
                    styles.category,
                    {
                      fontSize: fontSettings.fontSize,
                      lineHeight: fontSettings.lineHeight,
                    },
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
    padding: 20,
  },
  listContainer: {
    marginBottom: 20,
  },
  card: {
    backgroundColor: "rgb(255, 243, 191)", 
    borderRadius: 8,
    shadowColor: "rgba(0, 0, 0, 0.1)", 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    marginVertical: 10,
    padding: 10,
  },
  cardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardTextContainer: {
    flex: 1,
  },
  category: {
    fontWeight: "bold",
    color: "rgb(102, 85, 0)",
    textAlign: "center",
  },
  title: {
    fontWeight: "bold",
    color: "rgb(102, 85, 0)",
    marginBottom: 10,
  },
  preview: {
    color: "rgb(77, 70, 57)",
  },
  selectedCategoryText: {
    fontWeight: "bold",
    paddingVertical: 10,
    textAlign: "center",
    color: "rgb(30, 27, 22)", 
  },
  backButton: {
    borderRadius: 150,
    paddingVertical: 8,
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 1,
  },
  backButtonIcon: {
    fontSize: 30,
    color: "black", 
    marginRight: 0,
  },
  iconButton: {
    marginLeft: 10,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    padding: 4,
  },
  searchStyle: {
    flex: 1,
  },
  textField: {
    width: "100%",
    backgroundColor: "rgb(255, 204, 0)",
  },
});

export default SavedNotes;