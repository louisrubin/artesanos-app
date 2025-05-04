import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const RootNavigation = () => {
  return (
    <>
      <Stack screenOptions={{ headerShown: false }} />

      
      <StatusBar style="auto" />
    </>
)
}

export default RootNavigation;