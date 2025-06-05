import { Stack } from "expo-router";

const Encuesta = () => {
  return (
    <Stack>
      <Stack.Screen name="index" 
      options={{ 
        headerShown: true, 
        headerTitle: "Registrar Artesano",
      }} />    
    </Stack>
  );
};
export default Encuesta;