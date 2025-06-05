import { Stack } from "expo-router";
// import { StatusBar } from "expo-status-bar";

export default function UserLayout() {
    return(
        <>
        <Stack screenOptions={{ headerShown: true }}>
            <Stack.Screen name="index" 
                options={{ 
                    headerTitle: "Detalles de la cuenta",
                    headerStyle: {
                        backgroundColor: "#feb"
                    }
                 }} 
            />
        </Stack>
        </>
    )
}