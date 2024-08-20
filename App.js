// Import necessary navigation components
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import custom components
import Start from './components/Start';
import Chat from './components/Chat';

// Create a stack navigator
const Stack = createNativeStackNavigator();

// Define the main App component
const App = () => {
  return (
    // Wrap the entire app in NavigationContainer
    <NavigationContainer>
      {/* Set up the navigator with Start as the initial route */}
      <Stack.Navigator
        initialRouteName="Start"
      >
        {/* Define the Start screen */}
        <Stack.Screen
          name="Start"
          component={Start}
        />
        {/* Define the Chat screen */}
        <Stack.Screen
          name="Chat"
          component={Chat}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Export the App component as the default export
export default App;