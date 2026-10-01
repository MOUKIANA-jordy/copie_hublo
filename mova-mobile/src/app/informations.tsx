import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function InformationsScreen() {
  const params = useLocalSearchParams<{
    sectors?: string;
    jobs?: string;
  }>();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const formValid =
    firstName.trim() !== "" &&
    lastName.trim() !== "" &&
    email.trim() !== "" &&
    phone.trim() !== "" &&
    city.trim() !== "";

  const handleContinue = () => {
    if (!formValid) return;

    router.push({
      pathname: "/availability",
      params: {
        sectors: params.sectors ?? "",
        jobs: params.jobs ?? "",
        firstName,
        lastName,
        email,
        phone,
        city,
        postalCode,
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.content}
        >
          <TouchableOpacity
            style={styles.back}
            onPress={() => router.back()}
          >
            <Text style={styles.backText}>‹</Text>
          </TouchableOpacity>

          <Text style={styles.step}>ÉTAPE 3 SUR 5</Text>

          <Text style={styles.title}>
            Faisons{"\n"}
            <Text style={styles.accent}>connaissance.</Text>
          </Text>

          <Text style={styles.subtitle}>
            Ces informations permettront aux entreprises de vous
            identifier et de vous contacter pour vos missions.
          </Text>

          <View style={styles.form}>
            <Text style={styles.label}>Prénom</Text>
            <TextInput
              style={styles.input}
              value={firstName}
              onChangeText={setFirstName}
              placeholder="Ex. Jordy"
              placeholderTextColor="#AAA5B4"
              autoCapitalize="words"
            />

            <Text style={styles.label}>Nom</Text>
            <TextInput
              style={styles.input}
              value={lastName}
              onChangeText={setLastName}
              placeholder="Votre nom"
              placeholderTextColor="#AAA5B4"
              autoCapitalize="words"
            />

            <Text style={styles.label}>Adresse e-mail</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="vous@exemple.com"
              placeholderTextColor="#AAA5B4"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />

            <Text style={styles.label}>Téléphone</Text>
            <TextInput
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
              placeholder="+33 6 00 00 00 00"
              placeholderTextColor="#AAA5B4"
              keyboardType="phone-pad"
            />

            <Text style={styles.sectionTitle}>
              Votre zone de travail
            </Text>

            <Text style={styles.helper}>
              MOVA utilisera cette zone pour vous proposer les missions
              les plus pertinentes.
            </Text>

            <Text style={styles.label}>Ville</Text>
            <TextInput
              style={styles.input}
              value={city}
              onChangeText={setCity}
              placeholder="Ex. Paris"
              placeholderTextColor="#AAA5B4"
              autoCapitalize="words"
            />

            <Text style={styles.label}>
              Code postal{" "}
              <Text style={styles.optional}>(facultatif)</Text>
            </Text>

            <TextInput
              style={styles.input}
              value={postalCode}
              onChangeText={setPostalCode}
              placeholder="75017"
              placeholderTextColor="#AAA5B4"
              keyboardType="number-pad"
              maxLength={5}
            />

            <View style={styles.infoBox}>
              <Text style={styles.infoIcon}>🔒</Text>

              <Text style={styles.infoText}>
                Vos coordonnées ne seront pas affichées publiquement.
                Elles seront utilisées uniquement dans le cadre de
                votre compte MOVA et de vos candidatures.
              </Text>
            </View>

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
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
    fontSize: 37,
    lineHeight: 43,
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
    marginBottom: 32,
  },

  form: {
    width: "100%",
  },

  label: {
    color: "#292436",
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 8,
  },

  optional: {
    color: "#96909E",
    fontWeight: "500",
  },

  input: {
    height: 59,
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: "#E4E0EF",
    borderRadius: 17,
    paddingHorizontal: 17,
    fontSize: 16,
    color: "#17122B",
    marginBottom: 20,
  },

  sectionTitle: {
    color: "#17122B",
    fontSize: 21,
    fontWeight: "800",
    marginTop: 12,
    marginBottom: 8,
  },

  helper: {
    color: "#85808D",
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 20,
  },

  infoBox: {
    backgroundColor: "#EEECFF",
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    marginTop: 5,
    marginBottom: 25,
  },

  infoIcon: {
    fontSize: 18,
    marginRight: 11,
  },

  infoText: {
    flex: 1,
    color: "#595270",
    fontSize: 13,
    lineHeight: 19,
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
