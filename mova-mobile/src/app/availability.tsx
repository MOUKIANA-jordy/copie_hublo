import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const days = [
  { id: "lundi", label: "Lun" },
  { id: "mardi", label: "Mar" },
  { id: "mercredi", label: "Mer" },
  { id: "jeudi", label: "Jeu" },
  { id: "vendredi", label: "Ven" },
  { id: "samedi", label: "Sam" },
  { id: "dimanche", label: "Dim" },
];

const timeSlots = [
  {
    id: "matin",
    icon: "☀️",
    title: "Matin",
    time: "06:00 – 12:00",
  },
  {
    id: "apres-midi",
    icon: "🌤️",
    title: "Après-midi",
    time: "12:00 – 18:00",
  },
  {
    id: "soir",
    icon: "🌆",
    title: "Soir",
    time: "18:00 – 23:00",
  },
  {
    id: "nuit",
    icon: "🌙",
    title: "Nuit",
    time: "23:00 – 06:00",
  },
];

const distances = [5, 10, 20, 30, 50];

export default function AvailabilityScreen() {
  const params = useLocalSearchParams<{
    sectors?: string;
    jobs?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    city?: string;
    postalCode?: string;
  }>();

  const [availableNow, setAvailableNow] = useState(true);

  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  const [selectedTimeSlots, setSelectedTimeSlots] = useState<
    string[]
  >([]);

  const [distance, setDistance] = useState(20);

  const toggleDay = (day: string) => {
    setSelectedDays((current) =>
      current.includes(day)
        ? current.filter((item) => item !== day)
        : [...current, day]
    );
  };

  const toggleTimeSlot = (slot: string) => {
    setSelectedTimeSlots((current) =>
      current.includes(slot)
        ? current.filter((item) => item !== slot)
        : [...current, slot]
    );
  };

  const formValid =
    selectedDays.length > 0 &&
    selectedTimeSlots.length > 0;

  const handleContinue = () => {
    if (!formValid) {
      return;
    }

    router.push({
      pathname: "/finish",
      params: {
        ...params,
        availableNow: availableNow ? "true" : "false",
        days: selectedDays.join(","),
        timeSlots: selectedTimeSlots.join(","),
        distance: distance.toString(),
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
        <Text style={styles.step}>ÉTAPE 4 SUR 5</Text>

        {/* TITRE */}
        <Text style={styles.title}>
          Quand êtes-vous{"\n"}
          <Text style={styles.accent}>disponible ?</Text>
        </Text>

        <Text style={styles.subtitle}>
          MOVA utilisera vos disponibilités pour vous proposer
          des missions compatibles avec votre emploi du temps.
        </Text>

        {/* DISPONIBLE MAINTENANT */}
        <View style={styles.availableCard}>
          <View style={styles.availableLeft}>
            <View style={styles.availableIcon}>
              <Text style={styles.availableIconText}>⚡</Text>
            </View>

            <View style={styles.availableTextContainer}>
              <Text style={styles.availableTitle}>
                Disponible maintenant
              </Text>

              <Text style={styles.availableDescription}>
                Je peux recevoir des propositions immédiatement.
              </Text>
            </View>
          </View>

          <Switch
            value={availableNow}
            onValueChange={setAvailableNow}
            trackColor={{
              false: "#D9D5E2",
              true: "#B8B1FF",
            }}
            thumbColor={
              availableNow ? "#695AE8" : "#FFFFFF"
            }
          />
        </View>

        {/* JOURS */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Quels jours ?
          </Text>

          <Text style={styles.sectionDescription}>
            Sélectionnez tous les jours où vous pouvez
            généralement travailler.
          </Text>

          <View style={styles.daysContainer}>
            {days.map((day) => {
              const selected = selectedDays.includes(day.id);

              return (
                <TouchableOpacity
                  key={day.id}
                  activeOpacity={0.8}
                  onPress={() => toggleDay(day.id)}
                  style={[
                    styles.day,
                    selected && styles.daySelected,
                  ]}
                >
                  <Text
                    style={[
                      styles.dayText,
                      selected && styles.dayTextSelected,
                    ]}
                  >
                    {day.label}
                  </Text>

                  {selected && (
                    <Text style={styles.dayCheck}>✓</Text>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* HORAIRES */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Quels horaires ?
          </Text>

          <Text style={styles.sectionDescription}>
            Vous pouvez sélectionner plusieurs créneaux.
          </Text>

          <View style={styles.timeSlots}>
            {timeSlots.map((slot) => {
              const selected =
                selectedTimeSlots.includes(slot.id);

              return (
                <TouchableOpacity
                  key={slot.id}
                  activeOpacity={0.8}
                  onPress={() => toggleTimeSlot(slot.id)}
                  style={[
                    styles.timeCard,
                    selected && styles.timeCardSelected,
                  ]}
                >
                  <View style={styles.timeLeft}>
                    <Text style={styles.timeIcon}>
                      {slot.icon}
                    </Text>

                    <View>
                      <Text
                        style={[
                          styles.timeTitle,
                          selected &&
                            styles.timeTitleSelected,
                        ]}
                      >
                        {slot.title}
                      </Text>

                      <Text style={styles.timeDescription}>
                        {slot.time}
                      </Text>
                    </View>
                  </View>

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

        {/* MOBILITÉ */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Jusqu'où pouvez-vous vous déplacer ?
          </Text>

          <Text style={styles.sectionDescription}>
            Rayon maximum autour de votre ville.
          </Text>

          <View style={styles.distanceContainer}>
            {distances.map((item) => {
              const selected = distance === item;

              return (
                <TouchableOpacity
                  key={item}
                  activeOpacity={0.8}
                  onPress={() => setDistance(item)}
                  style={[
                    styles.distanceButton,
                    selected &&
                      styles.distanceButtonSelected,
                  ]}
                >
                  <Text
                    style={[
                      styles.distanceText,
                      selected &&
                        styles.distanceTextSelected,
                    ]}
                  >
                    {item} km
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* RÉSUMÉ */}
        {formValid && (
          <View style={styles.summary}>
            <View style={styles.summaryIcon}>
              <Text>✓</Text>
            </View>

            <View style={styles.summaryContent}>
              <Text style={styles.summaryTitle}>
                Disponibilités enregistrées
              </Text>

              <Text style={styles.summaryText}>
                {selectedDays.length} jour
                {selectedDays.length > 1 ? "s" : ""} •{" "}
                {selectedTimeSlots.length} créneau
                {selectedTimeSlots.length > 1 ? "x" : ""} •{" "}
                rayon de {distance} km
              </Text>
            </View>
          </View>
        )}

        {/* CONTINUER */}
        <TouchableOpacity
          disabled={!formValid}
          activeOpacity={formValid ? 0.85 : 1}
          onPress={handleContinue}
          style={[
            styles.button,
            !formValid && styles.buttonDisabled,
          ]}
        >
          <Text
            style={[
              styles.buttonText,
              !formValid && styles.buttonTextDisabled,
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
    paddingBottom: 45,
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

  availableCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 17,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1.5,
    borderColor: "#E5E1EF",
    marginBottom: 35,
  },

  availableLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    paddingRight: 12,
  },

  availableIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "#EEECFF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 13,
  },

  availableIconText: {
    fontSize: 20,
  },

  availableTextContainer: {
    flex: 1,
  },

  availableTitle: {
    color: "#17122B",
    fontSize: 15,
    fontWeight: "800",
    marginBottom: 4,
  },

  availableDescription: {
    color: "#8B8694",
    fontSize: 12,
    lineHeight: 17,
  },

  section: {
    marginBottom: 34,
  },

  sectionTitle: {
    color: "#17122B",
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 7,
  },

  sectionDescription: {
    color: "#85808D",
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 17,
  },

  daysContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 9,
  },

  day: {
    minWidth: 70,
    height: 48,
    paddingHorizontal: 13,
    borderRadius: 15,
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: "#E4E0EF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },

  daySelected: {
    backgroundColor: "#EEECFF",
    borderColor: "#695AE8",
  },

  dayText: {
    color: "#5D5866",
    fontSize: 14,
    fontWeight: "700",
  },

  dayTextSelected: {
    color: "#5145C7",
  },

  dayCheck: {
    color: "#695AE8",
    fontSize: 13,
    fontWeight: "900",
  },

  timeSlots: {
    gap: 10,
  },

  timeCard: {
    minHeight: 67,
    borderRadius: 17,
    borderWidth: 1.5,
    borderColor: "#E4E0EF",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  timeCardSelected: {
    borderColor: "#695AE8",
    backgroundColor: "#EEECFF",
  },

  timeLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  timeIcon: {
    fontSize: 22,
    marginRight: 13,
  },

  timeTitle: {
    color: "#292436",
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 3,
  },

  timeTitleSelected: {
    color: "#4F43C5",
  },

  timeDescription: {
    color: "#96919E",
    fontSize: 12,
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
    backgroundColor: "#695AE8",
    borderColor: "#695AE8",
  },

  check: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "900",
  },

  distanceContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 9,
  },

  distanceButton: {
    paddingHorizontal: 17,
    height: 46,
    borderRadius: 15,
    borderWidth: 1.5,
    borderColor: "#E4E0EF",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },

  distanceButtonSelected: {
    backgroundColor: "#695AE8",
    borderColor: "#695AE8",
  },

  distanceText: {
    color: "#5D5866",
    fontSize: 14,
    fontWeight: "700",
  },

  distanceTextSelected: {
    color: "#FFFFFF",
  },

  summary: {
    backgroundColor: "#EEECFF",
    borderRadius: 17,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 22,
  },

  summaryIcon: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  summaryContent: {
    flex: 1,
  },

  summaryTitle: {
    color: "#4037A4",
    fontSize: 14,
    fontWeight: "800",
    marginBottom: 3,
  },

  summaryText: {
    color: "#6B6490",
    fontSize: 12,
    lineHeight: 17,
  },

  button: {
    height: 60,
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
