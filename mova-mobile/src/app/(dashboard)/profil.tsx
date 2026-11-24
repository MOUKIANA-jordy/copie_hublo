import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAuth } from "../../context/AuthContext";

export default function ProfileScreen() {
  const { user, signOut } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      "Déconnexion",
      "Voulez-vous vraiment vous déconnecter de MOVA ?",
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Se déconnecter",
          style: "destructive",
          onPress: async () => {
            await signOut();
            router.replace("/login");
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Mon profil</Text>
        <Text style={styles.subtitle}>
          Gérez votre compte professionnel MOVA.
        </Text>

        <View style={styles.card}>
          <View style={styles.avatar}>
            <Ionicons
              name="person-outline"
              size={34}
              color="#695AE8"
            />
          </View>

          <Text style={styles.name}>
            {[user?.first_name, user?.last_name]
              .filter(Boolean)
              .join(" ") || "Utilisateur MOVA"}
          </Text>

          <Text style={styles.email}>{user?.email || ""}</Text>

          <View style={styles.separator} />

          <View style={styles.infoRow}>
            <Ionicons name="call-outline" size={20} color="#695AE8" />
            <Text style={styles.info}>
              {user?.phone || "Téléphone non renseigné"}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Ionicons name="briefcase-outline" size={20} color="#695AE8" />
            <Text style={styles.info}>
              {user?.account_type === "COMPANY"
                ? "Entreprise"
                : "Professionnel"}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Ionicons
              name="shield-checkmark-outline"
              size={20}
              color="#695AE8"
            />
            <Text style={styles.info}>
              {user?.is_verified
                ? "Compte vérifié"
                : "Compte non vérifié"}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Ionicons name="log-out-outline" size={21} color="#D64545" />
          <Text style={styles.logoutText}>Se déconnecter</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF9FC",
  },
  content: {
    padding: 22,
  },
  title: {
    fontSize: 27,
    fontWeight: "800",
    color: "#211D2B",
  },
  subtitle: {
    color: "#817A8B",
    fontSize: 14,
    marginTop: 8,
    marginBottom: 28,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#EEE9F3",
    padding: 24,
    alignItems: "center",
  },
  avatar: {
    width: 85,
    height: 85,
    borderRadius: 28,
    backgroundColor: "#EEEBFF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  name: {
    fontSize: 21,
    fontWeight: "800",
    color: "#211D2B",
  },
  email: {
    fontSize: 13,
    color: "#817A8B",
    marginTop: 7,
  },
  separator: {
    height: 1,
    backgroundColor: "#EEE9F3",
    width: "100%",
    marginVertical: 24,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 13,
    width: "100%",
    marginBottom: 19,
  },
  info: {
    fontSize: 14,
    color: "#514A5B",
  },
  logoutButton: {
    marginTop: 25,
    backgroundColor: "#FFF1F1",
    padding: 18,
    borderRadius: 17,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  logoutText: {
    color: "#D64545",
    fontWeight: "800",
    fontSize: 15,
  },
});
