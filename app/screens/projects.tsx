import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect } from 'react'
import Colors from '../utils/colors'
import GroupProjectItem from '../components/group_project_item'
import useApiCall from '../hooks/use_api_call'
import { ScreenStack } from 'react-native-screens'
import { Stack, useRouter } from 'expo-router'
import LocalStorage from '../utils/local_storage'

const Projects = () => {
  const router = useRouter(); // Initialize the router for navigation
  const { data, loading, error, callApi } = useApiCall();
  useEffect(() => {
    const getProjects = async () => {
      await callApi('components/search_projects', {
        method: 'GET',
      })
    }
    getProjects();
  }, []);

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          console.log('User logged out');
          await LocalStorage.clear();
          router.replace('/screens/login_screen'); // Navigate to login screen
          // Navigate to login screen or clear user session
        },
      },
    ]);
  };


  return (
    <View style={{ flex: 1, paddingHorizontal: 10, marginVertical: 8, backgroundColor: Colors.colorWhite }}>
      {/* Display error message if there's an error */}
      {error && <Text style={{ color: Colors.colorRed, fontFamily:'mont-semi-bold' }}>{error}</Text>}

      {/* Show loading indicator while data is being fetched */}
      {loading || !data ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={Colors.colorPrimaryDark} />
        </View>
      ) : (
        // Render FlatList only if data.components exists
        <FlatList
          data={
            data?.components?.map((item) => item.name.split('-')[0].toUpperCase())?.filter((item, index, self) => index === self.findIndex((t) => t === item)) || []
          }
          numColumns={2}
          keyExtractor={(item) => item}          
          renderItem={({ item }) => <GroupProjectItem name={item} />}
        />
      )}

      {/* Header configuration */}
      <Stack.Screen
        options={{
          headerTitle: 'Projects',
          headerTitleStyle: {
            fontFamily: 'mont-bold', // Set the custom font family
            fontSize: 18, // Optional: Adjust the font size
            color: Colors.colorPrimaryDark,
          },
          headerShown: true,
          headerTitleAlign: 'center',
          headerRight: () => (
            <TouchableOpacity onPress={handleLogout} style={{ marginRight: 10 }}>
              <Text style={{ color: Colors.colorRed, fontFamily:'mont-bold' }}>Logout</Text>
            </TouchableOpacity>
          ),
        }}
      />
    </View>
  );
}

export default Projects
