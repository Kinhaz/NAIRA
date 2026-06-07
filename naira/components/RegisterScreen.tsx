import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Animated,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useFonts, Fraunces_700Bold } from "@expo-google-fonts/fraunces";
import { DMSans_400Regular, DMSans_500Medium } from "@expo-google-fonts/dm-sans";

const COLORS = {
  bg: "#FAF7F2",
  card: "#ffffff",
  border: "#e8e0d5",
  red: "#C8233C",
  text: "#1a0000",
  gray: "#888888",
  errorBorder: "#C8233C",
};

// ── Field fora do componente principal ──────────────────────────────────────
type FieldProps = {
  label: string;
  value: string;
  onChangeText: (v: string) => void;
  placeholder: string;
  keyboardType?: any;
  secureTextEntry?: boolean;
  error?: string;
  rightIcon?: React.ReactNode;
  autoCapitalize?: any;
};

const Field = ({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = "default",
  secureTextEntry = false,
  error,
  rightIcon,
  autoCapitalize = "none",
}: FieldProps) => (
  <View style={styles.fieldWrapper}>
    <Text style={styles.fieldLabel}>{label}</Text>
    <View style={styles.inputRow}>
      <TextInput
        style={[styles.input, !!error && styles.inputError, !!rightIcon && { paddingRight: 52 }]}
        placeholder={placeholder}
        placeholderTextColor={COLORS.gray}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        autoCapitalize={autoCapitalize}
        underlineColorAndroid="transparent"
      />
      {rightIcon}
    </View>
    {!!error && <Text style={styles.errorText}>{error}</Text>}
  </View>
);

// ── Tela principal ───────────────────────────────────────────────────────────
type Props = { navigation?: any };

export default function RegisterScreen({ navigation }: Props) {
  const [step, setStep] = useState(1);

  // Etapa 1
  const [nome, setNome] = useState("");
  const [dataNasc, setDataNasc] = useState("");
  const [cpf, setCpf] = useState("");

  // Etapa 2
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [senha, setSenha] = useState("");
  const [showSenha, setShowSenha] = useState(false);

  // Etapa 3
  const [cep, setCep] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [loadingCep, setLoadingCep] = useState(false);

  const [errors, setErrors] = useState({} as Record<string, string>);

  // Animação entre etapas
  const opacity = useRef(new Animated.Value(1)).current;
  const translateX = useRef(new Animated.Value(0)).current;

  const [fontsLoaded] = useFonts({ Fraunces_700Bold, DMSans_400Regular, DMSans_500Medium });
  if (!fontsLoaded) return null;

  const animateStep = (nextStep: number, direction: "forward" | "back") => {
    const outX = direction === "forward" ? -40 : 40;
    const inX = direction === "forward" ? 40 : -40;

    Animated.parallel([
      Animated.timing(opacity, { toValue: 0, duration: 200, useNativeDriver: true }),
      Animated.timing(translateX, { toValue: outX, duration: 200, useNativeDriver: true }),
    ]).start(() => {
      setStep(nextStep);
      setErrors({});
      translateX.setValue(inX);
      Animated.parallel([
        Animated.timing(opacity, { toValue: 1, duration: 230, useNativeDriver: true }),
        Animated.timing(translateX, { toValue: 0, duration: 230, useNativeDriver: true }),
      ]).start();
    });
  };

  // Máscaras
  const maskDate = (v: string) => {
    const d = v.replace(/\D/g, "").slice(0, 8);
    if (d.length <= 2) return d;
    if (d.length <= 4) return `${d.slice(0, 2)}/${d.slice(2)}`;
    return `${d.slice(0, 2)}/${d.slice(2, 4)}/${d.slice(4)}`;
  };

  const maskCpf = (v: string) => {
    const d = v.replace(/\D/g, "").slice(0, 11);
    if (d.length <= 3) return d;
    if (d.length <= 6) return `${d.slice(0, 3)}.${d.slice(3)}`;
    if (d.length <= 9) return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6)}`;
    return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6, 9)}-${d.slice(9)}`;
  };

  const maskPhone = (v: string) => {
    const d = v.replace(/\D/g, "").slice(0, 11);
    if (d.length <= 2) return `(${d}`;
    if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
    return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
  };

  const maskCep = (v: string) => {
    const d = v.replace(/\D/g, "").slice(0, 8);
    if (d.length <= 5) return d;
    return `${d.slice(0, 5)}-${d.slice(5)}`;
  };

  const buscarCep = async (value: string) => {
    const raw = value.replace(/\D/g, "");
    if (raw.length === 8) {
      setLoadingCep(true);
      try {
        const res = await fetch(`https://viacep.com.br/ws/${raw}/json/`);
        const data = await res.json();
        if (!data.erro) {
          setCidade(data.localidade);
          setEstado(data.uf);
          setErrors((prev) => ({ ...prev, cep: "", cidade: "", estado: "" }));
        } else {
          setErrors((prev) => ({ ...prev, cep: "CEP não encontrado" }));
        }
      } catch {
        setErrors((prev) => ({ ...prev, cep: "Erro ao buscar CEP" }));
      } finally {
        setLoadingCep(false);
      }
    }
  };

  const validateStep1 = () => {
    const e: Record<string, string> = {};
    if (!nome.trim()) e.nome = "Informe seu nome completo";
    if (dataNasc.length < 10) e.dataNasc = "Informe a data completa (DD/MM/AAAA)";
    if (cpf.replace(/\D/g, "").length < 11) e.cpf = "Informe um CPF válido";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep2 = () => {
    const e: Record<string, string> = {};
    if (!email.includes("@")) e.email = "Informe um e-mail válido";
    if (telefone.replace(/\D/g, "").length < 10) e.telefone = "Informe um telefone válido";
    if (senha.length < 6) e.senha = "A senha deve ter pelo menos 6 caracteres";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep3 = () => {
    const e: Record<string, string> = {};
    if (cep.replace(/\D/g, "").length < 8) e.cep = "Informe um CEP válido";
    if (!cidade.trim()) e.cidade = "Cidade não encontrada";
    if (!estado.trim()) e.estado = "Estado não encontrado";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) animateStep(2, "forward");
    if (step === 2 && validateStep2()) animateStep(3, "forward");
  };

  const handleFinalizar = () => {
    if (validateStep3()) navigation?.navigate("Loading");
  };

  const handleBack = () => {
    if (step === 1) navigation?.goBack();
    else animateStep(step - 1, "back");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.bg} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color={COLORS.red} />
        </TouchableOpacity>
        <View style={styles.stepsRow}>
          {[1, 2, 3].map((s) => (
            <View
              key={s}
              style={[
                styles.stepDot,
                s === step && styles.stepDotActive,
                s < step && styles.stepDotDone,
              ]}
            />
          ))}
        </View>
        <View style={{ width: 36 }} />
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <Animated.View style={[{ flex: 1 }, { opacity, transform: [{ translateX }] }]}>
          <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>

            <Text style={styles.stepTitle}>
              {step === 1 ? "Dados pessoais" : step === 2 ? "Contato e acesso" : "Localização"}
            </Text>
            <Text style={styles.stepSub}>Etapa {step} de 3</Text>

            {/* Etapa 1 */}
            {step === 1 && (
              <>
                <Field label="Nome completo" value={nome}
                  onChangeText={setNome} placeholder="Ex: Maria Silva"
                  error={errors.nome} autoCapitalize="words" />
                <Field label="Data de nascimento" value={dataNasc}
                  onChangeText={(v) => setDataNasc(maskDate(v))}
                  placeholder="DD/MM/AAAA" keyboardType="number-pad" error={errors.dataNasc} />
                <Field label="CPF" value={cpf}
                  onChangeText={(v) => setCpf(maskCpf(v))}
                  placeholder="000.000.000-00" keyboardType="number-pad" error={errors.cpf} />
              </>
            )}

            {/* Etapa 2 */}
            {step === 2 && (
              <>
                <Field label="E-mail" value={email} onChangeText={setEmail}
                  placeholder="seu@email.com" keyboardType="email-address" error={errors.email} />
                <Field label="Telefone" value={telefone}
                  onChangeText={(v) => setTelefone(maskPhone(v))}
                  placeholder="(00) 00000-0000" keyboardType="phone-pad" error={errors.telefone} />
                <Field label="Senha" value={senha} onChangeText={setSenha}
                  placeholder="Mínimo 6 caracteres" secureTextEntry={!showSenha} error={errors.senha}
                  rightIcon={
                    <TouchableOpacity onPress={() => setShowSenha(!showSenha)} style={styles.eyeBtn}>
                      <Ionicons name={showSenha ? "eye-off-outline" : "eye-outline"} size={20} color={COLORS.gray} />
                    </TouchableOpacity>
                  }
                />
              </>
            )}

            {/* Etapa 3 */}
            {step === 3 && (
              <>
                <Field label="CEP" value={cep}
                  onChangeText={(v) => { const m = maskCep(v); setCep(m); buscarCep(m); }}
                  placeholder="00000-000" keyboardType="number-pad" error={errors.cep} />
                {loadingCep && <Text style={styles.loadingText}>Buscando endereço...</Text>}
                <Field label="Cidade" value={cidade} onChangeText={setCidade}
                  placeholder="Preenchido automaticamente" error={errors.cidade} />
                <Field label="Estado" value={estado} onChangeText={setEstado}
                  placeholder="UF" error={errors.estado} />
              </>
            )}

            <TouchableOpacity
              style={styles.btn}
              onPress={step < 3 ? handleNext : handleFinalizar}
              activeOpacity={0.85}
            >
              <Text style={styles.btnText}>{step < 3 ? "Próximo" : "Finalizar"}</Text>
            </TouchableOpacity>

          </ScrollView>
        </Animated.View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 4,
  },
  backBtn: { width: 36, height: 36, alignItems: "center", justifyContent: "center" },
  stepsRow: { flexDirection: "row", gap: 8, alignItems: "center" },
  stepDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.border },
  stepDotActive: { backgroundColor: COLORS.red, width: 24, borderRadius: 4 },
  stepDotDone: { backgroundColor: COLORS.red, opacity: 0.35 },
  scroll: { paddingHorizontal: 24, paddingBottom: 40, paddingTop: 8 },
  stepTitle: {
    fontFamily: "Fraunces_700Bold",
    fontSize: 26,
    color: COLORS.text,
    marginBottom: 4,
    marginTop: 16,
  },
  stepSub: {
    fontFamily: "DMSans_400Regular",
    fontSize: 13,
    color: COLORS.gray,
    marginBottom: 28,
  },
  fieldWrapper: { marginBottom: 20 },
  fieldLabel: {
    fontFamily: "DMSans_500Medium",
    fontSize: 13,
    color: COLORS.text,
    marginBottom: 8,
    opacity: 0.7,
  },
  inputRow: { position: "relative", justifyContent: "center" },
  input: {
    fontFamily: "DMSans_400Regular",
    backgroundColor: COLORS.card,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: 50,
    paddingHorizontal: 20,
    paddingVertical: 16,
    color: COLORS.text,
    fontSize: 15,
  },
  inputError: { borderColor: COLORS.errorBorder },
  eyeBtn: { position: "absolute", right: 20, padding: 4 },
  errorText: {
    fontFamily: "DMSans_400Regular",
    color: COLORS.red,
    fontSize: 12,
    marginTop: 5,
    marginLeft: 8,
  },
  loadingText: {
    fontFamily: "DMSans_400Regular",
    color: COLORS.gray,
    fontSize: 12,
    marginTop: -12,
    marginBottom: 12,
    marginLeft: 8,
  },
  btn: {
    backgroundColor: COLORS.red,
    borderRadius: 50,
    paddingVertical: 18,
    alignItems: "center",
    marginTop: 8,
  },
  btnText: { fontFamily: "DMSans_500Medium", color: "#fff", fontSize: 16 },
});