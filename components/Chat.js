// Imports
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native';
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';
import { collection, query, orderBy, onSnapshot, addDoc } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomActions from './CustomActions'
import MapView from 'react-native-maps';

// Chat component
const Chat = ({ route, db, isConnected, storage }) => {
  // Extract parameters passed from the Start screen
  const { name, backgroundColor, userID } = route.params;
  // State to store chat messages
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    let unsubscribe;
    if (isConnected === true) {
      // If connected to the internet, set up real-time listener for messages
      const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
      unsubscribe = onSnapshot(q, (documentsSnapshot) => {
        let newMessages = [];
        documentsSnapshot.forEach(doc => {
          // Convert Firestore timestamp to Date object for proper display
          newMessages.push({ id: doc.id, ...doc.data(), createdAt: doc.data().createdAt.toDate() })
        });
        cacheMessages(newMessages); // Cache messages for offline use
        setMessages(newMessages);
      });
    } else {
      // If offline, load cached messages from AsyncStorage
      loadCachedMessages();
    }

    // Cleanup function to unsubscribe from the listener when component unmounts
    return () => {
      if (unsubscribe) unsubscribe();
    }
  }, [isConnected]); // Re-run effect when connection status changes

  // Load messages from AsyncStorage when offline
  const loadCachedMessages = async () => {
    const cachedMessages = await AsyncStorage.getItem("messages") || '[]';
    setMessages(JSON.parse(cachedMessages));
  }

  // Cache messages in AsyncStorage for offline access
  const cacheMessages = async (messagesToCache) => {
    try {
      await AsyncStorage.setItem('messages', JSON.stringify(messagesToCache));
    } catch (error) {
      console.log(error.message);
    }
  }

  // Send a new message
  // This function adds the new message to Firestore
  const onSend = (newMessages) => {
    addDoc(collection(db, "messages"), newMessages[0])
  }

  // Customize chat bubble appearance
  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: { backgroundColor: "#000" }, // User's messages
          left: { backgroundColor: "#FFF" }   // Other participants' messages
        }}
      />
    )
  }

  // Render input toolbar only when connected to internet
  // This prevents users from trying to send messages when offline
  const renderInputToolbar = (props) => {
    if (isConnected) {
      return <InputToolbar {...props} />;
    } else {
      return null; // Don't render the input toolbar when offline
    }
  }

  // Render custom actions (e.g., image upload, location sharing)
  // This integrates the CustomActions component
  const renderCustomActions = (props) => {
    return <CustomActions storage={storage} userID={userID} {...props} />;
  };

  // Render custom view for location messages
  // This displays a map when a location is shared in the chat
  const renderCustomView = (props) => {
    const { currentMessage} = props;
    if (currentMessage.location) {
      return (
          <MapView
            style={{width: 150,
              height: 100,
              borderRadius: 13,
              margin: 3}}
            region={{
              latitude: currentMessage.location.latitude,
              longitude: currentMessage.location.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          />
      );
    }
    return null;
  }

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
        renderActions={renderCustomActions}
        renderCustomView={renderCustomView}
        onSend={messages => onSend(messages)}
        user={{ _id: userID, name: name }}
      />
      {/* KeyboardAvoidingView is used to prevent the keyboard from covering the chat input on Android */}
      {Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
    </View>
  )
};

// Styles for the Chat component
const styles = StyleSheet.create({
  container: {
    flex: 1, // This ensures the chat takes up all available space
  }
});

export default Chat;