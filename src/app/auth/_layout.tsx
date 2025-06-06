import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: true }} >
      <Stack.Screen name="Login" options={{headerShown: false}} />
      <Stack.Screen name="Register" options={{headerTitle: "Formulario de registro"}} />
    </Stack>
  )
  
}