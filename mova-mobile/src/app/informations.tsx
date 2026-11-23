import { router } from "expo-router";
import { useState } from "react";

import { useRegistration } from "../context/RegistrationContext";

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
  const { data, updateRegistration } = useRegistration();

  const [firstName, setFirstName] = useState(data.firstName);
  const [lastName, setLastName] = useState(data.lastName);
  const [email, setEmail] = useState(data.email);
  const [phone, setPhone] = useState(data.phone);
  const [city, setCity] = useState(data.city);
  const [postalCode, setPostalCode] = useState(data.postalCode);

  const [password, setPassword] = useState(data.password);
  const [confirmPassword, setConfirmPassword] = useState(
    data.password
  );

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const cleanEmail = email.trim().toLowerCase();

  const emailValid =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail);

  const passwordValid = password.length >= 8;

  const passwordsMatch =
    password !== "" &&
    password === confirmPassword;

  const formValid =
    firstName.trim() !== "" &&
    lastName.trim() !== "" &&
    emailValid &&
    phone.trim() !== "" &&
    city.trim() !== "" &&
    passwordValid &&
    passwordsMatch;

  const handleContinue = () => {
    if (!formValid) {
      return;
    }

    updateRegistration({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: cleanEmail,
      phone: phone.trim(),
      city: city.trim(),
      postalCode: postalCode.trim(),
      password,
    });

    router.push("/availability");
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={
          Platform.OS === "ios"
            ? "padding"
            : undefined
        }
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.content}
        >
          <TouchableOpacity
            style={styles.back}
            onPress={() => router.back()}
            activeOpacity={0.7}
          >
            <Text style={styles.backText}>‹</Text>
          </TouchableOpacity>

          <Text style={styles.step}>
            ÉTAPE 3 SUR 5
          </Text>

          <Text style={styles.title}>
            Faisons{"\n"}
            <Text style={styles.accent}>
              connaissance.
            </Text>
          </Text>

          <Text style={styles.subtitle}>
            Ces informations permettront aux entreprises de
            vous identifier et de vous contacter pour vos
            missions.
          </Text>

          <View style={styles.form}>
            {/* PRÉNOM */}

            <Text style={styles.label}>
              Prénom
            </Text>

            <TextInput
              style={styles.input}
              value={firstName}
              onChangeText={setFirstName}
              placeholder="Ex. Jordy"
              placeholderTextColor="#AAA5B4"
              autoCapitalize="words"
              textContentType="givenName"
            />

            {/* NOM */}

            <Text style={styles.label}>
              Nom
            </Text>

            <TextInput
              style={styles.input}
              value={lastName}
              onChangeText={setLastName}
              placeholder="Votre nom"
              placeholderTextColor="#AAA5B4"
              autoCapitalize="words"
              textContentType="familyName"
            />

            {/* EMAIL */}

            <Text style={styles.label}>
              Adresse e-mail
            </Text>

            <TextInput
              style={[
                styles.input,
                email.length > 0 &&
                  !emailValid &&
                  styles.inputError,
              ]}
              value={email}
              onChangeText={setEmail}
              placeholder="vous@exemple.com"
              placeholderTextColor="#AAA5B4"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              textContentType="emailAddress"
            />

            {email.length > 0 &&
              !emailValid && (
                <Text style={styles.errorText}>
                  Saisissez une adresse e-mail valide.
                </Text>
              )}

            {/* TÉLÉPHONE */}

            <Text style={styles.label}>
              Téléphone
            </Text>

            <TextInput
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
              placeholder="+33 6 00 00 00 00"
              placeholderTextColor="#AAA5B4"
              keyboardType="phone-pad"
              textContentType="telephoneNumber"
            />

            {/* SÉCURITÉ */}

            <Text style={styles.sectionTitle}>
              Sécurisez votre compte
            </Text>

            <Text style={styles.helper}>
              Choisissez un mot de passe d'au moins 8
              caractères pour protéger votre compte MOVA.
            </Text>

            {/* MOT DE PASSE */}

            <Text style={styles.label}>
              Mot de passe
            </Text>

            <View
              style={[
                styles.passwordContainer,
                password.length > 0 &&
                  !passwordValid &&
                  styles.inputError,
              ]}
            >
              <TextInput
                style={styles.passwordInput}
                value={password}
                onChangeText={setPassword}
                placeholder="8 caractères minimum"
                placeholderTextColor="#AAA5B4"
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoCorrect={false}
                textContentType="newPassword"
              />

              <TouchableOpacity
                style={styles.eyeButton}
                onPress={() =>
                  setShowPassword(
                    (current) => !current
                  )
                }
              >
                <Text style={styles.eyeText}>
                  {showPassword
                    ? "Masquer"
                    : "Afficher"}
                </Text>
              </TouchableOpacity>
            </View>

            {password.length > 0 &&
              !passwordValid && (
                <Text style={styles.errorText}>
                  Le mot de passe doit contenir au moins
                  8 caractères.
                </Text>
              )}

            {/* CONFIRMATION */}

            <Text style={styles.label}>
              Confirmer le mot de passe
            </Text>

            <View
              style={[
                styles.passwordContainer,
                confirmPassword.length > 0 &&
                  !passwordsMatch &&
                  styles.inputError,
              ]}
            >
              <TextInput
                style={styles.passwordInput}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Retapez votre mot de passe"
                placeholderTextColor="#AAA5B4"
                secureTextEntry={
                  !showConfirmPassword
                }
                autoCapitalize="none"
                autoCorrect={false}
                textContentType="newPassword"
              />

              <TouchableOpacity
                style={styles.eyeButton}
                onPress={() =>
                  setShowConfirmPassword(
                    (current) => !current
                  )
                }
              >
                <Text style={styles.eyeText}>
                  {showConfirmPassword
                    ? "Masquer"
                    : "Afficher"}
                </Text>
              </TouchableOpacity>
            </View>

            {confirmPassword.length > 0 &&
              !passwordsMatch && (
                <Text style={styles.errorText}>
                  Les mots de passe ne correspondent pas.
                </Text>
              )}

            {/* ZONE DE TRAVAIL */}

            <Text style={styles.sectionTitle}>
              Votre zone de travail
            </Text>

            <Text style={styles.helper}>
              MOVA utilisera cette zone pour vous proposer
              les missions les plus pertinentes.
            </Text>

            <Text style={styles.label}>
              Ville
            </Text>

            <TextInput
              style={styles.input}
              value={city}
              onChangeText={setCity}
              placeholder="Ex. Paris"
              placeholderTextColor="#AAA5B4"
              autoCapitalize="words"
              textContentType="addressCity"
            />

            <Text style={styles.label}>
              Code postal{" "}
              <Text style={styles.optional}>
                (facultatif)
              </Text>
            </Text>

            <TextInput
              style={styles.input}
              value={postalCode}
              onChangeText={setPostalCode}
              placeholder="75017"
              placeholderTextColor="#AAA5B4"
              keyboardType="number-pad"
              textContentType="postalCode"
              maxLength={5}
            />

            {/* CONFIDENTIALITÉ */}

            <View style={styles.infoBox}>
              <Text style={styles.infoIcon}>
                🔒
              </Text>

              <Text style={styles.infoText}>
                Vos coordonnées ne seront pas affichées
                publiquement. Elles seront utilisées
                uniquement dans le cadre de votre compte
                MOVA et de vos candidatures.
              </Text>
            </View>

            {/* CONTINUER */}

            <TouchableOpacity
              disabled={!formValid}
              activeOpacity={
                formValid ? 0.85 : 1
              }
              onPress={handleContinue}
              style={[
                styles.button,
                !formValid &&
                  styles.buttonDisabled,
              ]}
            >
              <Text
                style={[
                  styles.buttonText,
                  !formValid &&
                    styles.buttonTextDisabled,
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

  inputError: {
    borderColor: "#E35D6A",
  },

  errorText: {
    color: "#D94B5B",
    fontSize: 12,
    lineHeight: 17,
    marginTop: -12,
    marginBottom: 16,
    paddingHorizontal: 3,
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

  passwordContainer: {
    minHeight: 59,
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: "#E4E0EF",
    borderRadius: 17,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },

  passwordInput: {
    flex: 1,
    minHeight: 56,
    paddingLeft: 17,
    paddingRight: 8,
    fontSize: 16,
    color: "#17122B",
  },

  eyeButton: {
    minHeight: 56,
    justifyContent: "center",
    paddingHorizontal: 15,
  },

  eyeText: {
    color: "#695AE8",
    fontSize: 12,
    fontWeight: "800",
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
