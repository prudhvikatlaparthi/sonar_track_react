import LoginScreen from '@/app/screens/login_screen';
import Projects from './screens/projects';
import { useFonts } from 'expo-font';
import { ActivityIndicator, View } from 'react-native';
import Colors from './utils/colors';

export default function Index() {
  // Load the fonts
  const [fontsLoaded] = useFonts({
    'mont-reg': require('../assets/fonts/Montserrat-Regular.ttf'),
    'mont-bold': require('../assets/fonts/Montserrat-Bold.ttf'),
    'mont-semi-bold': require('../assets/fonts/Montserrat-SemiBold.ttf'),
    'mont-medium': require('../assets/fonts/Montserrat-Medium.ttf'),
  });

  // Show a loading indicator while fonts are being loaded
  if (!fontsLoaded) {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <ActivityIndicator size="large" color={Colors.colorPrimaryDark} />
      </View>
    );
  }
  return (
    <LoginScreen />
  );
}
