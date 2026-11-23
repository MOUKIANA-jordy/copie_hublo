import { router } from "expo-router";
import { useState } from "react";
import * as SecureStore from "expo-secure-store";

import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    
    if (!email.trim() || !password) {
      Alert.alert(
        "Champs obligatoires",
        "Veuillez saisir votre adresse e-mail et votre mot de passe."
      );
      return;
    }

    if (!API_URL) {
      Alert.alert(
        "Configuration manquante",
        "L'adresse du serveur MOVA n'est pas configurée."
      );
      return;
    }

    setLoading(true);

    try {
      const controller = new AbortController();
      const timeout = setTimeout(
        () => controller.abort(),
        15000
      );

      let response: Response;

      try {
        response = await fetch(
          `${API_URL.replace(/\/$/, "")}/api/auth/login/`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: email.trim().toLowerCase(),
              password,
            }),
            signal: controller.signal,
          }
        );
      } finally {
        clearTimeout(timeout);
      }

      if (!response.ok) {
        if (
          response.status === 400 ||
          response.status === 401
        ) {
          Alert.alert(
            "Connexion refusée",
            "Adresse e-mail ou mot de passe incorrect."
          );
          return;
        }

        throw new Error(
          `Erreur du serveur (${response.status}).`
        );
      }

      const data = await response.json();

      if (!data.access || !data.refresh) {
        throw new Error(
          "Le serveur n'a pas renvoyé de tokens valides."
        );
      }

      await SecureStore.setItemAsync(
        "mova_access_token",
        data.access
      );

      await SecureStore.setItemAsync(
        "mova_refresh_token",
        data.refresh
      );

      setPassword("");

      Alert.alert(
        "Connexion réussie",
        "Bienvenue sur MOVA !"
      );

      router.replace("/(dashboard)");
    } catch (error) {
      console.error("Erreur connexion MOVA :", error);

      Alert.alert(
        "Connexion impossible",
        error instanceof Error &&
          error.name === "AbortError"
          ? "Le serveur met trop de temps à répondre."
          : error instanceof TypeError
            ? "Impossible de contacter le serveur MOVA."
            : error instanceof Error
              ? error.message
              : "Une erreur inattendue est survenue."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={
          Platform.OS === "ios" ? "padding" : undefined
        }
      >
        <View style={styles.content}>
          <TouchableOpacity
            style={styles.back}
            onPress={() => router.back()}
          >
            <Text style={styles.backText}>‹</Text>
          </TouchableOpacity>

          <View style={styles.header}>
            <Text style={styles.logo}>MOVA</Text>

            <Text style={styles.title}>
              Bon retour 👋
            </Text>

            <Text style={styles.subtitle}>
              Connectez-vous pour retrouver vos missions,
              votre planning et vos messages.
            </Text>
          </View>

          <View style={styles.form}>
            <Text style={styles.label}>
              Adresse e-mail
            </Text>

            <TextInput
              style={styles.input}
              placeholder="vous@exemple.com"
              placeholderTextColor="#9994A5"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="email"
              textContentType="emailAddress"
              value={email}
              onChangeText={setEmail}
              editable={!loading}
            />

            <Text style={styles.label}>
              Mot de passe
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Votre mot de passe"
              placeholderTextColor="#9994A5"
              secureTextEntry
              autoCapitalize="none"
              autoComplete="current-password"
              textContentType="password"
              value={password}
              onChangeText={setPassword}
              editable={!loading}
              returnKeyType="done"
              onSubmitEditing={handleLogin}
            />

            <TouchableOpacity
              onPress={() =>
                Alert.alert(
                  "Mot de passe oublié",
                  "La récupération du mot de passe sera bientôt disponible."
                )
              }
            >
              <Text style={styles.forgot}>
                Mot de passe oublié ?
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.button,
                loading && styles.buttonDisabled,
              ]}
              onPress={handleLogin}
              disabled={loading}
              activeOpacity={0.85}
            >
              {loading ? (
                <ActivityIndicator
                  size="small"
                  color="#FFFFFF"
                />
              ) : (
                <Text style={styles.buttonText}>
                  Se connecter
                </Text>
              )}
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => router.push("/register")}
            disabled={loading}
          >
            <Text style={styles.register}>
              Pas encore de compte ?{" "}
              <Text style={styles.registerAccent}>
                Créer mon profil
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
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
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: 15,
    paddingBottom: 25,
  },

  back: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },

  backText: {
    fontSize: 38,
    lineHeight: 39,
    color: "#17122B",
  },

  header: {
    marginTop: 50,
  },

  logo: {
    color: "#695AE8",
    fontSize: 23,
    fontWeight: "900",
    letterSpacing: 2,
    marginBottom: 35,
  },

  title: {
    color: "#17122B",
    fontSize: 38,
    fontWeight: "800",
  },

  subtitle: {
    color: "#777181",
    fontSize: 16,
    lineHeight: 24,
    marginTop: 13,
  },

  form: {
    marginTop: 45,
  },

  label: {
    color: "#292436",
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 8,
  },

  input: {
    height: 58,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2DEEB",
    borderRadius: 16,
    paddingHorizontal: 17,
    fontSize: 16,
    color: "#17122B",
    marginBottom: 20,
  },

  forgot: {
    color: "#695AE8",
    textAlign: "right",
    fontWeight: "600",
    marginTop: -5,
    marginBottom: 28,
  },

  button: {
    height: 58,
    borderRadius: 18,
    backgroundColor: "#695AE8",
    alignItems: "center",
    justifyContent: "center",
  },

  buttonDisabled: {
    opacity: 0.65,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
  },

  register: {
    color: "#777181",
    textAlign: "center",
    marginTop: "auto",
    fontSize: 14,
  },

  registerAccent: {
    color: "#695AE8",
    fontWeight: "700",
  },
});

