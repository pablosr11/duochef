import React from 'react';
import { View, Text } from 'react-native';
import AppNavigator from './navigationSetup';

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <AppNavigator />
    </View>
  );
}
