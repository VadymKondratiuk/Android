// components/AudioPlayer.js

import React, { useState } from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import { Audio } from 'expo-av';

export default function AudioPlayer() {
  const [sound, setSound] = useState(null); 
  const [status, setStatus] = useState({});
  const [playingAudio, setPlayingAudio] = useState(null); 

  const handleAudioPress = async (audioFile) => {
    if (playingAudio === audioFile) {
      if (sound) {
        await sound.stopAsync();
        setStatus({});
        setPlayingAudio(null); 
      }
    } else {
      if (sound) {
        await sound.stopAsync();
        setStatus({});
      }

      const { sound: newSound } = await Audio.Sound.createAsync(
        audioFile,
        { shouldPlay: true },
        setStatus
      );
      setSound(newSound);
      setPlayingAudio(audioFile);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Audio Player</Text>

      <View style={styles.audioContainer}>
        <Button
          title="audio1.mp3"
          onPress={() => handleAudioPress(require('../assets/audio/audio.mp3'))}
        />
      </View>

      <View style={styles.audioContainer}>
        <Button
          title="audio2.mp3"
          onPress={() => handleAudioPress(require('../assets/audio/audio2.mp3'))}
        />
      </View>
      <View style={styles.audioContainer}>
        <Button
          title="audio3.mp3"
          onPress={() => handleAudioPress(require('../assets/audio/audio3.mp3'))}
        />
      </View>
      <View style={styles.audioContainer}>
        <Button
          title="audio4.mp3"
          onPress={() => handleAudioPress(require('../assets/audio/audio4.mp3'))}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  audioContainer: {
    marginBottom: 20,
    width: '80%',
  },
});
