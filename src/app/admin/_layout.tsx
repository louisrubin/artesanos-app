import { Stack } from "expo-router";

const AdminLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: true }}>
      <Stack.Screen name="index" 
        options={{ 
          headerTitle: "Lista de usuarios",
          headerStyle: {
              backgroundColor: "#fda"
          }
        }} />
    
    </Stack>
  );
};
export default AdminLayout;