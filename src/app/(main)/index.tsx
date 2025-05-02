import { useRouter } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';
import ButtonX from '../../components/ButtonX';

export default function PantallaPrincipal() {
      const router = useRouter(); // Cambiar a useRouter
    
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bienvenido a la pantalla principal</Text>
            <ButtonX
             onPress={() => router.push('/encuesta')} > push here </ButtonX>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});