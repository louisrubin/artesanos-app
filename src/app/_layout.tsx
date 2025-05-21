import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { UserProviderContext } from "../hooks/UserContext";

const RootNavigation = () => {
  return (
    <UserProviderContext>
        <Stack screenOptions={{ headerShown: false }} />
        <StatusBar style="auto" />
    </UserProviderContext>
)
}

export default RootNavigation;