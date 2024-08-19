import { useState } from 'react';
import { StyleSheet, View, Text, Button, TextInput, ImageBackground, TouchableOpacity  } from 'react-native';

const Start = ({ navigation }) => {
  const [name, setName] = useState('');
  const [chatBG, setChatBG] = useState('white')

  const colors = {
    blue: '#3498db',
    red: '#e74c3c',
    green: '#2ecc71',
    yellow: '#f1c40f'
  };

  return (
    <ImageBackground
            source={require('../assets/background.png')}
            resizeMode="cover"
            style={styles.image}
        >
        <View style={styles.container}>
            <Text>Welcome to Chat!</Text>
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
            <Button
                title="Join Chat"
                onPress={() => navigation.navigate('Chat', { name: name, backgroundColor: chatBG })}
            />
        </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
     justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    width: "88%",
    padding: 15,
    borderWidth: 1,
    marginTop: 15,
    marginBottom: 15,
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  colorButton: {
    width: 50,
    height: 50,
    backgroundColor: 'blue',
    borderRadius: 25,
    margin: 25,
  },
  colorSelector: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  }
});

export default Start;