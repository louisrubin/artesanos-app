import { useRouter } from "expo-router";
import { Text, View } from "react-native";
import ButtonX from "../../components/ButtonX";


export default function RegisterScreen() {    
  const router = useRouter(); // Cambiar a useRouter

    return(
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

            <Text style={{ fontSize: 40 }}>Registerrrr</Text>

            <ButtonX
                buttonStyles={{ width: 200, marginTop: 30, borderWidth: 1, borderColor: '#000', padding: 12 }}
                textStyles={{ fontWeight: 'bold' }}
                color="#E0F393"
                bgColorPressed="#BCB850"
                fontSize={20}
                onPress={() => router.push('/(auth)/Login')}>
                    Ir a Login
            </ButtonX>

        </View>
    )
}