import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from './StackNavigator';
import { AuthProvider } from './services/useAuth';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

import SplashScreen from 'react-native-splash-screen'

export default function App() {
  setTimeout(function(){SplashScreen.hide()} , 3000) ;
  return (
    <NavigationContainer>
        <AuthProvider>
          <StackNavigator/>
        </AuthProvider>
    </NavigationContainer>
  );
}