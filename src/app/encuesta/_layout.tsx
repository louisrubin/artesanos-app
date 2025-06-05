import { Stack } from "expo-router";
// import { useState } from "react";

const Encuesta = () => {
  // const [stackTitle, setStackTitle] = useState("Información Básica");
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