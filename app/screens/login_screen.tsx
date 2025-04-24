import { View, Text, TextInput, TouchableOpacity, useWindowDimensions, Platform, Button, ActivityIndicator, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import Colors from '@/app/utils/colors';
import EditText from '@/app/components/edittext';
import MyButton from '@/app/components/mybutton';
import useApiCall from '@/app/hooks/use_api_call';
import ToastManager, { Toast } from 'toastify-react-native'
import { useRouter } from 'expo-router';

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

  const handleLogin = async () => {
    if(!(username.trim() && password.trim())){
      return Toast.error('Please enter username and password!'); // Show error toast if fields are empty
    }
    await callApi('authentication/validate', {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${btoa(`${username}:${password}`)}`, // Basic authentication header
        'Content-Type': 'application/json',
      }
    })
  }
  useEffect(() => {
    if (data && data.valid === true) {
      Toast.success('Login successful!'); // Show success toast
      router.replace('/screens/projects'); // Navigate to the home screen on successful login
    } else {
      Toast.error('Invalid username or password!'); // Show error toast for invalid credentials
    }
  }, [data, router]);

  return (
    <View style={{ backgroundColor: Colors.colorPrimaryDark, flex: 1 }}>

      <View style={{
        width: containerWidth,
        alignSelf: 'center',
        shadowColor: Colors.colorBlack,
        shadowOffset: { width: 0, height: 5 },
        shadowRadius: 3.84,
        marginTop: 80, backgroundColor: Colors.colorWhite, paddingBottom: 50, paddingTop: 20, paddingHorizontal: 20, borderRadius: 10
      }}>
        <Text style={{ fontSize: 20, fontWeight: '500', alignSelf: 'center' }}>S o n a r  T r a c k</Text>
        <Text style={{ fontSize: 16, marginTop: 10, alignSelf: 'center' }}>Hello there! 👋</Text>
        <EditText userName='Username' onChangeText={setUsername} containerStyle={{ marginTop: 10 }} />
        <EditText userName='Password' onChangeText={setPassword} containerStyle={{ marginTop: 10 }} secureTextEntry={true} />        
        <MyButton text={"Login"} onPress={handleLogin} containerStyle={{ marginTop: 20 }} isLoading={loading} />

      </View>
      <ToastManager />
    </View>
  )
}

export default LoginScreen;