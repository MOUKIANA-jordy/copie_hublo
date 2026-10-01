import { router } from "expo-router";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function WelcomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.backgroundCircleOne} />
      <View style={styles.backgroundCircleTwo} />

      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <View style={styles.logoMark}>
            <View style={[styles.logoPart, styles.logoLeft]} />
            <View style={[styles.logoPart, styles.logoRight]} />
          </View>

          <Text style={styles.logo}>MOVA</Text>
        </View>

        <View style={styles.hero}>
          <Text style={styles.title}>
            Le travail bouge.{"\n"}
            <Text style={styles.titleAccent}>Vous aussi.</Text>
          </Text>

          <Text style={styles.subtitle}>
            Trouvez des missions qui correspondent à vos métiers,
            vos disponibilités et votre localisation.
          </Text>

          <View style={styles.sectors}>
            <Text style={styles.sector}>Santé</Text>
            <Text style={styles.dot}>•</Text>
            <Text style={styles.sector}>Restauration</Text>
            <Text style={styles.dot}>•</Text>
            <Text style={styles.sector}>Logistique</Text>
          </View>
        </View>

        <View style={styles.bottom}>
          <Text style={styles.tagline}>
            Un profil. Toutes vos opportunités.
          </Text>

          <TouchableOpacity
            style={styles.primaryButton}
            activeOpacity={0.85}
            onPress={() => router.push("/register")}
          >
            <Text style={styles.primaryButtonText}>
              Créer mon profil
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.loginButton}
            activeOpacity={0.7}
            onPress={() => router.push("/login")}
          >
            <Text style={styles.loginText}>
              J'ai déjà un compte
            </Text>
          </TouchableOpacity>

          <Text style={styles.footer}>
            MOVA • Missions professionnelles
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#17122B",
    overflow: "hidden",
  },

  content: {
    flex: 1,
    paddingHorizontal: 28,
    paddingTop: 28,
    paddingBottom: 20,
    justifyContent: "space-between",
  },

  backgroundCircleOne: {
    position: "absolute",
    width: 340,
    height: 340,
    borderRadius: 170,
    backgroundColor: "#5C4EE5",
    opacity: 0.17,
    top: -100,
    right: -130,
  },

  backgroundCircleTwo: {
    position: "absolute",
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: "#8D7BFF",
    opacity: 0.09,
    bottom: 70,
    left: -180,
  },

  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 11,
  },

  logoMark: {
    width: 42,
    height: 38,
    position: "relative",
  },

  logoPart: {
    position: "absolute",
    width: 17,
    height: 38,
    borderRadius: 9,
    backgroundColor: "#8175FF",
  },

  logoLeft: {
    left: 7,
    transform: [{ rotate: "32deg" }],
  },

  logoRight: {
    right: 7,
    backgroundColor: "#B1A9FF",
    transform: [{ rotate: "-32deg" }],
  },

  logo: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "800",
    letterSpacing: 1.5,
  },

  hero: {
    marginTop: 30,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 45,
    lineHeight: 51,
    fontWeight: "800",
    letterSpacing: -1.5,
  },

  titleAccent: {
    color: "#9D92FF",
  },

  subtitle: {
    marginTop: 22,
    color: "#C7C3D5",
    fontSize: 17,
    lineHeight: 26,
    maxWidth: 340,
  },

  sectors: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    marginTop: 22,
    gap: 8,
  },

  sector: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "600",
  },

  dot: {
    color: "#8175FF",
  },

  bottom: {
    width: "100%",
  },

  tagline: {
    color: "#BDB8CC",
    textAlign: "center",
    fontSize: 14,
    marginBottom: 18,
  },

  primaryButton: {
    height: 58,
    borderRadius: 18,
    backgroundColor: "#695AE8",
    alignItems: "center",
    justifyContent: "center",
  },

  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
  },

  loginButton: {
    height: 56,
    alignItems: "center",
    justifyContent: "center",
  },

  loginText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },

  footer: {
    color: "#706B80",
    textAlign: "center",
    fontSize: 11,
    marginTop: 4,
  },
});
