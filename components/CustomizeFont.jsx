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

  // Handle font size and line height button clicks
  const handleFontSizeChange = (delta) => {
    const newSize = fontSettings.fontSize + delta;
    if (newSize >= 12 && newSize <= 70) {
      updateFontSettings({ fontSize: newSize });
      setFontSizeInput(newSize.toString());  // Update text field value
    }
  };

  const handleLineHeightChange = (delta) => {
    const newHeight = fontSettings.lineHeight + delta;
    if (newHeight >= 16 && newHeight <= 70) {
      updateFontSettings({ lineHeight: newHeight });
      setLineHeightInput(newHeight.toString());  // Update text field value
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
    alignItems: 'center',  // Ensures all items are vertically centered
    marginBottom: 30,
  },
  button: {
    width: 50,            // Fixed width
    height: 50,           // Fixed height for the button
    borderRadius: 25,     // Circular button
    justifyContent: 'center',  // Centers text inside the button
    alignItems: 'center',      // Centers text inside the button
    marginHorizontal: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    height: 50,           // Matches button height
    borderWidth: 1,
    borderRadius: 25,     // Rounded corners to match buttons
    paddingHorizontal: 15,  // Adjust padding for better alignment
    flex: 1,              // Makes the input take up the remaining space
    textAlign: 'center',  // Centers text inside the input field
    marginBottom: 0,      // Ensures no extra margin is added at the bottom
  },
});
