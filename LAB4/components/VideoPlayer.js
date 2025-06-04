import React, { useRef, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Video } from 'expo-av';

export default function VideoPlayer() {
  const video1 = useRef(null);
  const video2 = useRef(null);
  const [status, setStatus] = useState({});

  return (
    <View style={styles.container}>
      <View style={styles.videoContainer}>
        <Text style={styles.title}>video1.mp4</Text>
        <Video
          ref={video1}
          style={styles.video}
          source={require('../assets/video/video.mp4')}
          useNativeControls
          resizeMode="contain"
          isLooping
        />
      </View>

      <View style={styles.videoContainer}>
        <Text style={styles.title}>video2.mp4</Text>
        <Video
          ref={video2}
          style={styles.video}
          source={require('../assets/video/video2.mp4')}
          useNativeControls
          resizeMode="contain"
          isLooping
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  videoContainer: {
    marginBottom: 20, 
    alignItems: 'center', 
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  video: {
    width: '90%',
    height: 250,
  },
});
