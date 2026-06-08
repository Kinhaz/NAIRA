import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Alert,
  ImageBackground,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, FontAwesome5, MaterialIcons, Feather } from "@expo/vector-icons";
import { useFonts, Fraunces_700Bold } from "@expo-google-fonts/fraunces";
import { DMSans_400Regular, DMSans_500Medium } from "@expo-google-fonts/dm-sans";

const COLORS = {
  bg: "#FAF7F2",
  card: "#ffffff",
  cardBorder: "#e8e0d5",
  red: "#C8233C",
  redBg: "#fde8eb",
  redDark: "#a01e30",
  text: "#1a0000",
  gray: "#888888",
  white: "#ffffff",
};

export default function HomeScreen({ navigation }: { navigation?: any }) {
  const [fontsLoaded] = useFonts({ Fraunces_700Bold, DMSans_400Regular, DMSans_500Medium });
  if (!fontsLoaded) return null;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.bg} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => Alert.alert("Menu", "")}>
          <Ionicons name="menu" size={26} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerLogo}>NAIRA</Text>
        <TouchableOpacity onPress={() => Alert.alert("Notificações", "")}>
          <Ionicons name="notifications-outline" size={24} color={COLORS.text} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* Card vermelho — cartão de benefícios */}
        <TouchableOpacity
          style={styles.benefitsCard}
          activeOpacity={0.9}
          onPress={() => Alert.alert("Benefícios", "")}
        >
          {/* Círculos decorativos */}
          <View style={styles.circle1} />
          <View style={styles.circle2} />
          <View style={styles.circle3} />

          <View style={styles.benefitsTopRow}>
            <View style={styles.chipRow}>
              <View style={styles.chip} />
              <View style={[styles.chip, { width: 10, height: 10, borderRadius: 5 }]} />
            </View>
            <TouchableOpacity style={styles.benefitsBadge}>
              <Text style={styles.benefitsBadgeText}>Ver benefícios</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.benefitsBottom}>
            <Text style={styles.benefitsCardLabel}>NAIRA ID</Text>
          </View>
        </TouchableOpacity>

        {/* Saudação */}
        <View style={styles.greetingContainer}>
          <Text style={styles.greetingName}>Olá, Lucas 🤗</Text>
          <Text style={styles.greetingQuestion}>O que você quer fazer hoje?</Text>
        </View>

        {/* Botão DOAR AGORA */}
        <TouchableOpacity
          style={styles.doarBtn}
          activeOpacity={0.85}
          onPress={() => navigation?.navigate("Doar")}
        >
          <FontAwesome5 name="tint" size={14} color={COLORS.white} />
          <Text style={styles.doarBtnText}>DOAR AGORA</Text>
        </TouchableOpacity>

        {/* Botão Ver oportunidades próximas */}
        <TouchableOpacity
          style={styles.oportunidadesBtn}
          activeOpacity={0.85}
          onPress={() => Alert.alert("Oportunidades", "")}
        >
          <Ionicons name="search-outline" size={16} color={COLORS.text} />
          <Text style={styles.oportunidadesBtnText}>Ver oportunidades próximas</Text>
        </TouchableOpacity>

        {/* Linha: Hemocentro + Tipo Sanguíneo */}
        <View style={styles.row}>

          {/* Card Hemocentro */}
          <TouchableOpacity
            style={[styles.card, { flex: 1 }]}
            activeOpacity={0.85}
            onPress={() => Alert.alert("Hemocentro", "")}
          >
            <Text style={styles.verMaisLabel}>Ver mais</Text>
            <Text style={styles.hemocentroName}>Hemocentro</Text>
            <Text style={styles.hemocentroAddress}>Av. Recife, 215</Text>
            <View style={styles.hemocentroInfoRow}>
              <View style={styles.hemocentroTag}>
                <Ionicons name="location-outline" size={11} color={COLORS.gray} />
                <Text style={styles.hemocentroTagText}>2.0km</Text>
              </View>
              <View style={styles.hemocentroTag}>
                <Ionicons name="time-outline" size={11} color={COLORS.gray} />
                <Text style={styles.hemocentroTagText}>Hoje, até 17h</Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* Card Tipo Sanguíneo */}
          <TouchableOpacity
            style={[styles.card, { flex: 1 }]}
            activeOpacity={0.85}
            onPress={() => Alert.alert("Tipo Sanguíneo", "")}
          >
            <Text style={styles.verMaisLabel}>Tipo sanguíneo</Text>
            <Text style={styles.bloodTypeBig}>AB+</Text>
            <Text style={styles.bloodTypeDesc}>Receptor Universal</Text>
            <TouchableOpacity
              style={styles.saberMaisBtn}
              onPress={() => Alert.alert("Saber mais", "")}
            >
              <Text style={styles.saberMaisBtnText}>Saber mais</Text>
            </TouchableOpacity>
          </TouchableOpacity>

        </View>

        {/* Card Campanhas em destaque */}
        <View style={styles.card}>
          <View style={styles.campanhaHeader}>
            <View style={styles.campanhaIconWrap}>
              <Ionicons name="megaphone-outline" size={16} color={COLORS.red} />
            </View>
            <Text style={styles.campanhaTitleSection}>Campanhas em destaque</Text>
            <TouchableOpacity onPress={() => Alert.alert("Participar", "")}>
              <Text style={styles.participarText}>Participar</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.campanhaItem}
            activeOpacity={0.85}
            onPress={() => Alert.alert("Campanha", "")}
          >
            {/* Thumbnail */}
            <View style={styles.campanhaThumbnail}>
              <FontAwesome5 name="tint" size={22} color={COLORS.white} />
            </View>

            <View style={styles.campanhaInfo}>
              <Text style={styles.campanhaTitle}>Juntos Por Mais Vidas</Text>
              <Text style={styles.campanhaDesc} numberOfLines={1}>
                Doe sangue. Espalhe a esperança
              </Text>
              <Text style={styles.campanhaDate}>Até 17/05</Text>
            </View>

            <Ionicons name="chevron-forward" size={18} color={COLORS.gray} />
          </TouchableOpacity>
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },

  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  headerLogo: {
    fontFamily: "Fraunces_700Bold",
    fontSize: 20,
    color: COLORS.text,
    letterSpacing: 1,
  },

  scroll: { paddingHorizontal: 16, gap: 14, paddingBottom: 20 },

  // Card vermelho benefícios
  benefitsCard: {
    backgroundColor: COLORS.red,
    borderRadius: 20,
    padding: 20,
    height: 160,
    overflow: "hidden",
    justifyContent: "space-between",
  },
  circle1: {
    position: "absolute", width: 180, height: 180, borderRadius: 90,
    backgroundColor: "rgba(255,255,255,0.07)", top: -60, right: -40,
  },
  circle2: {
    position: "absolute", width: 120, height: 120, borderRadius: 60,
    backgroundColor: "rgba(255,255,255,0.06)", bottom: -30, left: 20,
  },
  circle3: {
    position: "absolute", width: 80, height: 80, borderRadius: 40,
    backgroundColor: "rgba(255,255,255,0.08)", top: 20, left: 80,
  },
  benefitsTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  chipRow: { flexDirection: "row", gap: 6, alignItems: "center" },
  chip: {
    width: 32, height: 24, borderRadius: 4,
    backgroundColor: "rgba(255,255,255,0.3)",
  },
  benefitsBadge: {
    backgroundColor: "rgba(0,0,0,0.25)",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  benefitsBadgeText: {
    fontFamily: "DMSans_500Medium",
    color: COLORS.white,
    fontSize: 12,
  },
  benefitsBottom: { alignItems: "flex-start" },
  benefitsCardLabel: {
    fontFamily: "Fraunces_700Bold",
    color: "rgba(255,255,255,0.4)",
    fontSize: 22,
    letterSpacing: 3,
  },

  // Saudação
  greetingContainer: { alignItems: "center", gap: 4 },
  greetingName: {
    fontFamily: "Fraunces_700Bold",
    fontSize: 22,
    color: COLORS.text,
  },
  greetingQuestion: {
    fontFamily: "DMSans_400Regular",
    fontSize: 15,
    color: COLORS.text,
    opacity: 0.7,
  },

  // Botão Doar
  doarBtn: {
    backgroundColor: COLORS.red,
    borderRadius: 50,
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  doarBtnText: {
    fontFamily: "DMSans_500Medium",
    color: COLORS.white,
    fontSize: 15,
    letterSpacing: 0.5,
  },

  // Botão Oportunidades
  oportunidadesBtn: {
    backgroundColor: COLORS.card,
    borderRadius: 50,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  oportunidadesBtnText: {
    fontFamily: "DMSans_400Regular",
    color: COLORS.text,
    fontSize: 14,
  },

  // Cards lado a lado
  row: { flexDirection: "row", gap: 12 },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    padding: 14,
    gap: 4,
  },

  // Hemocentro
  verMaisLabel: {
    fontFamily: "DMSans_500Medium",
    fontSize: 11,
    color: COLORS.red,
    marginBottom: 4,
  },
  hemocentroName: {
    fontFamily: "Fraunces_700Bold",
    fontSize: 16,
    color: COLORS.text,
  },
  hemocentroAddress: {
    fontFamily: "DMSans_400Regular",
    fontSize: 12,
    color: COLORS.gray,
  },
  hemocentroInfoRow: { flexDirection: "row", gap: 4, marginTop: 15 },
  hemocentroTag: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: COLORS.bg,
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 3,
    alignSelf: "flex-start",
  },
  hemocentroTagText: {
    fontFamily: "DMSans_400Regular",
    fontSize: 10,
    color: COLORS.gray,
  },

  // Tipo sanguíneo
  bloodTypeBig: {
    fontFamily: "Fraunces_700Bold",
    fontSize: 32,
    color: COLORS.text,
    marginTop: 2,
  },
  bloodTypeDesc: {
    fontFamily: "DMSans_400Regular",
    fontSize: 11,
    color: COLORS.gray,
  },
  saberMaisBtn: {
    marginTop: 8,
    backgroundColor: COLORS.redBg,
    borderRadius: 8,
    paddingVertical: 6,
    alignItems: "center",
  },
  saberMaisBtnText: {
    fontFamily: "DMSans_500Medium",
    fontSize: 11,
    color: COLORS.red,
  },

  // Campanhas
  campanhaHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  campanhaIconWrap: {
    width: 28, height: 28, borderRadius: 8,
    backgroundColor: COLORS.redBg,
    alignItems: "center", justifyContent: "center",
  },
  campanhaTitleSection: {
    fontFamily: "DMSans_500Medium",
    fontSize: 13,
    color: COLORS.text,
    flex: 1,
  },
  participarText: {
    fontFamily: "DMSans_500Medium",
    fontSize: 12,
    color: COLORS.red,
  },
  campanhaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: COLORS.bg,
    borderRadius: 12,
    padding: 10,
  },
  campanhaThumbnail: {
    width: 48, height: 48, borderRadius: 10,
    backgroundColor: COLORS.red,
    alignItems: "center", justifyContent: "center",
  },
  campanhaInfo: { flex: 1, gap: 2 },
  campanhaTitle: {
    fontFamily: "DMSans_500Medium",
    fontSize: 13,
    color: COLORS.text,
  },
  campanhaDesc: {
    fontFamily: "DMSans_400Regular",
    fontSize: 11,
    color: COLORS.gray,
  },
  campanhaDate: {
    fontFamily: "DMSans_400Regular",
    fontSize: 10,
    color: COLORS.gray,
    marginTop: 2,
  },
});