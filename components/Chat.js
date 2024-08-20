import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
// Import necessary components from React and React Native
import React, { useState, useEffect } from 'react';

const Chat = ({ route }) => {
    const { name, backgroundColor } = route.params;

    // Use effect to set initial messages when component mounts
    useEffect(() => {
      }, []);
    return (
        <View style={[styles.container, { backgroundColor }]}>
            <Text style={styles.heading}>{name}</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center'
    },
    heading: {
        fontSize: 50,
        fontWeight: 'bold',
    }
});

export default Chat;