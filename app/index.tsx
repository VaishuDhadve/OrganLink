import { useEffect } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

export default function SplashScreen() {
  useEffect(() => {
    // Navigate to login screen after 2 seconds
    const timer = setTimeout(() => {
      router.replace("/auth/login");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <LinearGradient colors={["#1a5276", "#2980b9"]} style={styles.container}>
      <View style={styles.content}>
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
          }}
          style={styles.logo}
        />
        <Text style={styles.title}>OrganLink</Text>
        <Text style={styles.subtitle}>Connecting donors and recipients</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    alignItems: "center",
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  title: {
    fontFamily: "Inter-Bold",
    fontSize: 32,
    color: "#ffffff",
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: "Inter-Regular",
    fontSize: 16,
    color: "#e0e0e0",
  },
});
