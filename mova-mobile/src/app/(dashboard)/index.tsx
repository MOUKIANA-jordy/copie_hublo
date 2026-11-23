import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import * as SecureStore from "expo-secure-store";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const PURPLE = "#695AE8";

type MovaUser = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  account_type: string;
  is_verified: boolean;
};

type IconName = React.ComponentProps<typeof Ionicons>["name"];

function SectionTitle({
  title,
  action,
  onPress,
}: {
  title: string;
  action?: string;
  onPress?: () => void;
}) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {action && (
        <TouchableOpacity onPress={onPress}>
          <Text style={styles.sectionAction}>{action}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

function MissionCounter({
  title,
  value,
  icon,
  color,
  background,
}: {
  title: string;
  value: number;
  icon: IconName;
  color: string;
  background: string;
}) {
  return (
    <TouchableOpacity
      style={styles.counter}
      onPress={() => router.push("/(dashboard)/missions")}
    >
      <View style={[styles.counterIcon, { backgroundColor: background }]}>
        <Ionicons name={icon} size={25} color={color} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.counterValue}>{value}</Text>
        <Text style={styles.counterTitle}>{title}</Text>
      </View>
      <Ionicons name="chevron-forward" size={23} color="#292633" />
    </TouchableOpacity>
  );
}

function AvailabilityPreview() {
  const days = useMemo(() => {
    const today = new Date();
    const labels = ["dim.", "lun.", "mar.", "mer.", "jeu.", "ven.", "sam."];

    return Array.from({ length: 7 }, (_, index) => {
      const date = new Date(today);
      date.setDate(today.getDate() + index);

      return {
        key: date.toISOString().slice(0, 10),
        number: date.getDate(),
        label: labels[date.getDay()],
      };
    });
  }, []);

  return (
    <View style={styles.availabilityCard}>
      <View style={styles.availabilityRow}>
        <Ionicons name="sunny-outline" size={22} color="#E8AD4A" />
        {days.map((day) => (
          <View key={day.key} style={styles.dayColumn}>
            <Text style={styles.dayNumber}>{day.number}</Text>
            <Text style={styles.dayLabel}>{day.label}</Text>
            <View style={styles.daySlot} />
          </View>
        ))}
      </View>

      <View style={styles.availabilityRow}>
        <Ionicons name="moon-outline" size={22} color="#6156B9" />
        {days.map((day) => (
          <View key={day.key} style={styles.dayColumn}>
            <View style={styles.daySlot} />
          </View>
        ))}
      </View>

      <Text style={styles.helperText}>
        Vos disponibilités seront affichées ici après synchronisation.
      </Text>
    </View>
  );
}

export default function DashboardHome() {
   const [user, setUser] = useState<MovaUser | null>(null);

  useEffect(() => {
    let active = true;

    const loadProfile = async () => {
      try {
        const token = await SecureStore.getItemAsync(
          "mova_access_token"
        );

        if (!token) return;

        const apiUrl = process.env.EXPO_PUBLIC_API_URL;

        if (!apiUrl) {
          console.warn("EXPO_PUBLIC_API_URL manquante");
          return;
        }

        const response = await fetch(
          `${apiUrl}/api/auth/me/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          console.warn("Profil MOVA :", response.status);
          return;
        }

        const data: MovaUser = await response.json();

        if (active) {
          setUser(data);
        }
      } catch (error) {
        console.error("Erreur chargement profil :", error);
      }
    };

    loadProfile();

    return () => {
      active = false;
    };
  }, []);
  
   return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.topRow}>
          <View>
            <Text style={styles.eyebrow}>VOTRE ESPACE PERSONNEL</Text>
            <Text style={styles.greeting}>
  		{user?.first_name
    		  ? `Ravi de vous revoir, ${user.first_name} ! 👋`
    		  : "Bienvenue sur MOVA 👋"}
	    </Text>
            <Text style={styles.subtitle}>
              Vos opportunités commencent ici.
            </Text>
          </View>
          <View style={styles.avatar}>
            <Ionicons name="person-outline" size={25} color={PURPLE} />
          </View>
        </View>

        <View style={styles.hero}>
          <View style={styles.heroText}>
            <Text style={styles.heroTag}>MOVA • MISSIONS</Text>
            <Text style={styles.heroTitle}>
              Votre prochaine opportunité vous attend.
            </Text>
            <Text style={styles.heroSubtitle}>
              Explorez les missions adaptées à vos compétences.
            </Text>
            <TouchableOpacity
              style={styles.heroButton}
              onPress={() => router.push("/(dashboard)/missions")}
            >
              <Text style={styles.heroButtonText}>Découvrir les missions</Text>
              <Ionicons name="arrow-forward" size={16} color={PURPLE} />
            </TouchableOpacity>
          </View>
          <Ionicons
            name="flash"
            size={60}
            color="#C9C2FF"
            style={styles.heroDecoration}
          />
        </View>

        <SectionTitle title="Mes missions" />

        <MissionCounter
          title="Disponibles"
          value={0}
          icon="briefcase-outline"
          color="#3976CD"
          background="#E5F0FF"
        />
        <MissionCounter
          title="En attente"
          value={0}
          icon="hourglass-outline"
          color="#BE861D"
          background="#FFF2CF"
        />
        <MissionCounter
          title="Confirmées"
          value={0}
          icon="checkmark-circle-outline"
          color="#248B59"
          background="#DCF8E8"
        />

        <SectionTitle title="Prochaine mission" />

        <View style={styles.emptyCard}>
          <View style={styles.emptyIcon}>
            <Ionicons name="calendar-clear-outline" size={30} color={PURPLE} />
          </View>
          <Text style={styles.emptyTitle}>Aucune mission programmée</Text>
          <Text style={styles.emptyDescription}>
            Vos prochaines missions confirmées apparaîtront ici.
          </Text>
        </View>

        <SectionTitle
          title="Disponibilités"
          action="Modifier"
          onPress={() => router.push("/(dashboard)/planning")}
        />

        <AvailabilityPreview />

        <SectionTitle
          title="Mes candidatures"
          action="Voir les emplois"
          onPress={() => router.push("/(dashboard)/emplois")}
        />

        <View style={styles.applicationRow}>
          <View style={styles.applicationCard}>
            <Ionicons name="business-outline" size={26} color="#368F65" />
            <Text style={styles.applicationValue}>0</Text>
            <Text style={styles.applicationLabel}>Acceptées</Text>
          </View>
          <View style={styles.applicationCard}>
            <Ionicons name="time-outline" size={26} color="#C79532" />
            <Text style={styles.applicationValue}>0</Text>
            <Text style={styles.applicationLabel}>En attente</Text>
          </View>
        </View>

        <Text style={styles.footer}>
          MOVA — Votre carrière, vos opportunités.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#FAF9FC" },
  content: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 35 },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 26,
  },
  eyebrow: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.5,
    color: PURPLE,
    marginBottom: 9,
  },
  greeting: { fontSize: 25, fontWeight: "800", color: "#211D2B" },
  subtitle: { fontSize: 13, color: "#777181", marginTop: 7 },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 16,
    backgroundColor: "#EEEBFF",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
  hero: {
    backgroundColor: PURPLE,
    borderRadius: 25,
    padding: 23,
    minHeight: 225,
    marginBottom: 31,
    overflow: "hidden",
  },
  heroText: { zIndex: 1, maxWidth: "87%" },
  heroTag: {
    color: "#E6E1FF",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1.5,
  },
  heroTitle: {
    color: "white",
    fontSize: 25,
    fontWeight: "800",
    lineHeight: 31,
    marginTop: 13,
  },
  heroSubtitle: {
    color: "#EAE6FF",
    fontSize: 12,
    lineHeight: 18,
    marginTop: 9,
  },
  heroButton: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    gap: 8,
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 11,
    borderRadius: 13,
    marginTop: 19,
  },
  heroButtonText: { color: PURPLE, fontWeight: "800", fontSize: 12 },
  heroDecoration: {
    position: "absolute",
    right: -3,
    top: 68,
    opacity: 0.55,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    marginTop: 5,
  },
  sectionTitle: { fontSize: 20, fontWeight: "800", color: "#211D2B" },
  sectionAction: { fontSize: 12, color: PURPLE, fontWeight: "700" },
  counter: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#EEE9F3",
    borderRadius: 19,
    padding: 15,
    marginBottom: 11,
    gap: 15,
  },
  counterIcon: {
    width: 53,
    height: 53,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
  },
  counterValue: { fontSize: 23, fontWeight: "800", color: "#211D2B" },
  counterTitle: { fontSize: 13, color: "#696373", marginTop: 3 },
  emptyCard: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#EEE9F3",
    borderRadius: 22,
    padding: 25,
    alignItems: "center",
    marginBottom: 30,
  },
  emptyIcon: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: "#F0EDFF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 13,
  },
  emptyTitle: { fontSize: 15, fontWeight: "800", color: "#211D2B" },
  emptyDescription: {
    textAlign: "center",
    color: "#817A8B",
    fontSize: 12,
    lineHeight: 19,
    marginTop: 7,
  },
  availabilityCard: {
    backgroundColor: "white",
    borderRadius: 21,
    paddingVertical: 20,
    paddingHorizontal: 9,
    borderWidth: 1,
    borderColor: "#EEE9F3",
    marginBottom: 30,
  },
  availabilityRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-around",
    marginBottom: 12,
  },
  dayColumn: { flex: 1, alignItems: "center" },
  dayNumber: { fontSize: 14, fontWeight: "800", color: "#292633" },
  dayLabel: { fontSize: 10, color: "#817A8B", marginTop: 4, marginBottom: 9 },
  daySlot: {
    height: 34,
    width: "80%",
    borderWidth: 1,
    borderColor: "#E1DCE7",
    borderRadius: 10,
    backgroundColor: "#FAF9FC",
  },
  helperText: {
    fontSize: 10,
    color: "#817A8B",
    textAlign: "center",
    marginTop: 7,
  },
  applicationRow: { flexDirection: "row", gap: 12 },
  applicationCard: {
    flex: 1,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#EEE9F3",
    borderRadius: 21,
    padding: 20,
    alignItems: "center",
    gap: 9,
  },
  applicationValue: { fontSize: 27, fontWeight: "800", color: "#211D2B" },
  applicationLabel: { fontSize: 12, color: "#817A8B" },
  footer: {
    textAlign: "center",
    color: "#AAA3B2",
    fontSize: 11,
    marginTop: 35,
  },
});
