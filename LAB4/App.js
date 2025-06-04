// App.js

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import VideoPlayer from './components/VideoPlayer';
import AudioPlayer from './components/AudioPlayer';


export default function App() {
  const [screen, setScreen] = useState('Home');

  const renderBackButton = () => (
    <TouchableOpacity style={styles.backButton} onPress={() => setScreen('Home')}>
      <Text style={styles.backButtonText}>← Назад</Text>
    </TouchableOpacity>
  );

  const renderScreen = () => {
    if (screen === 'VideoPlayer') {
      return (
        <View style={styles.screenContainer}>
          {renderBackButton()}
          <VideoPlayer />
        </View>
      );
    }

    if (screen === 'AudioPlayer') {
      return (
        <View style={styles.screenContainer}>
          {renderBackButton()}
          <AudioPlayer />
        </View>
      );
    }

    return (
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => setScreen('VideoPlayer')}>
          <Text style={styles.buttonText}>Video Player</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => setScreen('AudioPlayer')}>
          <Text style={styles.buttonText}>Audio Player</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return <View style={styles.container}>{renderScreen()}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    alignItems: 'center',
    width: '100%',
  },
  screenContainer: {
    flex: 1,
    width: '100%',
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    flex: 1,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButton: {
    alignSelf: 'flex-start',
    marginLeft: 20,
    marginBottom: 10,
    padding: 10,
  },
  backButtonText: {
    color: '#007AFF',
    fontSize: 16,
  },
  placeholder: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 50,
  },
});
