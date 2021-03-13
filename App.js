import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import Intro from './app/screens/Intro';
import NoteScreen from './app/screens/NoteScreen';
import NoteDetail from './app/components/NoteDetail';

const Stack = createStackNavigator();

export default function App() {
  const [user, setUser] = useState({});
  const findUser = async () => {
    const result = await AsyncStorage.getItem('user');
    if (result !== null) {
      setUser(JSON.parse(result));
    }
  };

  useEffect(() => {
    findUser();
  }, []);

  const renderNoteScreen = props => <NoteScreen {...props} user={user} />;

  if (!user.name) return <Intro onFinish={findUser} />;
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerTitle: '', headerTransparent: true }}
      >
        <Stack.Screen component={renderNoteScreen} name='NoteScreen' />
        <Stack.Screen component={NoteDetail} name='NoteDetail' />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
