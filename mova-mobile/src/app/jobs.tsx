import { router, useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const jobsBySector: Record<string, string[]> = {
  sante: [
    "Aide-soignant",
    "Infirmier",
    "AES",
    "Auxiliaire de vie",
    "Agent de service hospitalier",
    "Éducateur spécialisé",
  ],

  restauration: [
    "Serveur",
    "Cuisinier",
    "Commis de cuisine",
    "Plongeur",
    "Barman",
    "Maître d'hôtel",
  ],

  hotellerie: [
    "Réceptionniste",
    "Femme / Valet de chambre",
    "Gouvernant",
    "Bagagiste",
    "Veilleur de nuit",
  ],

  logistique: [
    "Préparateur de commandes",
    "Manutentionnaire",
    "Cariste",
    "Magasinier",
    "Agent logistique",
  ],

  securite: [
    "Agent de sécurité",
    "Agent SSIAP",
    "Agent de sûreté",
    "Agent événementiel",
  ],

  evenementiel: [
    "Hôte / Hôtesse",
    "Serveur événementiel",
    "Agent d'accueil",
    "Manutentionnaire événementiel",
    "Régisseur",
  ],

  commerce: [
    "Vendeur",
    "Caissier",
    "Employé libre-service",
    "Conseiller de vente",
    "Inventoriste",
  ],

  nettoyage: [
    "Agent d'entretien",
    "Agent de nettoyage",
    "Agent de propreté",
    "Laveur de vitres",
  ],

  btp: [
    "Manœuvre",
    "Maçon",
    "Électricien",
    "Plombier",
    "Peintre",
    "Carreleur",
  ],

  transport: [
    "Chauffeur-livreur",
    "Livreur",
    "Conducteur",
    "Coursier",
    "Déménageur",
  ],
};

const sectorNames: Record<string, string> = {
  sante: "Santé & médico-social",
  restauration: "Restauration",
  hotellerie: "Hôtellerie",
  logistique: "Logistique",
  securite: "Sécurité",
  evenementiel: "Événementiel",
  commerce: "Commerce",
  nettoyage: "Nettoyage",
  btp: "BTP",
  transport: "Transport",
};

export default function JobsScreen() {
  const params = useLocalSearchParams<{ sectors?: string }>();

  const selectedSectors = useMemo(
    () =>
      typeof params.sectors === "string"
        ? params.sectors.split(",").filter(Boolean)
        : [],
    [params.sectors]
  );

  const [selectedJobs, setSelectedJobs] = useState<string[]>([]);

  const toggleJob = (job: string) => {
    setSelectedJobs((current) =>
      current.includes(job)
        ? current.filter((item) => item !== job)
        : [...current, job]
    );
  };

  const handleContinue = () => {
    if (selectedJobs.length === 0) {
      return;
    }

    router.push({
      pathname: "/informations",
      params: {
        sectors: selectedSectors.join(","),
        jobs: selectedJobs.join(","),
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* RETOUR */}
        <TouchableOpacity
          style={styles.back}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>

        {/* ÉTAPE */}
        <Text style={styles.step}>ÉTAPE 2 SUR 5</Text>

        {/* TITRE */}
        <Text style={styles.title}>
          Quels sont{"\n"}
          <Text style={styles.accent}>vos métiers ?</Text>
        </Text>

        <Text style={styles.subtitle}>
          Choisissez les métiers que vous pouvez réellement exercer.
          Vous pourrez les modifier plus tard.
        </Text>

        {/* MÉTIERS PAR SECTEUR */}
        {selectedSectors.map((sector) => (
          <View key={sector} style={styles.section}>
            <Text style={styles.sectionTitle}>
              {sectorNames[sector] ?? sector}
            </Text>

            <View style={styles.jobs}>
              {(jobsBySector[sector] ?? []).map((job) => {
                const selected = selectedJobs.includes(job);

                return (
                  <TouchableOpacity
                    key={`${sector}-${job}`}
                    activeOpacity={0.8}
                    onPress={() => toggleJob(job)}
                    style={[
                      styles.job,
                      selected && styles.jobSelected,
                    ]}
                  >
                    <Text
                      style={[
                        styles.jobText,
                        selected && styles.jobTextSelected,
                      ]}
                    >
                      {job}
                    </Text>

                    <View
                      style={[
                        styles.circle,
                        selected && styles.circleSelected,
                      ]}
                    >
                      {selected && (
                        <Text style={styles.check}>✓</Text>
                      )}
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        ))}

        {/* COMPTEUR */}
        {selectedJobs.length > 0 && (
          <Text style={styles.counter}>
            {selectedJobs.length}{" "}
            {selectedJobs.length === 1
              ? "métier sélectionné"
              : "métiers sélectionnés"}
          </Text>
        )}

        {/* CONTINUER */}
        <TouchableOpacity
          disabled={selectedJobs.length === 0}
          activeOpacity={selectedJobs.length > 0 ? 0.85 : 1}
          onPress={handleContinue}
          style={[
            styles.button,
            selectedJobs.length === 0 && styles.buttonDisabled,
          ]}
        >
          <Text
            style={[
              styles.buttonText,
              selectedJobs.length === 0 &&
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

  content: {
    paddingHorizontal: 24,
    paddingTop: 14,
    paddingBottom: 35,
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
  },

  accent: {
    color: "#695AE8",
  },

  subtitle: {
    color: "#777181",
    fontSize: 16,
    lineHeight: 24,
    marginTop: 18,
    marginBottom: 30,
  },

  section: {
    marginBottom: 30,
  },

  sectionTitle: {
    color: "#17122B",
    fontSize: 19,
    fontWeight: "800",
    marginBottom: 12,
  },

  jobs: {
    gap: 10,
  },

  job: {
    minHeight: 60,
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: "#E4E0EF",
    borderRadius: 16,
    paddingHorizontal: 17,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  jobSelected: {
    borderColor: "#695AE8",
    backgroundColor: "#EEECFF",
  },

  jobText: {
    color: "#292436",
    fontSize: 15,
    fontWeight: "600",
    flex: 1,
    paddingRight: 15,
  },

  jobTextSelected: {
    color: "#4F43C5",
    fontWeight: "700",
  },

  circle: {
    width: 25,
    height: 25,
    borderRadius: 13,
    borderWidth: 1.5,
    borderColor: "#CBC6D5",
    alignItems: "center",
    justifyContent: "center",
  },

  circleSelected: {
    borderColor: "#695AE8",
    backgroundColor: "#695AE8",
  },

  check: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "900",
  },

  counter: {
    textAlign: "center",
    color: "#695AE8",
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 15,
  },

  button: {
    height: 58,
    borderRadius: 18,
    backgroundColor: "#695AE8",
    alignItems: "center",
    justifyContent: "center",
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
