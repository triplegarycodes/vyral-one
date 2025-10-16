import { ExpoConfig } from "expo/config";

const defineConfig = (): ExpoConfig => ({
  name: "Vyral",
  slug: "vyral",
  scheme: "vyral",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "dark",
  splash: {
    image: "./assets/splash.png",
    backgroundColor: "#000000"
  },
  assetBundlePatterns: ["**/*"],
  experiments: {
    typedRoutes: true
  },
  plugins: ["expo-router"],
  extra: {
    supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL ?? "",
    supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ?? ""
  },
  updates: {
    fallbackToCacheTimeout: 0
  },
  ios: {
    supportsTablet: true
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#000000"
    }
  },
  web: {
    bundler: "metro",
    output: "static"
  }
});

export default defineConfig;
