import { Stack } from "expo-router";

const AdminLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: true }}>
      <Stack.Screen name="index" 
        options={{ 
          headerTitle: "Panel de Administración",
          headerStyle: {
              backgroundColor: "#fda"
          }
        }} />
    
    </Stack>
  );
};
export default AdminLayout;