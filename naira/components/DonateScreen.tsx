import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Alert,
  FlatList,
} from "react-native";
import {
  Ionicons,
  MaterialIcons,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useFonts, Fraunces_700Bold } from '@expo-google-fonts/fraunces';
import { DMSans_400Regular, DMSans_500Medium } from '@expo-google-fonts/dm-sans';

const COLORS = {
  bg: "#FAF7F2",
  card: "#ffffff",
  cardBorder: "#e8e0d5",
  pink: "#e8637a",
  red: "#c0392b",
  redDark: "#96281b",
  redBg: "#fde8e8",
  white: "#ffffff",
  gray: "#888888",
  grayDark: "#555555",
  text: "#1a0000",
};

const HEMOCENTROS = [
  { id: "1", nome: "Hemocentro Recife", abertura: "Aberto até 17h", urgente: true, cor: "#b22222", icon: "🏥" },
  { id: "2", nome: "Doze Hematologia", abertura: "Aberto até 16h", urgente: false, cor: "#8b0000", icon: "🩸" },
  { id: "3", nome: "Hemope", abertura: "Aberto até 16h", urgente: false, cor: "#6b0f0f", icon: "🏨" },
];

const PRE_CHECKS = [
  { id: "1", label: "Dormiu bem", icon: "bed" },
  { id: "2", label: "Alimentado nas últimas 3h", icon: "food" },
  { id: "3", label: "Sem tatuagem recente", icon: "needle" },
  { id: "4", label: "Sem alimentação de gripe", icon: "virus-off" },
];

function HemocentroCard({ item, fraunces }: { item: (typeof HEMOCENTROS)[0]; fraunces: boolean }) {
  return (
    <View style={hemo.card}>
      <View style={[hemo.imgPlaceholder, { backgroundColor: item.cor }]}>
        <Text style={{ fontSize: 32 }}>{item.icon}</Text>
        {item.urgente && (
          <View style={hemo.urgenteBadge}>
            <Text style={hemo.urgenteText}>Crítico</Text>
          </View>
        )}
      </View>
      <View style={hemo.info}>
        <Text style={hemo.nome} numberOfLines={1}>{item.nome}</Text>
        <Text style={hemo.abertura}>{item.abertura}</Text>
        <TouchableOpacity style={hemo.btn} onPress={() => Alert.alert(item.nome, "Abrindo rota...")}>
          <Text style={hemo.btnText}>Ir agora →</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const hemo = StyleSheet.create({
  card: { width: 150, backgroundColor: COLORS.card, borderRadius: 14, borderWidth: 1, borderColor: COLORS.cardBorder, overflow: "hidden", marginRight: 12 },
  imgPlaceholder: { height: 90, alignItems: "center", justifyContent: "center" },
  urgenteBadge: { position: "absolute", top: 6, left: 6, backgroundColor: COLORS.red, borderRadius: 6, paddingHorizontal: 7, paddingVertical: 2 },
  urgenteText: { color: "#fff", fontSize: 10, fontFamily: "DMSans_500Medium" },
  info: { padding: 10, gap: 3 },
  nome: { color: COLORS.text, fontSize: 12, fontFamily: "DMSans_500Medium" },
  abertura: { color: COLORS.gray, fontSize: 10, fontFamily: "DMSans_400Regular" },
  btn: { marginTop: 6, backgroundColor: COLORS.red, borderRadius: 8, paddingVertical: 5, alignItems: "center" },
  btnText: { color: "#fff", fontSize: 11, fontFamily: "DMSans_500Medium" },
});

export default function DoarAgoraScreen() {
  const [transport, setTransport] = useState(null as "uber" | "bus" | null);
  const [checks, setChecks] = useState({} as Record<string, boolean>);

  const [fontsLoaded] = useFonts({ Fraunces_700Bold, DMSans_400Regular, DMSans_500Medium });

  const toggleCheck = (id: string) => setChecks((prev) => ({ ...prev, [id]: !prev[id] }));
  const allChecked = PRE_CHECKS.every((c) => checks[c.id]);

  if (!fontsLoaded) return null;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.bg} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => Alert.alert("Menu", "")}>
          <Ionicons name="menu" size={26} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Doar agora</Text>
        <View style={{ width: 26 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* Banner urgente */}
        <View style={styles.banner}>
          <View style={styles.bannerBadge}>
            <Ionicons name="alert-circle" size={13} color="#fff" />
            <Text style={styles.bannerBadgeText}>Estoque crítico!</Text>
          </View>
          <Text style={styles.bannerTitle}>
            Precisamos de você{"\n"}agora!
          </Text>
          <Text style={styles.bannerSub}>
            Seu tipo sanguíneo{" "}
            <Text style={{ fontWeight: "800", color: "#fff" }}>AB+</Text>{" "}
            pode salvar até 3 vidas hoje.
          </Text>
        </View>

        {/* Hemocentros próximos */}
        <Text style={styles.sectionTitle}>Hemocentros próximos</Text>
        <FlatList
          data={HEMOCENTROS}
          keyExtractor={(i) => i.id}
          renderItem={({ item }) => <HemocentroCard item={item} fraunces={fontsLoaded} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 4 }}
          scrollEnabled
        />

        {/* Precisa de ajuda */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Precisa de ajuda para chegar?</Text>
          <Text style={styles.cardSub}>Escolha o melhor meio para você</Text>
          <View style={styles.transportRow}>
            <TouchableOpacity
              style={[styles.transportBtn, transport === "uber" && styles.transportBtnActive]}
              onPress={() => setTransport(transport === "uber" ? null : "uber")}
            >
              <MaterialCommunityIcons name="car" size={22} color={transport === "uber" ? "#fff" : COLORS.gray} />
              <Text style={[styles.transportLabel, transport === "uber" && { color: "#fff" }]}>Uber parceiro</Text>
              <Text style={[styles.transportDiscount, transport === "uber" && { color: "#ffd" }]}>Até 30% OFF</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.transportBtn, transport === "bus" && styles.transportBtnActive]}
              onPress={() => setTransport(transport === "bus" ? null : "bus")}
            >
              <MaterialIcons name="directions-bus" size={22} color={transport === "bus" ? "#fff" : COLORS.gray} />
              <Text style={[styles.transportLabel, transport === "bus" && { color: "#fff" }]}>Transporte público</Text>
              <Text style={[styles.transportDiscount, transport === "bus" && { color: "#ffd" }]}>Ver rotas</Text>
            </TouchableOpacity>
          </View>

          {transport && (
            <TouchableOpacity
              style={styles.chamarBtn}
              onPress={() => Alert.alert(transport === "uber" ? "Uber" : "Ônibus", transport === "uber" ? "Abrindo Uber com desconto..." : "Abrindo rotas de ônibus...")}
            >
              <Text style={styles.chamarBtnText}>{transport === "uber" ? "Chamar Uber" : "Ver rotas"}</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Checklist pré-doação */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Antes de doar, confira se você está apto:</Text>
          <View style={styles.checkGrid}>
            {PRE_CHECKS.map((c) => (
              <TouchableOpacity
                key={c.id}
                style={[styles.checkItem, checks[c.id] && styles.checkItemActive]}
                onPress={() => toggleCheck(c.id)}
                activeOpacity={0.8}
              >
                <MaterialCommunityIcons name={c.icon as any} size={20} color={checks[c.id] ? "#fff" : COLORS.gray} />
                <Text style={[styles.checkLabel, checks[c.id] && { color: "#fff" }]}>{c.label}</Text>
                {checks[c.id] && (
                  <Ionicons name="checkmark-circle" size={14} color="#fff" style={{ position: "absolute", top: 6, right: 6 }} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* CTA */}
        <TouchableOpacity
          style={[styles.ctaBtn, !allChecked && styles.ctaBtnDisabled]}
          activeOpacity={0.85}
          onPress={() =>
            allChecked
              ? Alert.alert("Ótimo!", "Você está apto para doar. Bom caminho!")
              : Alert.alert("Atenção", "Confirme todos os itens antes de prosseguir.")
          }
        >
          <Text style={styles.ctaBtnText}>Estou apto para doar</Text>
          <Ionicons name="chevron-forward" size={20} color="#fff" />
        </TouchableOpacity>

        <View style={{ height: 30 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 52,
    paddingBottom: 12,
    backgroundColor: COLORS.bg,
  },
  headerTitle: {
    fontFamily: "Fraunces_700Bold",
    color: COLORS.text,
    fontSize: 24,
    letterSpacing: 0.5,
  },
  scroll: { paddingTop: 8, gap: 14 },

  banner: {
    marginHorizontal: 16,
    backgroundColor: COLORS.red,
    borderRadius: 18,
    padding: 20,
    gap: 8,
  },
  bannerBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "rgba(0,0,0,0.25)",
    alignSelf: "flex-start",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  bannerBadgeText: { color: "#fff", fontSize: 11, fontFamily: "DMSans_500Medium" },
  bannerTitle: {
    fontFamily: "Fraunces_700Bold",
    color: "#fff",
    fontSize: 26,
    lineHeight: 32,
  },
  bannerSub: { fontFamily: "DMSans_400Regular", color: "rgba(255,255,255,0.85)", fontSize: 13, lineHeight: 19 },

  sectionTitle: {
    fontFamily: "Fraunces_700Bold",
    color: COLORS.text,
    fontSize: 16,
    paddingHorizontal: 16,
    marginBottom: -6,
  },

  card: {
    marginHorizontal: 16,
    backgroundColor: COLORS.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    padding: 16,
    gap: 10,
  },
  cardTitle: {
    fontFamily: "Fraunces_700Bold",
    color: COLORS.text,
    fontSize: 14,
  },
  cardSub: { fontFamily: "DMSans_400Regular", color: COLORS.gray, fontSize: 12, marginTop: -4 },

  transportRow: { flexDirection: "row", gap: 10 },
  transportBtn: {
    flex: 1,
    backgroundColor: "#f5f0ea",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    padding: 12,
    alignItems: "center",
    gap: 4,
  },
  transportBtnActive: { backgroundColor: COLORS.red, borderColor: COLORS.red },
  transportLabel: { fontFamily: "DMSans_500Medium", color: COLORS.gray, fontSize: 12, textAlign: "center" },
  transportDiscount: { fontFamily: "DMSans_500Medium", color: COLORS.red, fontSize: 11, textAlign: "center" },
  chamarBtn: { backgroundColor: COLORS.red, borderRadius: 10, paddingVertical: 12, alignItems: "center", marginTop: 2 },
  chamarBtnText: { fontFamily: "DMSans_500Medium", color: "#fff", fontSize: 14 },

  checkGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  checkItem: {
    width: "47%",
    backgroundColor: "#f5f0ea",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    padding: 12,
    alignItems: "center",
    gap: 6,
  },
  checkItemActive: { backgroundColor: COLORS.red, borderColor: COLORS.red },
  checkLabel: { fontFamily: "DMSans_500Medium", color: COLORS.gray, fontSize: 11, textAlign: "center" },

  ctaBtn: {
    marginHorizontal: 16,
    backgroundColor: COLORS.red,
    borderRadius: 50,
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  ctaBtnDisabled: { opacity: 0.5 },
  ctaBtnText: {
    fontFamily: "Fraunces_700Bold",
    color: "#fff",
    fontSize: 16,
  },
});