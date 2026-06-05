import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts, Fraunces_700Bold } from '@expo-google-fonts/fraunces';
import { DMSans_400Regular, DMSans_500Medium } from '@expo-google-fonts/dm-sans';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../src/navigation/types';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Olá'>;
};

export default function WelcomeScreen({ navigation }: Props) {
  const [isDark, setIsDark] = useState(true);

  const [fontsLoaded] = useFonts({
    Fraunces_700Bold,
    DMSans_400Regular,
    DMSans_500Medium,
  });

  if (!fontsLoaded) return null;

  const theme = {
    background: isDark ? '#1a0000' : '#FAF7F2',
    title: isDark ? '#e8162a' : '#c0182b',
    subtitle: isDark ? '#ffffff' : '#1a0000',
    toggleIcon: isDark ? '☀️' : '🌙',
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={theme.background}
      />

      {/* Botão de tema */}
      <TouchableOpacity
        style={styles.themeToggle}
        onPress={() => setIsDark(!isDark)}
        activeOpacity={0.7}
      >
        <Text style={styles.themeToggleIcon}>{theme.toggleIcon}</Text>
      </TouchableOpacity>

      {/* Logo / Título */}
      <View style={styles.logoContainer}>
        <Text style={[styles.title, { color: theme.title }]}>NAIRA</Text>
        <Text style={[styles.subtitle, { color: theme.subtitle }]}>Doe. Conecte. Salve</Text>
      </View>

      {/* Botões */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.85}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.85}
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 80,
    paddingHorizontal: 32,
  },
  themeToggle: {
    position: 'absolute',
    top: 56,
    right: 24,
    zIndex: 10,
    padding: 8,
  },
  themeToggleIcon: {
    fontSize: 22,
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Fraunces_700Bold',
    fontSize: 52,
    letterSpacing: 2,
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'DMSans_400Regular',
    fontSize: 14,
    letterSpacing: 0.5,
    opacity: 0.9,
  },
  buttonsContainer: {
    width: '100%',
    gap: 16,
  },
  button: {
    backgroundColor: '#c0182b',
    borderRadius: 50,
    paddingVertical: 18,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    fontFamily: 'DMSans_500Medium',
    fontSize: 16,
    color: '#ffffff',
    letterSpacing: 0.3,
  },
});