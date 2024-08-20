// Import necessary components from React and React Native
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, KeyboardAvoidingView, Platform } from 'react-native';
// Import GiftedChat for chat UI
import { GiftedChat, Bubble } from 'react-native-gifted-chat';

// Define the Chat component
const Chat = ({ route }) => {
    // Destructure name and backgroundColor from route params
    const { name, backgroundColor } = route.params;
    // Initialize messages state
    const [messages, setMessages] = useState([]);

    // Use effect to set initial messages when component mounts
    useEffect(() => {
        setMessages([
          {
            _id: 1,
            text: "Hello developer",
            createdAt: new Date(),
            user: {
              _id: 2,
              name: "React Native",
              avatar: "https://placeimg.com/140/140/any",
            },
          },
          {
            _id: 2,
            text: 'This is a system message',
            createdAt: new Date(),
            system: true,
          },
        ]);
      }, []);

    // Function to handle sending new messages
    const onSend = (newMessages) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages))
    }

    // Custom render function for chat bubbles
    const renderBubble = (props) => {
        return <Bubble
          {...props}
          wrapperStyle={{
            right: {
              backgroundColor: "#000"
            },
            left: {
              backgroundColor: "#FFF"
            }
          }}
        />
    }

    // Render the chat interface
    return (
        <View style={styles.container}>
            <GiftedChat
                messages={messages}
                renderBubble={renderBubble}
                onSend={messages => onSend(messages)}
                user={{
                    _id: 1
                }}
            />
            {/* Add KeyboardAvoidingView for Android to handle keyboard */}
            { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null }
        </View>
    )
};

// Define styles for the component
const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    heading: {
        fontSize: 50,
        fontWeight: 'bold',
    }
});

// Export the Chat component
export default Chat;