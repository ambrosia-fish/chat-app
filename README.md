# React Native Chat App

This is a mobile chat application built with React Native and Firebase, allowing users to send messages, images, and share their location.

## Features

- Real-time messaging
- Image sharing (from gallery and camera)
- Location sharing
- Offline message caching

## Prerequisites

Before you begin, ensure you have met the following requirements:
- Node.js (v12 or later)
- npm
- Expo CLI
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

## Setup and Installation

1. Clone the repository:
   ```
   git clone https://github.com/ambrosia-fish/chat-app.git
   cd chat-app
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up Firebase:
   - Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication, Firestore, and Storage in your Firebase project
   - Download the Firebase configuration file and replace the `firebaseConfig` object in `App.js` with your own configuration

4. Install necessary libraries:
   ```
   expo install firebase @react-navigation/native @react-navigation/native-stack 
   expo install react-native-screens react-native-safe-area-context
   expo install @react-native-async-storage/async-storage @react-native-community/netinfo
   expo install expo-image-picker expo-location react-native-maps
   expo install @expo/react-native-action-sheet
   ```

5. Start the development server:
   ```
   expo start
   ```

6. Run the app on your preferred platform:
   - For iOS: Press 'i' in the terminal or click 'Run on iOS simulator' in the Expo DevTools App browser tab
   - For Android: Press 'a' in the terminal or click 'Run on Android device/emulator' in the Expo DevTools browser tab
   - You can also run from a personal device on the same network using the Expo app from the App Store or Google Play Store

## Usage

1. Launch the app and enter your name on the Start screen
2. Tap "Start Chatting" to enter the chat room
3. Use the input field to type and send messages
4. Tap the "+" button to access additional options:
   - Choose an image from your device's library
   - Take a picture with the camera
   - Share your current location

## Contributing

Contributions to this project are welcome. Please fork the repository and submit a pull request with your changes.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
