import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts, Fraunces_700Bold } from '@expo-google-fonts/fraunces';
import { DMSans_400Regular, DMSans_500Medium } from '@expo-google-fonts/dm-sans';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../src/navigation/types';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>;
};

export default function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [fontsLoaded] = useFonts({
    Fraunces_700Bold,
    DMSans_400Regular,
    DMSans_500Medium,
  });

  if (!fontsLoaded) return null;

  const validateEmail = (value: string) => {
    setEmail(value);
    if (value.length > 0 && !value.includes('@')) {
      setEmailError('O e-mail deve conter @');
    } else {
      setEmailError('');
    }
  };

  const validatePassword = (value: string) => {
    setPassword(value);
    if (value.length > 0 && value.length < 6) {
      setPasswordError('A senha deve ter pelo menos 6 caracteres');
    } else {
      setPasswordError('');
    }
  };

  const handleLogin = () => {
    let valid = true;

    if (!email.includes('@') || email.length === 0) {
      setEmailError('Insira um e-mail válido com @');
      valid = false;
    }

    if (password.length < 6) {
      setPasswordError('A senha deve ter pelo menos 6 caracteres');
      valid = false;
    }

    if (valid) {
      console.log('Login com:', email, password);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAF7F2" />

      {/* Seta voltar */}
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} activeOpacity={0.7}>
        <Ionicons name="arrow-back" size={22} color="#C8233C" />
      </TouchableOpacity>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">

          <Text style={styles.title}>Bem-vindo(a) de volta!</Text>

          {/* Campo e-mail */}
          <View style={styles.inputWrapper}>
            <TextInput
              style={[styles.input, emailError ? styles.inputError : null]}
              placeholder="Insira seu e-mail"
              placeholderTextColor="#aaa"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={validateEmail}
            />
            {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
          </View>

          {/* Campo senha */}
          <View style={styles.inputWrapper}>
            <View style={styles.passwordWrapper}>
              <TextInput
                style={[styles.input, styles.passwordInput, passwordError ? styles.inputError : null]}
                placeholder="Insira sua senha"
                placeholderTextColor="#aaa"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={validatePassword}
                underlineColorAndroid="transparent"
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeButton}
                activeOpacity={0.7}
              >
                <Ionicons
                  name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={20}
                  color="#aaa"
                />
              </TouchableOpacity>
            </View>
            {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
          </View>

          {/* Botão Entrar */}
          <TouchableOpacity style={styles.button} onPress={handleLogin} activeOpacity={0.85}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>

          {/* Esqueci a senha */}
          <TouchableOpacity activeOpacity={0.7}>
            <Text style={styles.forgotText}>Esqueci a senha</Text>
          </TouchableOpacity>

          {/* Divisor */}
          <View style={styles.divider} />

          {/* Botão Google */}
          <TouchableOpacity style={styles.googleButton} activeOpacity={0.85}>
            <Text style={styles.googleIcon}>G</Text>
            <Text style={styles.googleText}>Continuar com Google</Text>
          </TouchableOpacity>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF7F2',
  },
  backBtn: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 4,
    alignSelf: 'flex-start',
  },
  keyboardView: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
    paddingHorizontal: 28,
    paddingTop: 24,
    paddingBottom: 40,
  },
  title: {
    fontFamily: 'Fraunces_700Bold',
    fontSize: 28,
    color: '#C8233C',
    textAlign: 'center',
    marginBottom: 40,
  },
  inputWrapper: {
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#ffffff',
    borderRadius: 50,
    paddingVertical: 16,
    paddingHorizontal: 20,
    color: '#1a0000',
    fontSize: 14,
    fontFamily: 'DMSans_400Regular',
    borderWidth: 1,
    borderColor: '#e8e0d5',
  },
  passwordWrapper: {
    position: 'relative',
    justifyContent: 'center',
  },
  passwordInput: {
    paddingRight: 52,
  },
  eyeButton: {
    position: 'absolute',
    right: 20,
    padding: 4,
  },
  inputError: {
    borderColor: '#C8233C',
  },
  errorText: {
    color: '#C8233C',
    fontSize: 12,
    fontFamily: 'DMSans_400Regular',
    marginTop: 6,
    marginLeft: 16,
  },
  button: {
    backgroundColor: '#C8233C',
    borderRadius: 50,
    paddingVertical: 18,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 20,
  },
  buttonText: {
    fontFamily: 'DMSans_500Medium',
    color: '#ffffff',
    fontSize: 16,
  },
  forgotText: {
    fontFamily: 'DMSans_400Regular',
    color: '#1a0000',
    fontSize: 14,
    textAlign: 'center',
    opacity: 0.6,
  },
  divider: {
    height: 1,
    backgroundColor: '#e8e0d5',
    marginVertical: 28,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#e8e0d5',
    backgroundColor: '#ffffff',
    paddingVertical: 16,
    gap: 10,
  },
  googleIcon: {
    fontSize: 18,
    fontWeight: '700',
    color: '#4285F4',
  },
  googleText: {
    fontFamily: 'DMSans_400Regular',
    color: '#1a0000',
    fontSize: 15,
  },
});