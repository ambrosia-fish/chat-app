import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNetInfo } from "@react-native-community/netinfo";
import { Alert } from 'react-native';
import Start from './components/Start';
import Chat from './components/Chat';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';

// Firebase imports
import { initializeApp } from 'firebase/app';
import { getFirestore, disableNetwork, enableNetwork } from 'firebase/firestore';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';


const firebaseConfig = {
  apiKey: "AIzaSyD_MRxCX8f_1ltWELaTGEAebEZEY1aE3RM",
  authDomain: "chatapp-a7c2b.firebaseapp.com",
  projectId: "chatapp-a7c2b",
  storageBucket: "chatapp-a7c2b.appspot.com",
  messagingSenderId: "904009618756",
  appId: "1:904009618756:web:e886c63fae4ba62198f311",
  measurementId: "G-QFY2GBE99D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

// Initialize Firestore
const db = getFirestore(app);

const Stack = createNativeStackNavigator();

const App = () => {
  const connectionStatus = useNetInfo();
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert("Connection Lost!");
      disableNetwork(db);
      setIsConnected(false);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
      setIsConnected(true);
    }
  }, [connectionStatus.isConnected]);

  return (
    <ActionSheetProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Start">
          <Stack.Screen name="Start" component={Start} />
          <Stack.Screen name="Chat">
            {(props) => <Chat isConnected={isConnected} db={db} {...props} />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </ActionSheetProvider>
  );
}

export { db, auth };
export default App;