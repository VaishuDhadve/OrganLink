import { Stack } from "expo-router";
import "../global.css";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // This will hide the header for all screens in the stack
      }}></Stack>
  );
}
