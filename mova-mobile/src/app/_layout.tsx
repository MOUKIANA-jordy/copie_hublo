import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { RegistrationProvider } from "../context/RegistrationContext";

export default function RootLayout() {
  return (
    <RegistrationProvider>
      <StatusBar style="light" />

      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </RegistrationProvider>
  );
}
