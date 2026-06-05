import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Alert,
} from "react-native";
import { Ionicons, MaterialIcons, FontAwesome5, Feather } from "@expo/vector-icons";

const COLORS = {
  bg: "#1a1a1a",
  card: "#2a2a2a",
  cardBorder: "#3a3a3a",
  pink: "#e8637a",
  pinkLight: "#f0899c",
  pinkBg: "#3d2329",
  white: "#ffffff",
  gray: "#aaaaaa",
  grayDark: "#666666",
  text: "#eeeeee",
};

function Card(props: any) {
  const { children, style } = props;
  return <View style={[styles.card, style]}>{children}</View>;
}

function InfoRow({ icon, text }: { icon: any; text: string }) {
  return (
    <View style={styles.infoRow}>
      {icon}
      <Text style={styles.infoText}>{text}</Text>
    </View>
  );
}

function AgendamentosCard() {
  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.8}
      onPress={() => Alert.alert("Agendamentos", "Abrindo agendamentos...")}
    >
      <View style={styles.cardHeader}>
        <View style={styles.cardIconWrap}>
          <MaterialIcons name="calendar-today" size={22} color={COLORS.pink} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.cardTitle}>Agendamentos</Text>
          <Text style={styles.cardSubtitle}>Acompanhe e gerencie seus agendamentos</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color={COLORS.gray} />
      </View>
      <View style={styles.agendamentoNext}>
        <View style={styles.agendamentoDateBox}>
          <MaterialIcons name="event" size={16} color={COLORS.pink} />
          <Text style={styles.agendamentoDateLabel}>Próxima visita</Text>
        </View>
        <View style={styles.agendamentoDateRow}>
          <Text style={styles.agendamentoDate}>20 de Novembro de 16h20s</Text>
          <TouchableOpacity
            style={styles.detailsBtn}
            onPress={() => Alert.alert("Detalhes", "Detalhes do agendamento")}
          >
            <Text style={styles.detailsBtnText}>Ver detalhes</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

function TipoSanguineoCard() {
  const [expanded, setExpanded] = useState(false);
  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.8}
      onPress={() => setExpanded(!expanded)}
    >
      <View style={styles.cardHeader}>
        <View style={styles.cardIconWrap}>
          <FontAwesome5 name="tint" size={20} color={COLORS.pink} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.cardTitle}>Tipo Sanguíneo</Text>
          <Text style={styles.cardSubtitle}>Informação importante para ajudar a doar</Text>
        </View>
        <Ionicons name={expanded ? "chevron-up" : "chevron-down"} size={20} color={COLORS.gray} />
      </View>
      <View style={styles.bloodTypeRow}>
        <View style={styles.bloodTypeBox}>
          <Text style={styles.bloodTypeLabel}>AB+</Text>
          <Text style={styles.bloodTypeDesc}>Receptor Universal</Text>
        </View>
        <TouchableOpacity style={styles.doarBtn}
          onPress={() => Alert.alert("Doação", "Informações sobre doação de sangue")}>
          <FontAwesome5 name="tint" size={13} color="#fff" />
          <Text style={styles.doarBtnText}>Tipos sanguíneos{"\n"}compatíveis</Text>
        </TouchableOpacity>
      </View>
      {expanded && (
        <Text style={[styles.cardSubtitle, { marginTop: 10 }]}>
          AB+ pode receber de todos os tipos sanguíneos e doar plasma para qualquer pessoa.
        </Text>
      )}
    </TouchableOpacity>
  );
}

function ConexoesCard() {
  const [cancelado, setCancelado] = useState(false);
  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.8}
      onPress={() => Alert.alert("Conexões", "Abrindo conexões...")}
    >
      <View style={styles.cardHeader}>
        <View style={styles.cardIconWrap}>
          <Ionicons name="people" size={22} color={COLORS.pink} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.cardTitle}>Conexões</Text>
          <Text style={styles.cardSubtitle}>Interaja com amigos e encontre mais doadores</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color={COLORS.gray} />
      </View>
      <View style={styles.conexoesRow}>
        <Text style={[styles.cardSubtitle, { flex: 1 }]}>Convide seus amigos</Text>
        <TouchableOpacity
          style={[styles.cancelarBtn, cancelado && { backgroundColor: COLORS.grayDark }]}
          onPress={() => { setCancelado(!cancelado); }}>
          <Text style={styles.cancelarBtnText}>{cancelado ? "Convidar" : "Cancelar"}</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

function AtividadeCard() {
  const stats = [
    { value: "22", label: "acessos\neste mês" },
    { value: "25", label: "Campanhas\nparticipadas" },
    { value: "06", label: "Convites enviados\neste mês" },
  ];
  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.8}
      onPress={() => Alert.alert("Atividade", "Abrindo atividade...")}
    >
      <View style={styles.cardHeader}>
        <View style={styles.cardIconWrap}>
          <MaterialIcons name="bar-chart" size={22} color={COLORS.pink} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.cardTitle}>Atividade</Text>
          <Text style={styles.cardSubtitle}>Acompanhe sua participação</Text>
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
    </TouchableOpacity>
  );
}

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.bg} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => Alert.alert("Menu", "Abrindo menu...")}>
          <Ionicons name="menu" size={26} color={COLORS.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Perfil</Text>
        <View style={{ width: 26 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Card>
          <View style={styles.profileRow}>
            <View style={styles.avatarCircle}>
              <FontAwesome5 name="user-alt" size={38} color={COLORS.pink} />
            </View>
            <View style={styles.profileInfo}>
              <View style={styles.profileNameRow}>
                <Text style={styles.profileName}>Lucas Azevedo</Text>
                <TouchableOpacity onPress={() => Alert.alert("Editar", "Editando perfil...")} style={{ marginLeft: 8 }}>
                  <Feather name="edit-2" size={15} color={COLORS.pink} />
                </TouchableOpacity>
              </View>
              <InfoRow
                icon={<MaterialIcons name="email" size={13} color={COLORS.gray} style={{ marginRight: 5 }} />}
                text="azevdolucas@gmail.com" />
              <InfoRow
                icon={<Feather name="phone" size={13} color={COLORS.gray} style={{ marginRight: 5 }} />}
                text="(81) 98765-4321" />
              <InfoRow
                icon={<Ionicons name="location-outline" size={13} color={COLORS.gray} style={{ marginRight: 5 }} />}
                text="Recife, PE" />
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
    flexDirection: "row", alignItems: "center", justifyContent: "space-between",
    paddingHorizontal: 20, paddingTop: 52, paddingBottom: 12, backgroundColor: COLORS.bg,
  },
  headerTitle: { color: COLORS.white, fontSize: 22, fontWeight: "700", letterSpacing: 0.5 },
  scrollContent: { paddingHorizontal: 16, paddingTop: 8, gap: 12 },
  card: {
    backgroundColor: COLORS.card, borderRadius: 16,
    borderWidth: 1, borderColor: COLORS.cardBorder, padding: 16,
  },
  cardHeader: { flexDirection: "row", alignItems: "center", gap: 12 },
  cardIconWrap: {
    width: 40, height: 40, borderRadius: 12, backgroundColor: COLORS.pinkBg,
    alignItems: "center", justifyContent: "center",
  },
  cardTitle: { color: COLORS.white, fontSize: 15, fontWeight: "700" },
  cardSubtitle: { color: COLORS.gray, fontSize: 12, marginTop: 2, lineHeight: 17 },
  profileRow: { flexDirection: "row", alignItems: "flex-start", gap: 16 },
  avatarCircle: {
    width: 80, height: 80, borderRadius: 40, backgroundColor: COLORS.pinkBg,
    borderWidth: 2, borderColor: COLORS.pink, alignItems: "center", justifyContent: "center",
  },
  profileInfo: { flex: 1, gap: 5 },
  profileNameRow: { flexDirection: "row", alignItems: "center" },
  profileName: { color: COLORS.white, fontSize: 17, fontWeight: "700" },
  infoRow: { flexDirection: "row", alignItems: "center" },
  infoText: { color: COLORS.gray, fontSize: 12 },
  agendamentoNext: { marginTop: 14, backgroundColor: "#1e1e1e", borderRadius: 10, padding: 12, gap: 6 },
  agendamentoDateBox: { flexDirection: "row", alignItems: "center", gap: 6 },
  agendamentoDateLabel: { color: COLORS.gray, fontSize: 11, fontWeight: "600", textTransform: "uppercase", letterSpacing: 0.5 },
  agendamentoDateRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  agendamentoDate: { color: COLORS.white, fontSize: 13, fontWeight: "600", flex: 1 },
  detailsBtn: { backgroundColor: COLORS.pink, borderRadius: 8, paddingHorizontal: 12, paddingVertical: 6 },
  detailsBtnText: { color: "#fff", fontSize: 11, fontWeight: "700" },
  bloodTypeRow: { flexDirection: "row", alignItems: "center", marginTop: 14, gap: 12 },
  bloodTypeBox: { flex: 1, backgroundColor: "#1e1e1e", borderRadius: 10, padding: 12, alignItems: "center" },
  bloodTypeLabel: { color: COLORS.pink, fontSize: 28, fontWeight: "800" },
  bloodTypeDesc: { color: COLORS.gray, fontSize: 11, marginTop: 2 },
  doarBtn: { flex: 1.4, flexDirection: "row", alignItems: "center", backgroundColor: COLORS.pink, borderRadius: 10, padding: 12, gap: 8 },
  doarBtnText: { color: "#fff", fontSize: 12, fontWeight: "700", lineHeight: 17 },
  conexoesRow: { flexDirection: "row", alignItems: "center", marginTop: 12, gap: 10 },
  cancelarBtn: { backgroundColor: COLORS.pink, borderRadius: 8, paddingHorizontal: 16, paddingVertical: 8 },
  cancelarBtnText: { color: "#fff", fontSize: 12, fontWeight: "700" },
  statsRow: { flexDirection: "row", marginTop: 14, gap: 10 },
  statBox: { flex: 1, backgroundColor: "#1e1e1e", borderRadius: 10, padding: 12, alignItems: "center" },
  statValue: { color: COLORS.pink, fontSize: 26, fontWeight: "800" },
  statLabel: { color: COLORS.gray, fontSize: 10, textAlign: "center", marginTop: 4, lineHeight: 14 },
});