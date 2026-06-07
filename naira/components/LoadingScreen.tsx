import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated, Easing } from "react-native";
import { useFonts, Fraunces_700Bold } from '@expo-google-fonts/fraunces';

export default function LoadingScreen({ navigation }: { navigation?: any }) {
  const rotation = useRef(new Animated.Value(0)).current;

  const [fontsLoaded] = useFonts({ Fraunces_700Bold });

  useEffect(() => {
    // Animação de giro infinita
    Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 8000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    // Navega para a tela inicial após 3 segundos
    const timer = setTimeout(() => {
      navigation?.replace("Home");
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const rotate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  if (!fontsLoaded) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Com base nas suas respostas, vamos te conectar às melhores oportunidades para salvar vidas.
      </Text>
      <Animated.View style={[styles.spinner, { transform: [{ rotate }] }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF7F2",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
    gap: 32,
  },
  text: {
    fontFamily: "Fraunces_700Bold",
    fontSize: 22,
    color: "#C8233C",
    textAlign: "center",
    lineHeight: 32,
  },
  spinner: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: "#e8d0d4",
    borderTopColor: "#C8233C",
  },
});