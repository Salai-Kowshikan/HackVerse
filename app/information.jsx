import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Markdown from 'react-native-markdown-display';

const Information = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Markdown style={markdownStyles}>
        {`# Mithran: Empowering Learning for Everyone

When it comes to mental health disabilities, the general population of India is largely unaware of them. This is even more pronounced in the case of specific learning disabilities such as dyslexia, which are less apparent. While awareness is improving in modern times, and special attention is now given to students with such disabilities in schools, the support often falls short as higher education becomes more complicated.

## Our Solution

*Mithran* aims to provide an easy-to-use tool to help these students learn in a simpler and more effective way. Inspired by the impressive yet simple explanations provided by the Modellake from Plotch.ai, we envisioned leveraging it to build a solution that could support learners from school through graduation—a goal that remains a distant dream for many individuals with learning disabilities.

## Accessibility at the Core

With accessibility in mind, our app follows a *dyslexia-friendly color theme*, featuring light pastel backgrounds and dark text for better readability. Users can customize the app to fit their needs. Upon opening, the app immediately launches the camera—a feature inspired by Snapchat—allowing users to quickly capture anything before the opportunity is gone.

## Features

Using the app, users can:
- Borrow their friend's class notes and transform them into a digital format.
- Organize notes using tags in the cloud.
- Access these notes and:
  - *Explain* the content in simpler terms.
  - *Translate* it into their local language.
  - Perform *grammatical and spell checks* as well as formatting.

Powered by *Groclake*, all these functionalities are seamlessly integrated, providing exceptional responses, including the ability to simplify complex topics like automata.

## Future Developments

We have exciting plans for future development, including:
- *Digitizing conceptual diagrams and flowcharts* using an RCNN pipeline, allowing users to edit them within the app and receive explanations.
- Capturing pictures of *electrical and logic circuits* and simulating them virtually in the app.

## Closing Thoughts

Don’t let disabilities stop you from becoming who you want to be. *Mithran* will be your companion throughout your journey.
`}
      </Markdown>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: 'rgb(255, 251, 255)',
  },
});

const markdownStyles = {
  heading1: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'rgb(30, 27, 22)',
    marginBottom: 10,
  },
  heading2: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'rgb(30, 27, 22)',
    marginBottom: 8,
  },
  paragraph: {
    fontSize: 16,
    color: 'rgb(30, 27, 22)',
    marginBottom: 10,
  },
  listItemText: {
    fontSize: 16,
    color: 'rgb(30, 27, 22)',
  },
  em: {
    fontStyle: 'italic',
  },
  strong: {
    fontWeight: 'bold',
  },
};

export default Information;
