import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { AuthProvider } from "../context/AuthContext";
import { RegistrationProvider } from "../context/RegistrationContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <RegistrationProvider>
        <StatusBar style="auto" />

        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
      </RegistrationProvider>
    </AuthProvider>
  );
}
