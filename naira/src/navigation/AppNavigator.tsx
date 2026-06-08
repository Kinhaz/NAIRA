import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';

import WelcomeScreen from '../../components/WelcomeScreen';
import LoginScreen from '../../components/LoginScreen';
import RegisterScreen from '../../components/RegisterScreen';
import ProfileScreen from '../../components/ProfileScreen';
import DonateScreen from '../../components/DonateScreen';
import HomeScreen from '../../components/HomeScreen';
import LoadingScreen from '../../components/LoadingScreen';
import QuizScreen from '../../components/QuizScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Olá"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Olá" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Donate" component={DonateScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Loading" component={LoadingScreen} />
      <Stack.Screen name="Quiz" component={QuizScreen} />
    </Stack.Navigator>
  );
}