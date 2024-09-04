import { StyleSheet, View, Text, Alert } from 'react-native';
import { TouchableOpacity } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import MapView from 'react-native-maps';
import { useActionSheet } from '@expo/react-native-action-sheet';

const CustomActions = ({wrapperStyle, iconTextStyle, onSend }) => {
    const actionSheet = useActionSheet();
    const onActionPress = () => {
        const options = ['Choose From Library', 'Take Picture', 'Send Location', 'Cancel'];
        const cancelButtonIndex = options.length - 1;
        actionSheet.showActionSheetWithOptions(
          {
            options,
            cancelButtonIndex,
          },
          async (buttonIndex) => {
            switch (buttonIndex) {
              case 0:
                pickImage();
                return;
              case 1:
                takePhoto();
                return;
              case 2:
                getLocation();
              default:
            }
          },
        );
      };

      const getLocation = async () => {
        let permissions = await Location.requestForegroundPermissionsAsync();
        if (permissions?.granted) {
          const location = await Location.getCurrentPositionAsync({});
          if (location) {
            onSend({
              location: {
                longitude: location.coords.longitude,
                latitude: location.coords.latitude,
              },
            });
          } else Alert.alert("Error occurred while fetching location");
        } else Alert.alert("Permissions haven't been granted.");
      }

  return (
    <TouchableOpacity 
        style={styles.container}
        onPress={onActionPress}>
            <View style={[styles.wrapper, wrapperStyle]}>
                <Text style={[styles.iconText, iconTextStyle]}>+</Text>
            </View>
    </TouchableOpacity>
  );
}

export default CustomActions;

const styles = StyleSheet.create({
    container: {
        width: 26,
        height: 26,
        marginLeft: 10,
        marginBottom: 10,
      },
      wrapper: {
        borderRadius: 13,
        borderColor: '#b2b2b2',
        borderWidth: 2,
        flex: 1,
        justifyContent: 'center', // Center content vertically
        alignItems: 'center',     // Center content horizontally
      },
      iconText: {
        color: '#b2b2b2',
        fontWeight: 'bold',
        fontSize: 16,             // Increase font size for better visibility
        backgroundColor: 'transparent',
        textAlign: 'center',
        textAlignVertical: 'center', // This helps on Android
        includeFontPadding: false,   // This removes extra padding around text
        lineHeight: 19,              // Adjust this to match your font size
    },
  });