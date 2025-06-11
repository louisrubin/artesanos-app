import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { AppInitializer } from "../hooks/AppInitializer";
import { Provider } from "react-redux";
import { store } from "../redux";

const RootNavigation = () => {
  return (
   <>
      <StatusBar style="dark" />

      <Provider store={store}>
        <AppInitializer>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
          </Stack>
        </AppInitializer>
      </Provider>
   </>
   )
}

export default RootNavigation;