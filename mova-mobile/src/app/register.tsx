import { router } from "expo-router";
import { useState } from "react";
import { useRegistration } from "../context/RegistrationContext";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type Sector = {
  id: string;
  icon: string;
  name: string;
};

const sectors: Sector[] = [
  { id: "sante", icon: "🏥", name: "Santé & médico-social" },
  { id: "restauration", icon: "🍽️", name: "Restauration" },
  { id: "hotellerie", icon: "🏨", name: "Hôtellerie" },
  { id: "logistique", icon: "📦", name: "Logistique" },
  { id: "securite", icon: "🛡️", name: "Sécurité" },
  { id: "evenementiel", icon: "🎪", name: "Événementiel" },
  { id: "commerce", icon: "🛍️", name: "Commerce" },
  { id: "nettoyage", icon: "🧹", name: "Nettoyage" },
  { id: "btp", icon: "🏗️", name: "BTP" },
  { id: "transport", icon: "🚚", name: "Transport" },
];

export default function RegisterScreen() {
  const [selectedSectors, setSelectedSectors] = useState<string[]>([]);

  const toggleSector = (id: string) => {
    setSelectedSectors((current) => {
      if (current.includes(id)) {
        return current.filter((sectorId) => sectorId !== id);
      }

      return [...current, id];
    });
  };

  const handleContinue = () => {
    if (selectedSectors.length === 0) {
      return;
    }

    router.push({
      pathname: "/jobs",
      params: {
        sectors: selectedSectors.join(","),
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity
          style={styles.back}
          onPress={() => router.back()}
        >
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>

        <Text style={styles.step}>ÉTAPE 1 SUR 5</Text>

        <Text style={styles.title}>
          Quels secteurs{"\n"}
          <Text style={styles.accent}>vous intéressent ?</Text>
        </Text>

        <Text style={styles.subtitle}>
          Sélectionnez un ou plusieurs secteurs. MOVA personnalisera
          ensuite les métiers et les missions qui vous correspondent.
        </Text>

        <View style={styles.grid}>
          {sectors.map((sector) => {
            const selected = selectedSectors.includes(sector.id);

            return (
              <TouchableOpacity
                key={sector.id}
                activeOpacity={0.8}
                onPress={() => toggleSector(sector.id)}
                style={[
                  styles.sector,
                  selected && styles.sectorSelected,
                ]}
              >
                <View style={styles.sectorTop}>
                  <Text style={styles.icon}>{sector.icon}</Text>

                  {selected && (
                    <View style={styles.check}>
                      <Text style={styles.checkText}>✓</Text>
                    </View>
                  )}
                </View>

                <Text
                  style={[
                    styles.sectorText,
                    selected && styles.sectorTextSelected,
                  ]}
                >
                  {sector.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {selectedSectors.length > 0 && (
          <Text style={styles.selectionCount}>
            {selectedSectors.length}{" "}
            {selectedSectors.length === 1
              ? "secteur sélectionné"
              : "secteurs sélectionnés"}
          </Text>
        )}

        <TouchableOpacity
          activeOpacity={selectedSectors.length > 0 ? 0.85 : 1}
          disabled={selectedSectors.length === 0}
          onPress={handleContinue}
          style={[
            styles.button,
            selectedSectors.length === 0 && styles.buttonDisabled,
          ]}
        >
          <Text
            style={[
              styles.buttonText,
              selectedSectors.length === 0 &&
                styles.buttonTextDisabled,
            ]}
          >
            Continuer
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F7FC",
  },

  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 14,
    paddingBottom: 30,
  },

  back: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 35,
  },

  backText: {
    color: "#17122B",
    fontSize: 38,
    lineHeight: 40,
  },

  step: {
    color: "#695AE8",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1.3,
    marginBottom: 15,
  },

  title: {
    color: "#17122B",
    fontSize: 35,
    lineHeight: 42,
    fontWeight: "800",
    letterSpacing: -0.8,
  },

  accent: {
    color: "#695AE8",
  },

  subtitle: {
    color: "#777181",
    fontSize: 16,
    lineHeight: 24,
    marginTop: 18,
    marginBottom: 28,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 13,
  },

  sector: {
    width: "48%",
    minHeight: 105,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: "#E4E0EF",
    padding: 15,
    justifyContent: "space-between",
  },

  sectorSelected: {
    backgroundColor: "#EEECFF",
    borderColor: "#695AE8",
  },

  sectorTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  icon: {
    fontSize: 23,
  },

  check: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#695AE8",
    alignItems: "center",
    justifyContent: "center",
  },

  checkText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "900",
  },

  sectorText: {
    color: "#252033",
    fontSize: 14,
    lineHeight: 19,
    fontWeight: "700",
    marginTop: 12,
  },

  sectorTextSelected: {
    color: "#4F43C5",
  },

  selectionCount: {
    textAlign: "center",
    color: "#695AE8",
    fontSize: 14,
    fontWeight: "700",
    marginTop: 20,
  },

  button: {
    height: 58,
    borderRadius: 18,
    backgroundColor: "#695AE8",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },

  buttonDisabled: {
    backgroundColor: "#DFDCE8",
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "800",
  },

  buttonTextDisabled: {
    color: "#A7A2B0",
  },
});
