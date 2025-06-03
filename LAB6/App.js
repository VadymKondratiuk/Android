import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MenuScreen from './screens/MenuScreen';
import GameScreen from './screens/GameScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Menu"> 
        <Stack.Screen name="Menu" component={MenuScreen} options={{ title: 'Memory Game' }} />
        <Stack.Screen name="Game" component={GameScreen} options={{ title: 'Level' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
