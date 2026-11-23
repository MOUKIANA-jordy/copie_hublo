import { router } from "expo-router";
import { useState } from "react";

import {
  SelectedJob,
  useRegistration,
} from "../context/RegistrationContext";

import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type JobDefinition = {
  name: string;
  slug: string;
};

const jobsBySector: Record<string, JobDefinition[]> = {
  sante: [
    {
      name: "Aide-soignant",
      slug: "aide-soignant",
    },
    {
      name: "Infirmier",
      slug: "infirmier",
    },
    {
      name: "AES",
      slug: "aes",
    },
    {
      name: "Auxiliaire de vie",
      slug: "auxiliaire-de-vie",
    },
    {
      name: "Agent de service hospitalier",
      slug: "agent-de-service-hospitalier",
    },
    {
      name: "Éducateur spécialisé",
      slug: "educateur-specialise",
    },
  ],

  restauration: [
    {
      name: "Serveur",
      slug: "serveur",
    },
    {
      name: "Cuisinier",
      slug: "cuisinier",
    },
    {
      name: "Commis de cuisine",
      slug: "commis-de-cuisine",
    },
    {
      name: "Plongeur",
      slug: "plongeur",
    },
    {
      name: "Barman",
      slug: "barman",
    },
    {
      name: "Maître d'hôtel",
      slug: "maitre-dhotel",
    },
  ],

  hotellerie: [
    {
      name: "Réceptionniste",
      slug: "receptionniste",
    },
    {
      name: "Femme / Valet de chambre",
      slug: "femme-valet-de-chambre",
    },
    {
      name: "Gouvernant",
      slug: "gouvernant",
    },
    {
      name: "Bagagiste",
      slug: "bagagiste",
    },
    {
      name: "Veilleur de nuit",
      slug: "veilleur-de-nuit",
    },
  ],

  logistique: [
    {
      name: "Préparateur de commandes",
      slug: "preparateur-de-commandes",
    },
    {
      name: "Manutentionnaire",
      slug: "manutentionnaire",
    },
    {
      name: "Cariste",
      slug: "cariste",
    },
    {
      name: "Magasinier",
      slug: "magasinier",
    },
    {
      name: "Agent logistique",
      slug: "agent-logistique",
    },
  ],

  securite: [
    {
      name: "Agent de sécurité",
      slug: "agent-de-securite",
    },
    {
      name: "Agent SSIAP",
      slug: "agent-ssiap",
    },
    {
      name: "Agent de sûreté",
      slug: "agent-de-surete",
    },
    {
      name: "Agent événementiel",
      slug: "agent-evenementiel",
    },
  ],

  evenementiel: [
    {
      name: "Hôte / Hôtesse",
      slug: "hote-hotesse",
    },
    {
      name: "Serveur événementiel",
      slug: "serveur-evenementiel",
    },
    {
      name: "Agent d'accueil",
      slug: "agent-daccueil",
    },
    {
      name: "Manutentionnaire événementiel",
      slug: "manutentionnaire-evenementiel",
    },
    {
      name: "Régisseur",
      slug: "regisseur",
    },
  ],

  commerce: [
    {
      name: "Vendeur",
      slug: "vendeur",
    },
    {
      name: "Caissier",
      slug: "caissier",
    },
    {
      name: "Employé libre-service",
      slug: "employe-libre-service",
    },
    {
      name: "Conseiller de vente",
      slug: "conseiller-de-vente",
    },
    {
      name: "Inventoriste",
      slug: "inventoriste",
    },
  ],

  nettoyage: [
    {
      name: "Agent d'entretien",
      slug: "agent-dentretien",
    },
    {
      name: "Agent de nettoyage",
      slug: "agent-de-nettoyage",
    },
    {
      name: "Agent de propreté",
      slug: "agent-de-proprete",
    },
    {
      name: "Laveur de vitres",
      slug: "laveur-de-vitres",
    },
  ],

  btp: [
    {
      name: "Manœuvre",
      slug: "manoeuvre",
    },
    {
      name: "Maçon",
      slug: "macon",
    },
    {
      name: "Électricien",
      slug: "electricien",
    },
    {
      name: "Plombier",
      slug: "plombier",
    },
    {
      name: "Peintre",
      slug: "peintre",
    },
    {
      name: "Carreleur",
      slug: "carreleur",
    },
  ],

  transport: [
    {
      name: "Chauffeur-livreur",
      slug: "chauffeur-livreur",
    },
    {
      name: "Livreur",
      slug: "livreur",
    },
    {
      name: "Conducteur",
      slug: "conducteur",
    },
    {
      name: "Coursier",
      slug: "coursier",
    },
    {
      name: "Déménageur",
      slug: "demenageur",
    },
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
  const { data, updateRegistration } = useRegistration();

  const selectedSectors = data.sectors;

  const [selectedJobs, setSelectedJobs] = useState<SelectedJob[]>(
    data.jobs
  );

  const isJobSelected = (
    sector: string,
    slug: string
  ) => {
    return selectedJobs.some(
      (job) =>
        job.sector === sector &&
        job.slug === slug
    );
  };

  const toggleJob = (
    sector: string,
    job: JobDefinition
  ) => {
    const selected = isJobSelected(
      sector,
      job.slug
    );

    if (selected) {
      setSelectedJobs((current) =>
        current.filter(
          (item) =>
            !(
              item.sector === sector &&
              item.slug === job.slug
            )
        )
      );

      return;
    }

    setSelectedJobs((current) => [
      ...current,
      {
        sector,
        slug: job.slug,
        name: job.name,
      },
    ]);
  };

  const handleContinue = () => {
    if (selectedJobs.length === 0) {
      return;
    }

    updateRegistration({
      jobs: selectedJobs,
    });

    router.push("/informations");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <TouchableOpacity
          style={styles.back}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <Text style={styles.backText}>
            ‹
          </Text>
        </TouchableOpacity>

        <Text style={styles.step}>
          ÉTAPE 2 SUR 5
        </Text>

        <Text style={styles.title}>
          Quels sont{"\n"}
          <Text style={styles.accent}>
            vos métiers ?
          </Text>
        </Text>

        <Text style={styles.subtitle}>
          Choisissez les métiers que vous pouvez
          réellement exercer. Vous pourrez les modifier
          plus tard.
        </Text>

        {selectedSectors.map((sector) => (
          <View
            key={sector}
            style={styles.section}
          >
            <Text style={styles.sectionTitle}>
              {sectorNames[sector] ?? sector}
            </Text>

            <View style={styles.jobs}>
              {(jobsBySector[sector] ?? []).map(
                (job) => {
                  const selected =
                    isJobSelected(
                      sector,
                      job.slug
                    );

                  return (
                    <TouchableOpacity
                      key={`${sector}-${job.slug}`}
                      activeOpacity={0.8}
                      onPress={() =>
                        toggleJob(
                          sector,
                          job
                        )
                      }
                      style={[
                        styles.job,
                        selected &&
                          styles.jobSelected,
                      ]}
                    >
                      <Text
                        style={[
                          styles.jobText,
                          selected &&
                            styles.jobTextSelected,
                        ]}
                      >
                        {job.name}
                      </Text>

                      <View
                        style={[
                          styles.circle,
                          selected &&
                            styles.circleSelected,
                        ]}
                      >
                        {selected && (
                          <Text
                            style={styles.check}
                          >
                            ✓
                          </Text>
                        )}
                      </View>
                    </TouchableOpacity>
                  );
                }
              )}
            </View>
          </View>
        ))}

        {selectedJobs.length > 0 && (
          <Text style={styles.counter}>
            {selectedJobs.length}{" "}
            {selectedJobs.length === 1
              ? "métier sélectionné"
              : "métiers sélectionnés"}
          </Text>
        )}

        <TouchableOpacity
          disabled={
            selectedJobs.length === 0
          }
          activeOpacity={
            selectedJobs.length > 0
              ? 0.85
              : 1
          }
          onPress={handleContinue}
          style={[
            styles.button,
            selectedJobs.length === 0 &&
              styles.buttonDisabled,
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
