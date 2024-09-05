// Imports
import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import { signInAnonymously } from "firebase/auth";
import { auth } from '../App';

// Start component
const Start = ({ navigation }) => {
  // State for username and background color
  const [name, setName] = useState('');
  const [chatBG, setChatBG] = useState('white');

  const colors = {
    blue: '#3498db',
    red: '#e74c3c',
    green: '#2ecc71',
    yellow: '#f1c40f'
  };

  // Function to sign in user anonymously and navigate to Chat screen
  const signInUser = () => {
    signInAnonymously(auth)
      .then(result => {
        navigation.navigate('Chat', { 
          userID: result.user.uid,
          name: name || name,
          backgroundColor: chatBG 
        });
      })
      .catch((error) => {
        Alert.alert("Authentication failed", error.message);
      });
  }
  return (
    <ImageBackground
      source={require('../assets/background.png')}
      resizeMode="cover"
      style={styles.image}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to Chat!</Text>
        <TextInput
          style={styles.textInput}
          value={name}
          onChangeText={setName}
          placeholder='Type your username here'
        />
        <View style={styles.colorSelector}>
          <TouchableOpacity
            style={[styles.colorButton, { backgroundColor: colors.blue }]}
            onPress={() => setChatBG(colors.blue)}
          />
          <TouchableOpacity
            style={[styles.colorButton, { backgroundColor: colors.red }]}
            onPress={() => setChatBG(colors.red)}
          />
          <TouchableOpacity
            style={[styles.colorButton, { backgroundColor: colors.green }]}
            onPress={() => setChatBG(colors.green)}
          />
          <TouchableOpacity
            style={[styles.colorButton, { backgroundColor: colors.yellow }]}
            onPress={() => setChatBG(colors.yellow)}
          />
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={signInUser}
        >
          <Text style={styles.buttonText}>Start Chatting</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  textInput: {
    width: "88%",
    padding: 15,
    borderWidth: 1,
    marginTop: 15,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
  },
  colorSelector: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  colorButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    margin: 10,
  },
  button: {
    backgroundColor: '#757083',
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  }
});

export default Start;