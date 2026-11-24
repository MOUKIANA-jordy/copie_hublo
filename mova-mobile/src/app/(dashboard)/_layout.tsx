import Ionicons from "@expo/vector-icons/Ionicons";
import { Redirect, Tabs } from "expo-router";
import { ActivityIndicator, View } from "react-native";

import { useAuth } from "../../context/AuthContext";

const PURPLE = "#695AE8";
const GRAY = "#85818C";

export default function DashboardLayout() {
  const { user, loading } = useAuth();

  // Attendre la vérification de la session
  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#FAF9FC",
        }}
      >
        <ActivityIndicator size="large" color={PURPLE} />
      </View>
    );
  }

  // Empêcher l'accès au dashboard sans connexion
  if (!user) {
    return <Redirect href="/login" />;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: PURPLE,
        tabBarInactiveTintColor: GRAY,
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          borderTopColor: "#EEEAF3",
          height: 84,
          paddingTop: 9,
          paddingBottom: 20,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "600",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Accueil",
          tabBarIcon: ({ focused, size }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={size}
              color={focused ? PURPLE : GRAY}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="missions"
        options={{
          title: "Missions",
          tabBarIcon: ({ focused, size }) => (
            <Ionicons
              name={focused ? "briefcase" : "briefcase-outline"}
              size={size}
              color={focused ? PURPLE : GRAY}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="planning"
        options={{
          title: "Planning",
          tabBarIcon: ({ focused, size }) => (
            <Ionicons
              name={focused ? "calendar" : "calendar-outline"}
              size={size}
              color={focused ? PURPLE : GRAY}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="emplois"
        options={{
          title: "Emplois",
          tabBarIcon: ({ focused, size }) => (
            <Ionicons
              name={focused ? "business" : "business-outline"}
              size={size}
              color={focused ? PURPLE : GRAY}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profil"
        options={{
          title: "Profil",
          tabBarIcon: ({ focused, size }) => (
            <Ionicons
              name={focused ? "person-circle" : "person-circle-outline"}
              size={size}
              color={focused ? PURPLE : GRAY}
            />
          ),
        }}
      />
    </Tabs>
  );
}
