import {
  Tabs,
  TabList,
  TabTrigger,
  TabSlot,
} from "expo-router/ui";

import {
  Pressable,
  StyleSheet,
  View,
} from "react-native";

import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";

import {
  MaxContentWidth,
  Spacing,
} from "@/constants/theme";

export default function AppTabs() {
  return (
    <Tabs>
      <TabSlot style={styles.tabSlot} />

      <TabList style={styles.tabList}>
        <TabTrigger name="home" href="/" asChild>
          <Pressable style={styles.tabButton}>
            <ThemedText type="smallBold">
              Accueil
            </ThemedText>
          </Pressable>
        </TabTrigger>
      </TabList>
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabSlot: {
    height: "100%",
  },

  tabList: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: Spacing.three,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },

  tabButton: {
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.five,
    borderRadius: Spacing.three,
    backgroundColor: "#695AE8",
    maxWidth: MaxContentWidth,
  },
});
