import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, FontAwesome5, MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useFonts, Fraunces_700Bold } from "@expo-google-fonts/fraunces";
import { DMSans_400Regular, DMSans_500Medium } from "@expo-google-fonts/dm-sans";

const COLORS = {
  bg: "#FAF7F2",
  card: "#ffffff",
  cardBorder: "#e8e0d5",
  red: "#C8233C",
  redBg: "#fde8eb",
  text: "#1a0000",
  gray: "#888888",
  white: "#ffffff",
};

// ── Benefícios disponíveis ───────────────────────────────────────────────────
const BENEFICIOS = [
  {
    id: "1",
    title: "Cinema Meia Entrada",
    desc: "Apresente seu NAIRA ID e pague metade em cinemas parceiros.",
    icon: <FontAwesome5 name="ticket-alt" size={22} color="#C8233C" />,
  },
  {
    id: "2",
    title: "Fila de Prioridade",
    desc: "Atendimento prioritário em hospitais e clínicas parceiras.",
    icon: <Ionicons name="people-outline" size={22} color="#C8233C" />,
  },
  {
    id: "3",
    title: "Descontos Médicos",
    desc: "Consultas e exames com desconto em clínicas credenciadas.",
    icon: <FontAwesome5 name="stethoscope" size={20} color="#C8233C" />,
  },
  {
    id: "4",
    title: "Descontos Farmacêuticos",
    desc: "Economize em medicamentos em farmácias parceiras da rede.",
    icon: <MaterialIcons name="local-pharmacy" size={22} color="#C8233C" />,
  },
  {
    id: "5",
    title: "VEM Doador",
    desc: "Desconto em passagens de metrô e ônibus para ir e voltar da doação.",
    icon: <Ionicons name="bus-outline" size={22} color="#C8233C" />,
  },
  {
    id: "6",
    title: "Estacionamento Hospitalar",
    desc: "Vaga gratuita ou com desconto nos hospitais parceiros.",
    icon: <Ionicons name="car-outline" size={22} color="#C8233C" />,
  },
];

// ── Benefícios futuros ───────────────────────────────────────────────────────
const FUTUROS = [
  {
    id: "f1",
    title: "Cashback em compras",
    desc: "Ganhe de volta parte do que você gasta em parceiros do app.",
    icon: <MaterialIcons name="attach-money" size={22} color={COLORS.gray} />,
  },
  {
    id: "f2",
    title: "Viagens com desconto",
    desc: "Parcerias com companhias aéreas e rodoviárias para doadores frequentes.",
    icon: <Ionicons name="airplane-outline" size={22} color={COLORS.gray} />,
  },
  {
    id: "f3",
    title: "Plataformas de streaming",
    desc: "Acesso a planos com desconto em serviços de entretenimento.",
    icon: <Ionicons name="play-circle-outline" size={22} color={COLORS.gray} />,
  },
];

// ── Motivos NAIRA ID ─────────────────────────────────────────────────────────
const MOTIVOS = [
  {
    id: "m1",
    title: "Doador Verificado",
    desc: "Comprove seu histórico de doações com segurança e autenticidade.",
    icon: <FontAwesome5 name="tint" size={20} color={COLORS.white} />,
    iconBg: COLORS.red,
  },
  {
    id: "m2",
    title: "Benefícios Exclusivos",
    desc: "Descontos e vantagens em parceiros que valorizam o impacto que você gera.",
    icon: <Ionicons name="gift-outline" size={20} color={COLORS.white} />,
    iconBg: "#e06020",
  },
  {
    id: "m3",
    title: "Reconhecimento",
    desc: "Seu nível reflete suas doações e abre portas para novas oportunidades.",
    icon: <MaterialIcons name="emoji-events" size={20} color={COLORS.white} />,
    iconBg: "#c8a020",
  },
];

export default function BeneficiosScreen({ navigation }: { navigation?: any }) {
  const [fontsLoaded] = useFonts({ Fraunces_700Bold, DMSans_400Regular, DMSans_500Medium });
  if (!fontsLoaded) return null;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.bg} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation?.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color={COLORS.red} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Benefícios</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* ── Seção: Por que ter um NAIRA ID? ── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Por que ter um NAIRA ID?</Text>
          <Text style={styles.sectionSubtitle}>
            Seu cartão de doador abre portas para um mundo de vantagens.
          </Text>

          <View style={styles.motivosRow}>
            {MOTIVOS.map((m) => (
              <View key={m.id} style={styles.motivoCard}>
                <View style={[styles.motivoIconWrap, { backgroundColor: m.iconBg }]}>
                  {m.icon}
                </View>
                <Text style={styles.motivoTitle}>{m.title}</Text>
                <Text style={styles.motivoDesc}>{m.desc}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* ── Seção: Benefícios disponíveis ── */}
        <View style={styles.sectionHeader}>
          <View style={styles.sectionIconWrap}>
            <Ionicons name="checkmark-circle-outline" size={18} color={COLORS.red} />
          </View>
          <Text style={styles.sectionTitleInline}>Benefícios disponíveis</Text>
        </View>

        {BENEFICIOS.map((b) => (
          <TouchableOpacity key={b.id} style={styles.beneficioCard} activeOpacity={0.8}>
            <View style={styles.beneficioIconWrap}>{b.icon}</View>
            <View style={styles.beneficioInfo}>
              <Text style={styles.beneficioTitle}>{b.title}</Text>
              <Text style={styles.beneficioDesc}>{b.desc}</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={COLORS.gray} />
          </TouchableOpacity>
        ))}

        {/* ── Seção: Benefícios futuros ── */}
        <View style={[styles.sectionHeader, { marginTop: 8 }]}>
          <View style={[styles.sectionIconWrap, { backgroundColor: "#f0ece6" }]}>
            <Ionicons name="time-outline" size={18} color={COLORS.gray} />
          </View>
          <Text style={[styles.sectionTitleInline, { color: COLORS.gray }]}>Em breve</Text>
        </View>

        {FUTUROS.map((f) => (
          <View key={f.id} style={[styles.beneficioCard, styles.beneficioCardFuturo]}>
            <View style={[styles.beneficioIconWrap, { backgroundColor: "#f0ece6" }]}>{f.icon}</View>
            <View style={styles.beneficioInfo}>
              <Text style={[styles.beneficioTitle, { color: COLORS.gray }]}>{f.title}</Text>
              <Text style={styles.beneficioDesc}>{f.desc}</Text>
            </View>
            <View style={styles.breveBadge}>
              <Text style={styles.breveBadgeText}>Em breve</Text>
            </View>
          </View>
        ))}

        <View style={{ height: 32 }} />
      </ScrollView>
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
    paddingVertical: 12,
  },
  backBtn: { width: 36, height: 36, alignItems: "center", justifyContent: "center" },
  headerTitle: {
    fontFamily: "Fraunces_700Bold",
    fontSize: 20,
    color: COLORS.text,
    letterSpacing: 0.3,
  },

  scroll: { paddingHorizontal: 16, paddingTop: 4, gap: 12 },

  // Seção Por que NAIRA ID
  section: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    padding: 16,
    gap: 12,
  },
  sectionTitle: {
    fontFamily: "Fraunces_700Bold",
    fontSize: 18,
    color: COLORS.text,
  },
  sectionSubtitle: {
    fontFamily: "DMSans_400Regular",
    fontSize: 13,
    color: COLORS.gray,
    lineHeight: 19,
    marginTop: -6,
  },
  motivosRow: { flexDirection: "row", gap: 10 },
  motivoCard: {
    flex: 1,
    backgroundColor: COLORS.bg,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    padding: 12,
    gap: 8,
    alignItems: "flex-start",
  },
  motivoIconWrap: {
    width: 36, height: 36, borderRadius: 10,
    alignItems: "center", justifyContent: "center",
  },
  motivoTitle: {
    fontFamily: "DMSans_500Medium",
    fontSize: 11,
    color: COLORS.text,
    lineHeight: 15,
  },
  motivoDesc: {
    fontFamily: "DMSans_400Regular",
    fontSize: 10,
    color: COLORS.gray,
    lineHeight: 14,
  },

  // Cabeçalho de seção inline
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: -4,
  },
  sectionIconWrap: {
    width: 30, height: 30, borderRadius: 8,
    backgroundColor: COLORS.redBg,
    alignItems: "center", justifyContent: "center",
  },
  sectionTitleInline: {
    fontFamily: "DMSans_500Medium",
    fontSize: 14,
    color: COLORS.text,
  },

  // Card de benefício
  beneficioCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    padding: 14,
    gap: 14,
  },
  beneficioCardFuturo: {
    opacity: 0.75,
  },
  beneficioIconWrap: {
    width: 44, height: 44, borderRadius: 12,
    backgroundColor: COLORS.redBg,
    alignItems: "center", justifyContent: "center",
  },
  beneficioInfo: { flex: 1, gap: 3 },
  beneficioTitle: {
    fontFamily: "DMSans_500Medium",
    fontSize: 13,
    color: COLORS.text,
  },
  beneficioDesc: {
    fontFamily: "DMSans_400Regular",
    fontSize: 11,
    color: COLORS.gray,
    lineHeight: 16,
  },

  // Badge em breve
  breveBadge: {
    backgroundColor: "#f0ece6",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  breveBadgeText: {
    fontFamily: "DMSans_500Medium",
    fontSize: 10,
    color: COLORS.gray,
  },
});