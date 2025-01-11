import React, { useState } from 'react';
import { Chip } from 'react-native-paper';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useFontSettings } from '@/components/FontContext';

export default function CustomizeFont() {
  const { fontSettings, updateFontSettings, setLanguage, language } = useFontSettings();
  const [fontSizeInput, setFontSizeInput] = useState(fontSettings.fontSize.toString());
  const [lineHeightInput, setLineHeightInput] = useState(fontSettings.lineHeight.toString());

  const updateFontSize = () => {
    const size = parseInt(fontSizeInput, 10);
    if (!isNaN(size) && size >= 12 && size <= 70) {
      updateFontSettings({ fontSize: size });
    } else {
      alert('Please enter a valid font size between 12 and 70.');
    }
  };

  const updateLineHeight = () => {
    const height = parseInt(lineHeightInput, 10);
    if (!isNaN(height) && height >= 16 && height <= 70) {
      updateFontSettings({ lineHeight: height });
    } else {
      alert('Please enter a valid line spacing between 16 and 70.');
    }
  };

  const handleFontSizeChange = (delta) => {
    const newSize = fontSettings.fontSize + delta;
    if (newSize >= 12 && newSize <= 70) {
      updateFontSettings({ fontSize: newSize });
      setFontSizeInput(newSize.toString());  
    }
  };

  const handleLineHeightChange = (delta) => {
    const newHeight = fontSettings.lineHeight + delta;
    if (newHeight >= 16 && newHeight <= 70) {
      updateFontSettings({ lineHeight: newHeight });
      setLineHeightInput(newHeight.toString()); 
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { fontSize: fontSettings.fontSize, lineHeight: fontSettings.lineHeight, color: 'rgb(30, 27, 22)' }]}>
        Font Size: {fontSettings.fontSize}
      </Text>
      <View style={styles.row}>
        <TouchableOpacity style={[styles.button, { backgroundColor: 'rgb(255, 204, 0)' }]} onPress={() => handleFontSizeChange(-1)}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        <TextInput
          style={[styles.input, { borderColor: 'rgb(116, 91, 0)' }]}
          keyboardType="number-pad"
          value={fontSizeInput}
          onChangeText={setFontSizeInput}
          onBlur={updateFontSize}
          placeholder="Enter Font Size"
          placeholderTextColor="rgb(77, 70, 57)"
        />
        <TouchableOpacity style={[styles.button, { backgroundColor: 'rgb(255, 204, 0)' }]} onPress={() => handleFontSizeChange(1)}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      <Text style={[styles.label, { fontSize: fontSettings.fontSize, lineHeight: fontSettings.lineHeight, color: 'rgb(30, 27, 22)' }]}>
        Line Spacing: {fontSettings.lineHeight}
      </Text>
      <View style={styles.row}>
        <TouchableOpacity style={[styles.button, { backgroundColor: 'rgb(255, 204, 0)' }]} onPress={() => handleLineHeightChange(-1)}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        <TextInput
          style={[styles.input, { borderColor: 'rgb(116, 91, 0)' }]}
          keyboardType="number-pad"
          value={lineHeightInput}
          onChangeText={setLineHeightInput}
          onBlur={updateLineHeight}
          placeholder="Enter Line Spacing"
          placeholderTextColor="rgb(77, 70, 57)"
        />
        <TouchableOpacity style={[styles.button, { backgroundColor: 'rgb(255, 204, 0)' }]} onPress={() => handleLineHeightChange(1)}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
      <Text style={[styles.label, { fontSize: fontSettings.fontSize, lineHeight: fontSettings.lineHeight, color: 'rgb(30, 27, 22)' }]}>
        Translating Language
      </Text>
      <View style={styles.chipContainer}>
        <Chip
          style={[styles.chip, language === 'en' && styles.selectedChip]}
          onPress={() => setLanguage('en')}
        >
          English
        </Chip>
        <Chip
          style={[styles.chip, language === 'ta' && styles.selectedChip]}
          onPress={() => setLanguage('ta')}
        >
          Tamil
        </Chip>
        <Chip
          style={[styles.chip, language === 'es' && styles.selectedChip]}
          onPress={() => setLanguage('es')}
        >
          Spanish
        </Chip>
        <Chip
          style={[styles.chip, language === 'fr' && styles.selectedChip]}
          onPress={() => setLanguage('fr')}
        >
          French
        </Chip>
        <Chip
          style={[styles.chip, language === 'hi' && styles.selectedChip]}
          onPress={() => setLanguage('hi')}
        >
          Hindi
        </Chip>
      </View>
      
   
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    marginBottom: 10,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center', 
    marginBottom: 30,
  },
  button: {
    width: 50, 
    height: 50,           
    borderRadius: 25,     
    justifyContent: 'center',  
    alignItems: 'center',     
    marginHorizontal: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    height: 50,          
    borderWidth: 1,
    borderRadius: 25,  
    paddingHorizontal: 15, 
    flex: 1,             
    textAlign: 'center',  
    marginBottom: 0,     
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  chip: {
    margin: 8,
    opacity:0.5,
    paddingHorizontal: 16, 
    height: 40,
    justifyContent: 'center',
  },
  selectedChip: {
    opacity: 1, 
    background: '#ffcb21',
    color: '#fff',
  },
  selectedLanguage: {
    fontSize: 16,
    color: '#555',
    marginTop: 20,
  },
});
