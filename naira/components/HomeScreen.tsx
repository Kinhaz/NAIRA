import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Image,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Definir RootStackParamList localmente para evitar erro de tipo
type RootStackParamList = { Home: undefined };

// =========================================
// CONFIGURAÇÕES FÁCEIS DE MODIFICAR
// =========================================
const USER_NAME = 'Usuário';             // ← nome dinâmico do usuário
const BLOOD_TYPE = 'AB+';               // ← tipo sanguíneo
const BLOOD_TYPE_LABEL = 'Receptor Universal';

const HEMOCENTRO_NAME = 'Hemocentro';
const HEMOCENTRO_ADDRESS = 'Av. Recife, 215';
const HEMOCENTRO_DISTANCE = '2,3Km';
const HEMOCENTRO_TIME = 'Hoje, até 17h';

const CAMPAIGN_TITLE = 'Juntos Por Mais Vidas';
const CAMPAIGN_SUBTITLE = 'Doe sangue. Espalhe a esperança';
const CAMPAIGN_DATE = 'Até 17/05';

const NAIRA_ICON_URL = 'https://snipboard.io/E6Vr8I.jpg';
// =========================================

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;
interface Props { navigation: HomeScreenNavigationProp; }

export default function HomeScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F0EB" />

      {/* ── Header ── */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuBtn}>
          <View style={styles.menuLine} />
          <View style={[styles.menuLine, { width: 18 }]} />
          <View style={styles.menuLine} />
        </TouchableOpacity>

        <View style={styles.logoRow}>
          <Image source={{ uri: NAIRA_ICON_URL }} style={styles.logoIcon} resizeMode="contain" />
          <Text style={styles.logoText}>NAIRA</Text>
        </View>

        <TouchableOpacity style={styles.notifBtn}>
          <Text style={styles.notifIcon}>🔔</Text>
          <View style={styles.notifBadge}>
            <Text style={styles.notifBadgeText}>1</Text>
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* ── Card Benefícios ── */}
        <View style={styles.benefitsCard}>
          <View style={styles.circle1} />
          <View style={styles.circle2} />
          <View style={styles.circle3} />
          <TouchableOpacity style={styles.benefitsLink}>
            <Text style={styles.benefitsLinkText}>Ver benefícios</Text>
          </TouchableOpacity>
        </View>

        {/* ── Saudação ── */}
        <View style={styles.greetingBlock}>
          <Text style={styles.greetingText}>Olá, {USER_NAME} 🙂</Text>
          <Text style={styles.greetingSubText}>O que você quer fazer hoje?</Text>
        </View>

        {/* ── Botões ── */}
        <TouchableOpacity style={styles.btnDonate} activeOpacity={0.85}>
          <Text style={styles.btnDonateIcon}>🩸</Text>
          <Text style={styles.btnDonateText}>DOAR AGORA</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnSearch} activeOpacity={0.85}>
          <Text style={styles.btnSearchIcon}>🔍</Text>
          <Text style={styles.btnSearchText}>Ver oportunidades próximas</Text>
        </TouchableOpacity>

        {/* ── Cards Hemocentro + Tipo Sanguíneo ── */}
        <View style={styles.infoRow}>
          <View style={[styles.infoCard, { flex: 1 }]}>
            <TouchableOpacity><Text style={styles.infoCardLink}>Ver mais</Text></TouchableOpacity>
            <Text style={styles.infoCardTitle}>{HEMOCENTRO_NAME}</Text>
            <Text style={styles.infoCardAddress}>{HEMOCENTRO_ADDRESS}</Text>
            <View style={styles.infoCardFooter}>
              <View style={styles.infoTag}><Text style={styles.infoTagText}>📍 {HEMOCENTRO_DISTANCE}</Text></View>
              <View style={styles.infoTag}><Text style={styles.infoTagText}>🕐 {HEMOCENTRO_TIME}</Text></View>
            </View>
          </View>

          <View style={[styles.infoCard, { flex: 1 }]}>
            <Text style={styles.infoCardLinkRed}>Tipo sanguíneo</Text>
            <Text style={styles.bloodType}>{BLOOD_TYPE}</Text>
            <Text style={styles.bloodTypeLabel}>{BLOOD_TYPE_LABEL}</Text>
            <TouchableOpacity style={styles.bloodBtn}>
              <Text style={styles.bloodBtnText}>Saber mais</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ── Banner Campanha ── */}
        <View style={styles.campaignCard}>
          <View style={styles.campaignHeader}>
            <Text style={styles.campaignLabel}>Campanhas em destaque</Text>
            <TouchableOpacity><Text style={styles.campaignJoin}>Participar</Text></TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.campaignBody} activeOpacity={0.85}>
            <View style={styles.campaignIconBox}>
              <Text style={styles.campaignIconText}>🩸</Text>
            </View>
            <View style={styles.campaignInfo}>
              <Text style={styles.campaignTitle}>{CAMPAIGN_TITLE}</Text>
              <Text style={styles.campaignSubtitle}>{CAMPAIGN_SUBTITLE}</Text>
              <Text style={styles.campaignDate}>{CAMPAIGN_DATE}</Text>
            </View>
            <Text style={styles.campaignArrow}>›</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

// =========================================
// CORES — fácil de trocar tudo aqui
// =========================================
const C = {
  bg:        '#F5F0EB',
  red:       '#C0392B',
  redCard:   '#B83232',
  redLight:  '#E8A09A',
  white:     '#FFFFFF',
  text:      '#1A1A1A',
  muted:     '#888888',
  light:     '#AAAAAA',
  border:    '#E8E0D8',
  card:      '#FFFFFF',
  pinkBg:    '#FDECEA',
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.bg },

  // Header
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 14 },
  menuBtn: { gap: 5, padding: 4 },
  menuLine: { width: 22, height: 2, backgroundColor: C.text, borderRadius: 2 },
  logoRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  logoIcon: { width: 32, height: 32, borderRadius: 16 },
  logoText: { fontSize: 20, fontWeight: '800', color: C.text, letterSpacing: 2 },
  notifBtn: { position: 'relative', padding: 4 },
  notifIcon: { fontSize: 22 },
  notifBadge: { position: 'absolute', top: 0, right: 0, backgroundColor: C.red, borderRadius: 8, width: 16, height: 16, alignItems: 'center', justifyContent: 'center' },
  notifBadgeText: { color: C.white, fontSize: 9, fontWeight: '700' },

  // Scroll
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 16 },

  // Card Benefícios
  benefitsCard: { height: 160, borderRadius: 20, backgroundColor: C.redCard, overflow: 'hidden', marginBottom: 24, position: 'relative' },
  circle1: { position: 'absolute', width: 200, height: 200, borderRadius: 100, backgroundColor: '#D94040', top: -60, left: -40, opacity: 0.6 },
  circle2: { position: 'absolute', width: 160, height: 160, borderRadius: 80, backgroundColor: '#A02020', bottom: -50, right: -20, opacity: 0.5 },
  circle3: { position: 'absolute', width: 100, height: 100, borderRadius: 50, backgroundColor: '#E85050', top: 20, right: 60, opacity: 0.3 },
  benefitsLink: { position: 'absolute', top: 14, right: 16 },
  benefitsLinkText: { color: C.white, fontSize: 13, fontWeight: '600', opacity: 0.9 },

  // Saudação
  greetingBlock: { marginBottom: 20, alignItems: 'center' },
  greetingText: { fontSize: 22, fontWeight: '700', color: C.text, marginBottom: 4 },
  greetingSubText: { fontSize: 18, fontWeight: '700', color: C.text },

  // Botões
  btnDonate: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: C.red, borderRadius: 30, paddingVertical: 16, marginBottom: 12, gap: 8, elevation: 4, shadowColor: C.red, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8 },
  btnDonateIcon: { fontSize: 16 },
  btnDonateText: { color: C.white, fontSize: 15, fontWeight: '800', letterSpacing: 1.5 },
  btnSearch: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: C.white, borderRadius: 30, paddingVertical: 15, marginBottom: 20, gap: 8, borderWidth: 1, borderColor: C.border },
  btnSearchIcon: { fontSize: 16 },
  btnSearchText: { color: C.text, fontSize: 14, fontWeight: '600' },

  // Cards Info
  infoRow: { flexDirection: 'row', gap: 12, marginBottom: 16 },
  infoCard: { backgroundColor: C.card, borderRadius: 16, padding: 14, borderWidth: 1, borderColor: C.border },
  infoCardLink: { fontSize: 12, color: C.muted, marginBottom: 6 },
  infoCardLinkRed: { fontSize: 12, color: C.red, fontWeight: '600', marginBottom: 6 },
  infoCardTitle: { fontSize: 18, fontWeight: '800', color: C.text, marginBottom: 2 },
  infoCardAddress: { fontSize: 12, color: C.muted, marginBottom: 10 },
  infoCardFooter: { gap: 6 },
  infoTag: { backgroundColor: C.bg, borderRadius: 20, paddingHorizontal: 8, paddingVertical: 4, alignSelf: 'flex-start' },
  infoTagText: { fontSize: 11, color: C.muted },
  bloodType: { fontSize: 36, fontWeight: '900', color: C.text, marginBottom: 2, letterSpacing: -1 },
  bloodTypeLabel: { fontSize: 11, color: C.muted, marginBottom: 12 },
  bloodBtn: { backgroundColor: C.bg, borderRadius: 20, paddingHorizontal: 12, paddingVertical: 6, alignSelf: 'flex-start', borderWidth: 1, borderColor: C.border },
  bloodBtnText: { fontSize: 12, color: C.text, fontWeight: '600' },

  // Campanha
  campaignCard: { backgroundColor: C.card, borderRadius: 16, padding: 14, borderWidth: 1, borderColor: C.border },
  campaignHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  campaignLabel: { fontSize: 13, color: C.muted, fontWeight: '500' },
  campaignJoin: { fontSize: 13, color: C.red, fontWeight: '700' },
  campaignBody: { flexDirection: 'row', alignItems: 'center', backgroundColor: C.pinkBg, borderRadius: 12, padding: 12, gap: 12 },
  campaignIconBox: { width: 44, height: 44, borderRadius: 10, backgroundColor: C.redLight, alignItems: 'center', justifyContent: 'center' },
  campaignIconText: { fontSize: 20 },
  campaignInfo: { flex: 1 },
  campaignTitle: { fontSize: 14, fontWeight: '800', color: C.text, marginBottom: 2 },
  campaignSubtitle: { fontSize: 12, color: C.muted, marginBottom: 2 },
  campaignDate: { fontSize: 11, color: C.light },
  campaignArrow: { fontSize: 24, color: C.muted },
});
