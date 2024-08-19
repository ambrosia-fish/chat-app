import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const Chat = ({ route }) => {
    const { name, backgroundColor } = route.params;

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