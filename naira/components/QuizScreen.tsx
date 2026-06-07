import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  TextInput,
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFonts, Fraunces_700Bold } from '@expo-google-fonts/fraunces';
import { DMSans_400Regular, DMSans_500Medium } from '@expo-google-fonts/dm-sans';

const { width } = Dimensions.get("window");

const COLORS = {
  bg: "#FAF7F2",
  card: "#ffffff",
  cardBorder: "#e8e0d5",
  cardSelected: "#fde8eb",
  borderSelected: "#C8233C",
  red: "#c0392b",
  pink: "#C8233C",
  white: "#ffffff",
  gray: "#888888",
  grayDark: "#d0c8be",
  inputBg: "#f5f0ea",
  text: "#1a0000",
};

type Question =
  | { type: "options"; text: string; options: { label: string; value: string }[] }
  | { type: "blood_type_gate" }
  | { type: "blood_type_unknown" }
  | { type: "form" };

const QUESTIONS: Question[] = [
  {
    type: "options",
    text: "Você tem entre 16 e 69 anos?",
    options: [
      { label: "Sim, tenho.", value: "sim" },
      { label: "Não tenho.", value: "nao" },
    ],
  },
  {
    type: "options",
    text: "Você pesa 50kg ou mais?",
    options: [
      { label: "Sim, peso.", value: "sim" },
      { label: "Não, peso menos.", value: "nao" },
    ],
  },
  {
    type: "options",
    text: "Você já doou sangue alguma vez?",
    options: [
      { label: "Nunca.", value: "nunca" },
      { label: "Já doei uma vez.", value: "uma" },
      { label: "Já doei mais de uma vez.", value: "mais" },
    ],
  },
  {
    type: "options",
    text: "Qual é a melhor forma de você chegar a um local de doação?",
    options: [
      { label: "A pé.", value: "pe" },
      { label: "Transporte público.", value: "publico" },
      { label: "Carro / Moto.", value: "carro" },
      { label: "Prefiro opções próximas.", value: "proximas" },
    ],
  },
  {
    type: "options",
    text: "Em qual momento você teria mais disponibilidade para doar?",
    options: [
      { label: "Manhã.", value: "manha" },
      { label: "Tarde.", value: "tarde" },
      { label: "Noite.", value: "noite" },
      { label: "Finais de semana.", value: "fds" },
    ],
  },
  {
    type: "options",
    text: "Com qual frequência você quer ser notificado?",
    options: [
      { label: "Diariamente.", value: "diario" },
      { label: "Semanalmente.", value: "semanal" },
      { label: "Apenas quando for urgente.", value: "urgente" },
      { label: "Prefiro menos notificações.", value: "menos" },
    ],
  },
  {
    type: "options",
    text: "O que mais te motivaria a continuar doando?",
    options: [
      { label: "Ajudar pessoas.", value: "ajudar" },
      { label: "Reconhecimento.", value: "reconhecimento" },
      { label: "Benefícios.", value: "beneficios" },
      { label: "Fazer parte de algo maior.", value: "maior" },
    ],
  },
  {
    type: "options",
    text: "Você gostaria de participar de campanhas ou ações coletivas?",
    options: [
      { label: "Sim.", value: "sim" },
      { label: "Não.", value: "nao" },
      { label: "Pergunte mais tarde.", value: "depois" },
    ],
  },
  // Pergunta gate: sabe o tipo sanguíneo?
  { type: "blood_type_gate" },
  // Pergunta do tipo sanguíneo (só aparece se souber)
  {
    type: "options",
    text: "Qual é o seu tipo sanguíneo?",
    options: [
      { label: "A+", value: "A+" },
      { label: "A-", value: "A-" },
      { label: "B+", value: "B+" },
      { label: "B-", value: "B-" },
      { label: "AB+", value: "AB+" },
      { label: "AB-", value: "AB-" },
      { label: "O+", value: "O+" },
      { label: "O-", value: "O-" },
    ],
  },
  // Tela para quem não sabe o tipo
  { type: "blood_type_unknown" },
  { type: "form" },
];

// índices fixos para navegação condicional
const IDX_GATE = 8;
const IDX_BLOOD_TYPE = 9;
const IDX_UNKNOWN = 10;
const IDX_FORM = 11;

const TOTAL_VISIBLE = 10; // perguntas visíveis (excluindo a tela unknown)
const OPTION_LABELS = "ABCDEFGH";

export default function QuizScreen({ navigation }: { navigation?: any }) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null as string | null);
  const [answers, setAnswers] = useState({} as Record<number, string>);
  const [nome, setNome] = useState("");
  const [dd, setDd] = useState("");
  const [mm, setMm] = useState("");
  const [yyyy, setYyyy] = useState("");

  const [fontsLoaded] = useFonts({ Fraunces_700Bold, DMSans_400Regular, DMSans_500Medium });

  const opacity = useRef(new Animated.Value(1)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  const animateProgress = (to: number) => {
    Animated.timing(progressAnim, {
      toValue: to,
      duration: 400,
      useNativeDriver: false,
    }).start();
  };

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, TOTAL_VISIBLE],
    outputRange: ["0%", "100%"],
  });

  const transition = (nextIndex: number, direction: "forward" | "back" = "forward") => {
    const outY = direction === "forward" ? 40 : -40;
    const inY = direction === "forward" ? -40 : 40;

    Animated.parallel([
      Animated.timing(opacity, { toValue: 0, duration: 220, useNativeDriver: true }),
      Animated.timing(translateY, { toValue: outY, duration: 220, useNativeDriver: true }),
    ]).start(() => {
      setCurrent(nextIndex);
      setSelected(answers[nextIndex] ?? null);
      translateY.setValue(inY);
      animateProgress(nextIndex > IDX_UNKNOWN ? nextIndex - 1 : nextIndex);
      Animated.parallel([
        Animated.timing(opacity, { toValue: 1, duration: 250, useNativeDriver: true }),
        Animated.timing(translateY, { toValue: 0, duration: 250, useNativeDriver: true }),
      ]).start();
    });
  };

  const handleOptionSelect = (value: string) => {
    setSelected(value);
    setAnswers((prev) => ({ ...prev, [current]: value }));
    setTimeout(() => transition(current + 1, "forward"), 350);
  };

  const handleBloodTypeGate = (knowsType: boolean) => {
    const value = knowsType ? "sim" : "nao";
    setSelected(value);
    setAnswers((prev) => ({ ...prev, [IDX_GATE]: value }));
    setTimeout(() => {
      if (knowsType) {
        transition(IDX_BLOOD_TYPE, "forward");
      } else {
        transition(IDX_UNKNOWN, "forward");
      }
    }, 350);
  };

  const handleBack = () => {
    if (current === 0) {
      navigation?.goBack?.();
      return;
    }

    let prev = current - 1;

    // Se estiver na tela unknown, volta para o gate
    if (current === IDX_UNKNOWN) prev = IDX_GATE;
    // Se estiver no form e veio do unknown (não sabe tipo), volta pro unknown
    if (current === IDX_FORM && answers[IDX_GATE] === "nao") prev = IDX_UNKNOWN;
    // Se estiver no form e veio do blood_type, volta pro blood_type
    if (current === IDX_FORM && answers[IDX_GATE] === "sim") prev = IDX_BLOOD_TYPE;

    transition(prev, "back");
  };

  const handleFinalizar = () => {
    if (!nome.trim()) { Alert.alert("Atenção", "Preencha seu nome completo."); return; }
    if (dd.length < 2 || mm.length < 2 || yyyy.length < 4) {
      Alert.alert("Atenção", "Preencha a data de nascimento completa."); return;
    }
    navigation?.navigate("Register");
  };

  if (!fontsLoaded) return null;

  const q = QUESTIONS[current];

  // Número da pergunta visível (unknown não conta)
  const visibleStep = current >= IDX_UNKNOWN ? current - 1 : current;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.bg} />

      <View style={styles.topBar}>
        <TouchableOpacity onPress={handleBack} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color={COLORS.pink} />
        </TouchableOpacity>
        <View style={styles.progressTrack}>
          <Animated.View style={[styles.progressFill, { width: progressWidth }]} />
        </View>
      </View>

      {q.type !== "blood_type_unknown" && (
        <Text style={styles.stepLabel}>
          Pergunta {visibleStep + 1} de {TOTAL_VISIBLE}
        </Text>
      )}

      <Animated.View style={[styles.animatedArea, { opacity, transform: [{ translateY }] }]}>

        {/* Pergunta de opções normal */}
        {q.type === "options" && (
          <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
            <Text style={styles.question}>{q.text}</Text>
            <View style={styles.optionsList}>
              {q.options.map((opt, i) => {
                const isSelected = selected === opt.value;
                return (
                  <TouchableOpacity
                    key={opt.value}
                    style={[styles.optionBtn, isSelected && styles.optionBtnSelected]}
                    activeOpacity={0.75}
                    onPress={() => handleOptionSelect(opt.value)}
                  >
                    <View style={[styles.optionLabel, isSelected && styles.optionLabelSelected]}>
                      <Text style={[styles.optionLabelText, isSelected && { color: "#fff" }]}>
                        {OPTION_LABELS[i]}
                      </Text>
                    </View>
                    <Text style={[styles.optionText, isSelected && styles.optionTextSelected]}>
                      {opt.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
        )}

        {q.type === "blood_type_gate" && (
          <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
            <Text style={styles.question}>Você sabe qual é o seu tipo sanguíneo?</Text>
            <View style={styles.optionsList}>
              {[
                { label: "Sim, sei meu tipo.", value: "sim" },
                { label: "Não sei meu tipo.", value: "nao" },
              ].map((opt, i) => {
                const isSelected = selected === opt.value;
                return (
                  <TouchableOpacity
                    key={opt.value}
                    style={[styles.optionBtn, isSelected && styles.optionBtnSelected]}
                    activeOpacity={0.75}
                    onPress={() => handleBloodTypeGate(opt.value === "sim")}
                  >
                    <View style={[styles.optionLabel, isSelected && styles.optionLabelSelected]}>
                      <Text style={[styles.optionLabelText, isSelected && { color: "#fff" }]}>
                        {OPTION_LABELS[i]}
                      </Text>
                    </View>
                    <Text style={[styles.optionText, isSelected && styles.optionTextSelected]}>
                      {opt.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
        )}

        {/* Tela para quem não sabe o tipo */}
        {q.type === "blood_type_unknown" && (
          <View style={styles.unknownContainer}>
            <Text style={styles.unknownTitle}>
              Sua jornada começa aqui.
            </Text>
            <Text style={styles.unknownText}>
              Sua primeira doação também ajudará você a descobrir seu tipo sanguíneo.
            </Text>
            <TouchableOpacity
              style={styles.finalizarBtn}
              onPress={() => navigation?.navigate("Register")}
              activeOpacity={0.85}
            >
              <Text style={styles.finalizarText}>Começar</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Formulário final */}
        {q.type === "form" && (
          <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
            <View style={styles.formGroup}>
              <TextInput
                style={styles.input}
                placeholder="Nome completo"
                placeholderTextColor={COLORS.gray}
                value={nome}
                onChangeText={setNome}
                autoCapitalize="words"
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.inputLabel}>Data de nascimento</Text>
              <View style={styles.dateRow}>
                <TextInput
                  style={[styles.input, styles.dateInput]}
                  placeholder="DD"
                  placeholderTextColor={COLORS.gray}
                  value={dd}
                  onChangeText={(t) => setDd(t.replace(/\D/g, "").slice(0, 2))}
                  keyboardType="number-pad"
                  maxLength={2}
                />
                <TextInput
                  style={[styles.input, styles.dateInput]}
                  placeholder="MM"
                  placeholderTextColor={COLORS.gray}
                  value={mm}
                  onChangeText={(t) => setMm(t.replace(/\D/g, "").slice(0, 2))}
                  keyboardType="number-pad"
                  maxLength={2}
                />
                <TextInput
                  style={[styles.input, styles.dateInputYear]}
                  placeholder="YYYY"
                  placeholderTextColor={COLORS.gray}
                  value={yyyy}
                  onChangeText={(t) => setYyyy(t.replace(/\D/g, "").slice(0, 4))}
                  keyboardType="number-pad"
                  maxLength={4}
                />
              </View>
            </View>

            <TouchableOpacity style={styles.finalizarBtn} onPress={handleFinalizar} activeOpacity={0.85}>
              <Text style={styles.finalizarText}>Finalizar</Text>
            </TouchableOpacity>
          </ScrollView>
        )}

      </Animated.View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 52,
    paddingBottom: 12,
    gap: 14,
  },
  backBtn: { width: 36, height: 36, alignItems: "center", justifyContent: "center" },
  progressTrack: {
    flex: 1,
    height: 5,
    backgroundColor: COLORS.grayDark,
    borderRadius: 10,
    overflow: "hidden",
  },
  progressFill: { height: "100%", backgroundColor: COLORS.pink, borderRadius: 10 },
  stepLabel: {
    fontFamily: "DMSans_400Regular",
    color: COLORS.gray,
    fontSize: 12,
    paddingHorizontal: 20,
    marginBottom: 6,
  },
  animatedArea: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 40, paddingTop: 8 },
  question: {
    fontFamily: "Fraunces_700Bold",
    color: COLORS.text,
    fontSize: 26,
    lineHeight: 34,
    marginBottom: 28,
  },
  optionsList: { gap: 12 },
  optionBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.card,
    borderRadius: 50,
    borderWidth: 1.5,
    borderColor: COLORS.cardBorder,
    paddingVertical: 14,
    paddingHorizontal: 16,
    gap: 14,
  },
  optionBtnSelected: { backgroundColor: COLORS.cardSelected, borderColor: COLORS.borderSelected },
  optionLabel: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.grayDark,
    alignItems: "center",
    justifyContent: "center",
  },
  optionLabelSelected: { backgroundColor: COLORS.pink },
  optionLabelText: { fontFamily: "DMSans_500Medium", color: COLORS.gray, fontSize: 11 },
  optionText: { fontFamily: "DMSans_400Regular", color: COLORS.gray, fontSize: 15, flex: 1 },
  optionTextSelected: { fontFamily: "DMSans_500Medium", color: COLORS.text },

  // Tela unknown
  unknownContainer: {
    flex: 1,
    paddingHorizontal: 28,
    paddingTop: 40,
    paddingBottom: 40,
    justifyContent: "center",
    gap: 20,
  },
  unknownTitle: {
    fontFamily: "Fraunces_700Bold",
    color: COLORS.pink,
    fontSize: 32,
    lineHeight: 40,
  },
  unknownText: {
    fontFamily: "DMSans_400Regular",
    color: COLORS.text,
    fontSize: 16,
    lineHeight: 26,
    opacity: 0.8,
  },

  formGroup: { marginBottom: 20 },
  inputLabel: { fontFamily: "DMSans_500Medium", color: COLORS.gray, fontSize: 12, marginBottom: 8 },
  input: {
    fontFamily: "DMSans_400Regular",
    backgroundColor: COLORS.inputBg,
    borderWidth: 1.5,
    borderColor: COLORS.cardBorder,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: COLORS.text,
    fontSize: 15,
  },
  dateRow: { flexDirection: "row", gap: 10 },
  dateInput: { flex: 1, textAlign: "center", paddingHorizontal: 8 },
  dateInputYear: { flex: 1.5, textAlign: "center" },
  finalizarBtn: {
    marginTop: 16,
    backgroundColor: COLORS.pink,
    borderRadius: 50,
    paddingVertical: 16,
    alignItems: "center",
  },
  finalizarText: { fontFamily: "DMSans_500Medium", color: "#fff", fontSize: 16 },
});