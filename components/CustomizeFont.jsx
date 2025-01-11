import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useFontSettings } from '@/components/FontContext';

export default function CustomizeFont() {
  const { fontSettings, updateFontSettings } = useFontSettings();
  const [fontSizeInput, setFontSizeInput] = useState(fontSettings.fontSize.toString());
  const [lineHeightInput, setLineHeightInput] = useState(fontSettings.lineHeight.toString());

  const updateFontSize = () => {
    const size = parseInt(fontSizeInput, 10);
    if (!isNaN(size) && size >= 12 && size <= 70) {
      updateFontSettings({ fontSize: size });
    } else {
      alert('Please enter a valid font size between 12 and 32.');
    }
  };

  const updateLineHeight = () => {
    const height = parseInt(lineHeightInput, 10);
    if (!isNaN(height) && height >= 16 && height <= 70) {
      updateFontSettings({ lineHeight: height });
    } else {
      alert('Please enter a valid line spacing between 16 and 40.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { fontSize: fontSettings.fontSize, lineHeight: fontSettings.lineHeight }]}>
        Font Size: {fontSettings.fontSize}
      </Text>
      <View style={styles.row}>
        <TouchableOpacity style={styles.button} onPress={() => updateFontSettings({ fontSize: fontSettings.fontSize - 1 })}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => updateFontSettings({ fontSize: fontSettings.fontSize + 1 })}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.input}
        keyboardType="number-pad"
        value={fontSizeInput}
        onChangeText={setFontSizeInput}
        onBlur={updateFontSize}
        placeholder="Enter Font Size"
      />

      <Text style={[styles.label, { fontSize: fontSettings.fontSize, lineHeight: fontSettings.lineHeight }]}>
        Line Spacing: {fontSettings.lineHeight}
      </Text>
      <View style={styles.row}>
        <TouchableOpacity style={styles.button} onPress={() => updateFontSettings({ lineHeight: fontSettings.lineHeight - 1 })}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => updateFontSettings({ lineHeight: fontSettings.lineHeight + 1 })}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.input}
        keyboardType="number-pad"
        value={lineHeightInput}
        onChangeText={setLineHeightInput}
        onBlur={updateLineHeight}
        placeholder="Enter Line Spacing"
      />
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
    backgroundColor: '#2196F3',
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
});
