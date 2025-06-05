import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { UserProviderContext } from "../hooks/UserContext";
// import { GestureHandlerRootView } from "react-native-gesture-handler";

const RootNavigation = () => {
  return (
   <>
      <StatusBar style="dark" />

      <UserProviderContext>
         <Stack screenOptions={{ headerShown: false }} >
            <Stack.Screen name="index" />
            {/* <Stack.Screen name="userConfig" />
            <Stack.Screen name="auth" />
            <Stack.Screen name="main" />
            <Stack.Screen name="admin" />
            <Stack.Screen name="encuesta" /> */}
         </Stack>
      </UserProviderContext>
   </>
   )
}

export default RootNavigation;