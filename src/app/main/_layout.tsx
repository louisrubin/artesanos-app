import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const MainLayout = () => {
  return (
    <>
      <StatusBar style="dark" />
      
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
      </Stack>
    </>
  );
};
export default MainLayout;