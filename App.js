import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from './StackNavigator';
import { AuthProvider } from './services/useAuth';

import { LogBox } from 'react-native';
LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications


export default function App() {
  return (
    <NavigationContainer>
        <AuthProvider>
          <StackNavigator/>
        </AuthProvider>
    </NavigationContainer>
  );
}