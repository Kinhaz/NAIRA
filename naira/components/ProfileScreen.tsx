import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Alert,
  Image,
} from "react-native";
import { Ionicons, MaterialIcons, FontAwesome5, Feather } from "@expo/vector-icons";
import { useFonts, Fraunces_700Bold } from "@expo-google-fonts/fraunces";
import { DMSans_400Regular, DMSans_500Medium } from "@expo-google-fonts/dm-sans";

const COLORS = {
  bg: "#FAF7F2",
  card: "#ffffff",
  cardBorder: "#e8e0d5",
  red: "#C8233C",
  redLight: "#fde8eb",
  redBg: "#fde8eb",
  text: "#1a0000",
  gray: "#888888",
  white: "#ffffff",
};

// ── Card base ────────────────────────────────────────────────────────────────
function Card({ children, style, onPress }: any) {
  if (onPress) {
    return (
      <TouchableOpacity style={[styles.card, style]} activeOpacity={0.8} onPress={onPress}>
        {children}
      </TouchableOpacity>
    );
  }
  return <View style={[styles.card, style]}>{children}</View>;
}

// ── Linha de info do perfil ──────────────────────────────────────────────────
function InfoRow({ icon, text }: { icon: any; text: string }) {
  return (
    <View style={styles.infoRow}>
      {icon}
      <Text style={styles.infoText}>{text}</Text>
    </View>
  );
}

// ── Card de Agendamentos ─────────────────────────────────────────────────────
function AgendamentosCard() {
  return (
    <Card onPress={() => Alert.alert("Agendamentos", "Abrindo agendamentos...")}>
      <View style={styles.cardHeader}>
        <View style={styles.cardIconWrap}>
          <MaterialIcons name="calendar-today" size={20} color={COLORS.red} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.cardTitle}>Agendamentos</Text>
          <Text style={styles.cardSubtitle}>Acompanhe e gerencie seus agendamentos</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color={COLORS.gray} />
      </View>

      <View style={styles.agendamentoBox}>
        <View style={styles.agendamentoLabelRow}>
          <MaterialIcons name="event" size={13} color={COLORS.red} />
          <Text style={styles.agendamentoLabel}>Próxima doação</Text>
        </View>
        <View style={styles.agendamentoDateRow}>
          <Text style={styles.agendamentoDate}>20 de Novembro às 16:20h</Text>
          <TouchableOpacity
            style={styles.verDetalhesBtn}
            onPress={() => Alert.alert("Detalhes", "Detalhes do agendamento")}
          >
            <Text style={styles.verDetalhesBtnText}>Ver detalhes</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Card>
  );
}

// ── Card Tipo Sanguíneo ──────────────────────────────────────────────────────
function TipoSanguineoCard() {
  return (
    <Card onPress={() => Alert.alert("Tipo Sanguíneo", "Informações sobre seu tipo")}>
      <View style={styles.cardHeader}>
        <View style={styles.cardIconWrap}>
          <FontAwesome5 name="tint" size={18} color={COLORS.red} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.cardTitle}>Tipo Sanguíneo</Text>
          <Text style={styles.cardSubtitle}>Personalize seus dados para estar apto a doar</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color={COLORS.gray} />
      </View>

      <View style={styles.bloodRow}>
        <View style={styles.bloodBox}>
          <Text style={styles.bloodType}>AB+</Text>
          <Text style={styles.bloodDesc}>Receptor Universal</Text>
        </View>
        <View style={styles.compatBtn}>
          <FontAwesome5 name="tint" size={12} color={COLORS.red} />
          <Text style={styles.compatBtnText}>Tipos sanguíneos{"\n"}extremamente raros</Text>
        </View>
      </View>
    </Card>
  );
}

// ── Card Conexões ────────────────────────────────────────────────────────────
function ConexoesCard() {
  return (
    <Card onPress={() => Alert.alert("Conexões", "Abrindo conexões...")}>
      <View style={styles.cardHeader}>
        <View style={styles.cardIconWrap}>
          <Ionicons name="people" size={20} color={COLORS.red} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.cardTitle}>Conexões</Text>
          <Text style={styles.cardSubtitle}>Interaja com amigos e convide mais doadores</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color={COLORS.gray} />
      </View>

      {/* Caixa inferior: slogan | divisor | botão */}
      <View style={styles.conexoesBox}>
        <Text style={styles.conexoesSlogan}>Convide seus amigos{"\n"}E salve mais vidas!</Text>
        <View style={styles.conexoesDivider} />
        <TouchableOpacity
          style={styles.convidarBtn}
          onPress={() => Alert.alert("Convidar", "Convidando amigos...")}
        >
          <Ionicons name="person-add-outline" size={14} color={COLORS.red} />
          <Text style={styles.convidarBtnText}>Convidar</Text>
        </TouchableOpacity>
      </View>
    </Card>
  );
}

// ── Card Atividade ───────────────────────────────────────────────────────────
function AtividadeCard() {
  const stats = [
    { value: "22", label: "Acessos\neste mês" },
    { value: "25", label: "Campanhas\nparticipadas" },
    { value: "06", label: "Convites enviados\neste mês" },
  ];
  return (
    <Card onPress={() => Alert.alert("Atividade", "Abrindo atividade...")}>
      <View style={styles.cardHeader}>
        <View style={styles.cardIconWrap}>
          <MaterialIcons name="bar-chart" size={20} color={COLORS.red} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.cardTitle}>Atividade</Text>
          <Text style={styles.cardSubtitle}>Veja um resumo da sua participação</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color={COLORS.gray} />
      </View>

      <View style={styles.statsRow}>
        {stats.map((s, i) => (
          <View key={i} style={styles.statBox}>
            <Text style={styles.statValue}>{s.value}</Text>
            <Text style={styles.statLabel}>{s.label}</Text>
          </View>
        ))}
      </View>
    </Card>
  );
}

// ── Tela principal ───────────────────────────────────────────────────────────
export default function ProfileScreen() {
  const [fontsLoaded] = useFonts({ Fraunces_700Bold, DMSans_400Regular, DMSans_500Medium });
  if (!fontsLoaded) return null;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.bg} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => Alert.alert("Menu", "Abrindo menu...")}>
          <Ionicons name="menu" size={26} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Perfil</Text>
        <View style={{ width: 26 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* Card de perfil */}
        <Card>
          <View style={styles.profileRow}>
            {/* Avatar */}
            <View style={styles.avatarCircle}>
              <FontAwesome5 name="user-alt" size={36} color={COLORS.red} />
            </View>

            {/* Infos */}
            <View style={styles.profileInfo}>
              <View style={styles.profileNameRow}>
                <Text style={styles.profileName}>Lucas Azevedo</Text>
                <TouchableOpacity
                  onPress={() => Alert.alert("Editar", "Editando perfil...")}
                  style={{ marginLeft: 6 }}
                >
                  <Feather name="edit-2" size={14} color={COLORS.red} />
                </TouchableOpacity>
              </View>
              <InfoRow
                icon={<MaterialIcons name="email" size={13} color={COLORS.gray} style={{ marginRight: 5 }} />}
                text="lucas27@gmail.com"
              />
              <InfoRow
                icon={<Feather name="phone" size={13} color={COLORS.gray} style={{ marginRight: 5 }} />}
                text="(81) 98765-4321"
              />
              <InfoRow
                icon={<Ionicons name="location-outline" size={13} color={COLORS.gray} style={{ marginRight: 5 }} />}
                text="Recife, PE"
              />
            </View>
          </View>
        </Card>

        <AgendamentosCard />
        <TipoSanguineoCard />
        <ConexoesCard />
        <AtividadeCard />

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
    letterSpacing: 0.3,
  },
  scroll: { paddingHorizontal: 16, paddingTop: 8, gap: 12 },

  // Card base
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    padding: 16,
  },
  cardHeader: { flexDirection: "row", alignItems: "center", gap: 12 },
  cardIconWrap: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: COLORS.redBg,
    alignItems: "center",
    justifyContent: "center",
  },
  cardTitle: {
    fontFamily: "DMSans_500Medium",
    color: COLORS.text,
    fontSize: 14,
  },
  cardSubtitle: {
    fontFamily: "DMSans_400Regular",
    color: COLORS.gray,
    fontSize: 11,
    marginTop: 1,
    lineHeight: 16,
  },

  // Perfil
  profileRow: { flexDirection: "row", alignItems: "flex-start", gap: 14 },
  avatarCircle: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: COLORS.redBg,
    borderWidth: 2,
    borderColor: COLORS.cardBorder,
    alignItems: "center",
    justifyContent: "center",
  },
  profileInfo: { flex: 1, gap: 5 },
  profileNameRow: { flexDirection: "row", alignItems: "center" },
  profileName: { fontFamily: "DMSans_500Medium", color: COLORS.text, fontSize: 16 },
  infoRow: { flexDirection: "row", alignItems: "center" },
  infoText: { fontFamily: "DMSans_400Regular", color: COLORS.gray, fontSize: 12 },

  // Agendamentos
  agendamentoBox: {
    marginTop: 12,
    backgroundColor: COLORS.bg,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    padding: 12,
    gap: 6,
  },
  agendamentoLabelRow: { flexDirection: "row", alignItems: "center", gap: 5 },
  agendamentoLabel: {
    fontFamily: "DMSans_500Medium",
    color: COLORS.gray,
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: 0.4,
  },
  agendamentoDateRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  agendamentoDate: { fontFamily: "DMSans_500Medium", color: COLORS.text, fontSize: 13, flex: 1 },
  verDetalhesBtn: {
    backgroundColor: COLORS.redBg,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  verDetalhesBtnText: { fontFamily: "DMSans_500Medium", color: COLORS.red, fontSize: 11 },

  // Tipo sanguíneo
  bloodRow: { flexDirection: "row", marginTop: 12, gap: 10 },
  bloodBox: {
    flex: 1,
    backgroundColor: COLORS.bg,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    padding: 12,
    alignItems: "center",
  },
  bloodType: { fontFamily: "Fraunces_700Bold", color: COLORS.red, fontSize: 28 },
  bloodDesc: { fontFamily: "DMSans_400Regular", color: COLORS.gray, fontSize: 11, marginTop: 2 },
  compatBtn: {
    flex: 1.5,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.redBg,
    borderRadius: 10,
    padding: 12,
    gap: 8,
  },
  compatBtnText: { fontFamily: "DMSans_500Medium", color: COLORS.red, fontSize: 12, lineHeight: 17, flex: 1 },

  // Conexões
  conexoesBox: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 0,
  },
  conexoesSlogan: {
    fontFamily: "DMSans_400Regular",
    color: COLORS.text,
    fontSize: 12,
    lineHeight: 18,
    flex: 1,
  },
  conexoesDivider: {
    width: 1,
    height: 32,
    backgroundColor: COLORS.cardBorder,
    marginHorizontal: 12,
  },
  convidarBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.redBg,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 6,
  },
  convidarBtnText: { fontFamily: "DMSans_500Medium", color: COLORS.red, fontSize: 12 },

  // Atividade
  statsRow: { flexDirection: "row", marginTop: 12, gap: 10 },
  statBox: {
    flex: 1,
    backgroundColor: COLORS.bg,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    padding: 10,
    alignItems: "center",
  },
  statValue: { fontFamily: "Fraunces_700Bold", color: COLORS.red, fontSize: 24 },
  statLabel: {
    fontFamily: "DMSans_400Regular",
    color: COLORS.gray,
    fontSize: 10,
    textAlign: "center",
    marginTop: 3,
    lineHeight: 14,
  },
});