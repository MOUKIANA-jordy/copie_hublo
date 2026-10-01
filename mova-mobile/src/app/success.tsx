import { router } from "expo-router";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function SuccessScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>MOVA</Text>
        </View>

        {/* Validation */}
        <View style={styles.checkContainer}>
          <Text style={styles.check}>✓</Text>
        </View>

        {/* Titre */}
        <Text style={styles.title}>
          Bienvenue dans{"\n"}
          <Text style={styles.accent}>MOVA.</Text>
        </Text>

        <Text style={styles.subtitle}>
          Votre compte et votre passeport professionnel ont été
          créés avec succès.
        </Text>

        <Text style={styles.description}>
          Vous pouvez maintenant découvrir les missions qui
          correspondent à vos métiers, vos disponibilités et votre
          mobilité.
        </Text>

        {/* Bouton */}
        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.button}
          onPress={() => router.replace("/")}
        >
          <Text style={styles.buttonText}>
            Découvrir MOVA
          </Text>

          <Text style={styles.arrow}>→</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#17122B",
  },

  content: {
    flex: 1,
    paddingHorizontal: 28,
    justifyContent: "center",
  },

  logoContainer: {
    position: "absolute",
    top: 35,
    left: 28,
  },

  logo: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "900",
    letterSpacing: 2,
  },

  checkContainer: {
    width: 76,
    height: 76,
    borderRadius: 25,
    backgroundColor: "#695AE8",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
  },

  check: {
    color: "#FFFFFF",
    fontSize: 36,
    fontWeight: "900",
  },

  title: {
    color: "#FFFFFF",
    fontSize: 42,
    lineHeight: 48,
    fontWeight: "900",
    letterSpacing: -1,
  },

  accent: {
    color: "#8176FF",
  },

  subtitle: {
    color: "#FFFFFF",
    fontSize: 18,
    lineHeight: 27,
    fontWeight: "700",
    marginTop: 22,
  },

  description: {
    color: "#BDB8C9",
    fontSize: 15,
    lineHeight: 24,
    marginTop: 12,
    marginBottom: 40,
  },

  button: {
    height: 62,
    borderRadius: 19,
    backgroundColor: "#695AE8",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "800",
  },

  arrow: {
    color: "#FFFFFF",
    fontSize: 22,
    marginLeft: 10,
  },
});
