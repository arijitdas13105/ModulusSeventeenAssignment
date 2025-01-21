

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/Screens/HomeScreen';
import AddTask from './src/Screens/AddTask';
import LoginSceeen from './src/Screens/LoginSceeen';
import SignUpScreen from './src/Screens/SignUpScreen';
import ProfileScreen from './src/Screens/ProfileScreen';
import { useSelector } from 'react-redux';
import TaskDetailsScreen from './src/Screens/TaskDetailsScreen';


const Stack=createNativeStackNavigator()


function App(): React.JSX.Element {
const isAuthenticated=useSelector((state)=>state.auth.isAuthenticated);
  return (
    <SafeAreaView style={{flex:1}}>
    <NavigationContainer>
<Stack.Navigator initialRouteName={isAuthenticated?"Home":"Login"}  screenOptions={{
    headerShown: false
  }}>
  <Stack.Screen name="Home" component={HomeScreen}/>
  <Stack.Screen name="AddTask" component={AddTask}/>
  <Stack.Screen name="Login" component={LoginSceeen}/>
  <Stack.Screen name="SignUp" component={SignUpScreen}/>
  <Stack.Screen name="Profile" component={ProfileScreen}/>
  <Stack.Screen name="TaskDetails" component={TaskDetailsScreen}    />
</Stack.Navigator>
    </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
