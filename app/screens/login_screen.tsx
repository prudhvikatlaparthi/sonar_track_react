import { View, Text, TextInput, TouchableOpacity, useWindowDimensions, Platform, Button, ActivityIndicator, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import Colors from '@/app/utils/colors';
import EditText from '@/app/components/edittext';
import MyButton from '@/app/components/mybutton';
import useApiCall from '@/app/hooks/use_api_call';
import ToastManager, { Toast } from 'toastify-react-native'
import { useRouter } from 'expo-router';
import LocalStorage from '../utils/local_storage';

const LoginScreen = () => {

  const router = useRouter(); // Initialize the router for navigation

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [containerWidth, setContainerWidth] = useState<'90%' | '70%' | '40%'>('90%'); // Default width for mobile devices

  const { width } = useWindowDimensions(); // Get the screen width

  useEffect(() => {
    const calWidth = width > 1000
      ? '40%'
      : width > 768
        ? '70%'
        : '90%';
    setContainerWidth(calWidth); // Set the container width based on the screen size
  }, [width]);
  const { data, loading, error, callApi } = useApiCall();

  const handleLogin = async (providedUsername?: string, providedPassword?: string) => {
    const loginUsername = providedUsername || username; // Use provided username or state value
    const loginPassword = providedPassword || password; // Use provided password or state value

    console.log('Login button pressed'); // Log the button press for debugging
    console.log('Username:', loginUsername); // Log the username for debugging
    if (!(loginUsername.trim() && loginPassword.trim())) {
      return Toast.error('Please enter username and password!'); // Show error toast if fields are empty
    }
    await callApi('authentication/validate', {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${btoa(`${loginUsername}:${loginPassword}`)}`, // Basic authentication header
        'Content-Type': 'application/json',
      }
    })
  }
  useEffect(() => {
    if (data) {
      if (data.valid === true) {
        if (username && password) {
          LocalStorage.setItem(LocalStorage.KEY_USER_NAME, username);
          LocalStorage.setItem(LocalStorage.KEY_PASSWORD, password);
        }

        Toast.success('Login successful!'); // Show success toast
        router.replace('/screens/projects'); // Navigate to the home screen on successful login
      }
      else {
        Toast.error('Invalid username or password!'); // Show error toast for invalid credentials
      }
    } else if (error) {
      Toast.error(error); // Show error toast if there's an error
    }
  }, [data, error]);


  useEffect(() => {
    const autoLogin = async () => {
      const storedUsername = await LocalStorage.getItem(LocalStorage.KEY_USER_NAME);
      const storedPassword = await LocalStorage.getItem(LocalStorage.KEY_PASSWORD);

      console.log('Stored Username:', storedUsername); // Log the stored username for debugging
      console.log('Stored Password:', storedPassword); // Log the stored password for debugging

      if (storedUsername != null && storedPassword != null) {
        console.log('Auto-login triggered'); // Log auto-login trigger
        setUsername(storedUsername);
        setPassword(storedPassword);
        handleLogin(storedUsername, storedPassword);        
      }
    }

    autoLogin(); // Call the autoLogin function on component mount
  }, []);

  return (
    <>
      <View style={{ backgroundColor: Colors.colorPrimaryDark, flex: 1 }}>

        <View style={{
          width: containerWidth,
          alignSelf: 'center',
          shadowColor: Colors.colorBlack,
          shadowOffset: { width: 0, height: 5 },
          shadowRadius: 3.84,
          marginTop: 80, backgroundColor: Colors.colorWhite, paddingBottom: 50, paddingTop: 20, paddingHorizontal: 20, borderRadius: 10
        }}>
          <Text style={{ fontSize: 20, alignSelf: 'center', fontFamily:'mont-bold' }}>S o n a r  T r a c k</Text>
          <Text style={{ fontSize: 16, marginTop: 10, alignSelf: 'center', fontFamily:'mont-semi-bold' }}>Hello there! 👋</Text>
          <EditText userName='Username' value={username} onChangeText={setUsername} containerStyle={{ marginTop: 10 }} />
          <EditText userName='Password' value={password} onChangeText={setPassword} containerStyle={{ marginTop: 10 }} secureTextEntry={true} />
          <MyButton text={"Login"} onPress={() => {            
            handleLogin();
          }} containerStyle={{ marginTop: 20 }} isLoading={loading} />

        </View>
      </View>
      <ToastManager style={{
        fontFamily: 'mont-bold', // Set your custom font family
        fontSize: 16, // Optional: Adjust font size
        color: Colors.colorPrimaryDark, // Optional: Adjust text color
      }} />
    </>
  )
}

export default LoginScreen;