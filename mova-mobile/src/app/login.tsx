import { router } from "expo-router";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function LoginScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
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
            <Text style={styles.label}>Adresse e-mail</Text>

            <TextInput
              style={styles.input}
              placeholder="vous@exemple.com"
              placeholderTextColor="#9994A5"
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <Text style={styles.label}>Mot de passe</Text>

            <TextInput
              style={styles.input}
              placeholder="Votre mot de passe"
              placeholderTextColor="#9994A5"
              secureTextEntry
            />

            <TouchableOpacity>
              <Text style={styles.forgot}>
                Mot de passe oublié ?
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>
                Se connecter
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => router.push("/register")}>
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
