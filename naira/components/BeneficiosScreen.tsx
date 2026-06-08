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
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { useFonts, Fraunces_700Bold } from "@expo-google-fonts/fraunces";
import { DMSans_400Regular, DMSans_500Medium } from "@expo-google-fonts/dm-sans";

// =========================================
// CORES
// =========================================
const COLORS = {
  bg:         "#FAF7F2",
  card:       "#F5D9D9",
  cardBorder: "#EAC4C4",
  iconStroke: "#3a1a1a",
  text:       "#1a0000",
  gray:       "#888888",
  white:      "#ffffff",
  divider:    "#e8e0d5",
};

// =========================================
// DADOS DOS BENEFÍCIOS — fácil de modificar
// =========================================
const BENEFICIOS = [
  { id: "1", label: "Cinema meia\nentrada",       icon: "ticket",         iconLib: "fa5" },
  { id: "2", label: "Fila de\nprioridade",         icon: "time-outline",   iconLib: "ion" },
  { id: "3", label: "Descontos\nmédicos",          icon: "medkit-outline", iconLib: "ion" },
  { id: "4", label: "Descontos\nfarmacêuticos",    icon: "flask-outline",  iconLib: "ion" },
  { id: "5", label: "VEM Doador",                  icon: "bus-outline",    iconLib: "ion" },
  { id: "6", label: "Estacionamento\nHospitalar",  icon: "car-outline",    iconLib: "ion" },
];

// =========================================
// COMPONENTE ÍCONE
// =========================================
function BeneficioIcon({ icon, iconLib }: { icon: string; iconLib: string }) {
  const size = 36;
  const color = COLORS.iconStroke;
  if (iconLib === "fa5") return <FontAwesome5 name={icon as any} size={size} color={color} />;
  return <Ionicons name={icon as any} size={size} color={color} />;
}

// =========================================
// SCREEN
// =========================================
export default function BeneficiosScreen({ navigation }: { navigation?: any }) {
  const [fontsLoaded] = useFonts({ Fraunces_700Bold, DMSans_400Regular, DMSans_500Medium });
  if (!fontsLoaded) return null;

  // Agrupa em pares para o grid 2 colunas
  const rows: (typeof BENEFICIOS)[] = [];
  for (let i = 0; i < BENEFICIOS.length; i += 2) {
    rows.push(BENEFICIOS.slice(i, i + 2));
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.bg} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.menuBtn}
          onPress={() => navigation?.goBack()}
        >
          <Ionicons name="menu" size={24} color={COLORS.text} />
        </TouchableOpacity>

        <View style={styles.headerDivider} />
        <Text style={styles.headerTitle}>Benefícios</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Grid 2 colunas */}
        {rows.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.beneficioCard}
                activeOpacity={0.8}
                onPress={() => {}}
              >
                <View style={styles.beneficioIconWrap}>
                  <BeneficioIcon icon={item.icon} iconLib={item.iconLib} />
                </View>
                <Text style={styles.beneficioLabel}>{item.label}</Text>
              </TouchableOpacity>
            ))}
            {row.length === 1 && <View style={styles.cardPlaceholder} />}
          </View>
        ))}

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

// =========================================
// ESTILOS
// =========================================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },

  // Header
  header: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 4,
    backgroundColor: COLORS.bg,
    alignItems: "center",
  },
  menuBtn: {
    position: "absolute",
    left: 20,
    top: 8,
    padding: 4,
  },
  headerDivider: {
    width: "60%",
    height: 1,
    backgroundColor: COLORS.divider,
    marginBottom: 12,
    marginTop: 2,
    alignSelf: "center",
  },
  headerTitle: {
    fontFamily: "Fraunces_700Bold",
    fontSize: 20,
    color: COLORS.text,
    letterSpacing: 0.3,
    marginBottom: 4,
  },

  // Scroll
  scroll: {
    paddingHorizontal: 16,
    paddingTop: 16,
    gap: 14,
  },

  // Grid
  row: {
    flexDirection: "row",
    gap: 14,
  },

  // Card
  beneficioCard: {
    flex: 1,
    backgroundColor: COLORS.card,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    paddingVertical: 28,
    paddingHorizontal: 12,
    alignItems: "center",
    justifyContent: "center",
    gap: 14,
    minHeight: 150,
  },
  beneficioIconWrap: {
    alignItems: "center",
    justifyContent: "center",
  },
  beneficioLabel: {
    fontFamily: "DMSans_500Medium",
    fontSize: 13,
    color: COLORS.text,
    textAlign: "center",
    lineHeight: 18,
  },

  // Placeholder grid ímpar
  cardPlaceholder: {
    flex: 1,
  },
});
