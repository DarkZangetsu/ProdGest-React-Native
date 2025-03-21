import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View, StyleSheet, Platform, Dimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useWindowDimensions } from "react-native";

export default function RootLayout() {
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();
  const isTablet = width >= 768; // Considérer comme tablette si largeur >= 768px

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: '#1E1E2E',
            height: isTablet ? 70 : 56, // Header plus grand sur tablette
          },
          headerTintColor: '#E4E4E6',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: isTablet ? 22 : 18, // Texte plus grand sur tablette
          },
          contentStyle: {
            backgroundColor: '#121222',
            paddingHorizontal: isTablet ? 24 : 16, // Plus d'espace sur tablette
          },
          animation: 'fade_from_bottom',
          // Ajustements pour tablette
          headerLargeTitle: isTablet,
          headerLargeTitleStyle: {
            fontSize: 28,
            fontWeight: 'bold',
            color: '#E4E4E6',
          },
          // Ajustement pour l'orientation
          orientation: 'all',
        }}
        initialRouteName="index"
      >
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
            title: "ProdGest",
          }}
        />
      </Stack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121222',
  },
});