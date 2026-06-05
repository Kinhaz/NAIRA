import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';

// ========================================
// Importe suas screens aqui
// ========================================
import WelcomeScreen from '../../components/WelcomeScreen';
// import LoginScreen from '../../components/LoginScreen';
// import RegisterScreen from '../../components/RegisterScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Olá"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Olá" component={WelcomeScreen} />
      {/* <Stack.Screen name="Login" component={LoginScreen} /> */}
      {/* <Stack.Screen name="Register" component={RegisterScreen} /> */}
    </Stack.Navigator>
  );
}