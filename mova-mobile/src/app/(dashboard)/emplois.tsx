import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Screen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconBox}>
          <Ionicons name="business-outline" size={36} color="#695AE8" />
        </View>
        <Text style={styles.title}>Mes emplois</Text>
        <Text style={styles.description}>Découvrez les opportunités dans vos secteurs professionnels.</Text>
        <Text style={styles.info}>Ce module sera bientôt disponible.</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FAF9FC" },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 28,
  },
  iconBox: {
    width: 85,
    height: 85,
    borderRadius: 26,
    backgroundColor: "#EEEBFF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    color: "#211D2B",
    marginBottom: 12,
  },
  description: {
    fontSize: 15,
    color: "#777181",
    textAlign: "center",
    lineHeight: 23,
  },
  info: {
    color: "#695AE8",
    fontWeight: "700",
    fontSize: 12,
    marginTop: 22,
  },
});
