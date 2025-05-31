import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';
import { Magnetometer } from 'expo-sensors';

export default function App() {
  const [magnetometer, setMagnetometer] = useState(0);
  const animatedRotation = useState(new Animated.Value(0))[0];

  useEffect(() => {
    const subscription = Magnetometer.addListener((data) => {
      const { x, y } = data;
      let angle = Math.atan2(y, x) * (180 / Math.PI);
      angle = angle >= 0 ? angle : 360 + angle;
      setMagnetometer(angle);
    });

    Magnetometer.setUpdateInterval(100);

    return () => subscription.remove();
  }, []);

  useEffect(() => {
    Animated.timing(animatedRotation, {
      toValue: -magnetometer, 
      duration: 100,
      useNativeDriver: true,
    }).start();
  }, [magnetometer]);

  const rotation = animatedRotation.interpolate({
    inputRange: [-360, 0],
    outputRange: ['-360deg', '0deg'],
  });

  const direction = getDirectionLabel(magnetometer);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Compass</Text>

      <View style={styles.compassContainer}>
        <Text style={styles.arrow}>⬆️</Text>

        <Animated.View style={[styles.dial, { transform: [{ rotate: rotation }] }]}>
          <Text style={[styles.label, styles.north]}>N</Text>
          <Text style={[styles.label, styles.east]}>E</Text>
          <Text style={[styles.label, styles.south]}>S</Text>
          <Text style={[styles.label, styles.west]}>W</Text>
        </Animated.View>
      </View>

      <Text style={styles.text}>{Math.round(magnetometer)}° {direction}</Text>
    </View>
  );
}

function getDirectionLabel(angle) {
  if (angle >= 337.5 || angle < 22.5) return 'N';
  if (angle >= 22.5 && angle < 67.5) return 'NE';
  if (angle >= 67.5 && angle < 112.5) return 'E';
  if (angle >= 112.5 && angle < 157.5) return 'SE';
  if (angle >= 157.5 && angle < 202.5) return 'S';
  if (angle >= 202.5 && angle < 247.5) return 'SW';
  if (angle >= 247.5 && angle < 292.5) return 'W';
  if (angle >= 292.5 && angle < 337.5) return 'NW';
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 32,
    color: '#0ff',
    marginBottom: 40,
    fontWeight: 'bold',
  },
  compassContainer: {
    width: 400,
    height: 400,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrow: {
    position: 'absolute',
    fontSize: 60,
    color: '#0f0',
    zIndex: 2,
  },
  dial: {
    width: 250,
    height: 250,
    borderRadius: 120,
    borderWidth: 2,
    borderColor: '#0ff',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
  label: {
    position: 'absolute',
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
  north: {
    top: 10,
    left: '50%',
    transform: [{ translateX: -10 }],
  },
  east: {
    right: 10,
    top: '50%',
    transform: [{ translateY: -10 }],
  },
  south: {
    bottom: 10,
    left: '50%',
    transform: [{ translateX: -10 }],
  },
  west: {
    left: 10,
    top: '50%',
    transform: [{ translateY: -10 }],
  },
  text: {
    fontSize: 24,
    color: '#fff',
    marginTop: 20,
  },
});
