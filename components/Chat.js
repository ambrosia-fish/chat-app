// Import necessary components from React and React Native
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native';
// Import GiftedChat for chat UI
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
// Import Firestore functions
import { collection, query, orderBy, onSnapshot, addDoc } from "firebase/firestore";

// Define the Chat component
const Chat = ({ route, db }) => {
    // Destructure name, backgroundColor, and userID from route params
    const { name, backgroundColor, userID } = route.params;
    // Initialize messages state
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        // Create a query for the messages collection, ordered by createdAt in descending order
        const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));

        // Set up the onSnapshot listener
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setMessages(
                snapshot.docs.map(doc => ({
                    _id: doc.id,
                    createdAt: doc.data().createdAt.toDate(),
                    text: doc.data().text,
                    user: doc.data().user
                }))
            );
        });

        // Clean up function to unsubscribe from the listener when the component unmounts
        return () => unsubscribe();
    }, []);

    // Function to handle sending new messages
    const onSend = (newMessages) => {
        addDoc(collection(db, "messages"), newMessages[0]);
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
        <View style={[styles.container, { backgroundColor }]}>
            <GiftedChat
                messages={messages}
                renderBubble={renderBubble}
                onSend={messages => onSend(messages)}
                user={{
                    _id: userID,
                    name: name
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
    }
});

// Export the Chat component
export default Chat;