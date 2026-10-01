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
        <View style={styles.logo}>
          <Text style={styles.logoText}>M</Text>
        </View>

        <View style={styles.checkContainer}>
          <Text style={styles.check}>✓</Text>
        </View>

        <Text style={styles.title}>
          Bienvenue dans{"\n"}
          <Text style={styles.accent}>MOVA.</Text>
        </Text>

        <Text style={styles.subtitle}>
          Votre passeport professionnel est prêt.
          Vous pourrez bientôt découvrir les missions qui
          correspondent à votre profil.
        </Text>

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

  logo: {
    position: "absolute",
    top: 35,
    left: 28,
  },

  logoText: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "900",
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
    color: "#BDB8C9",
    fontSize: 16,
    lineHeight: 25,
    marginTop: 20,
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
