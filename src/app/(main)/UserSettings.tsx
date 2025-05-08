import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import ButtonX from '../../components/ButtonX'
import { useRouter } from 'expo-router';
import imagePath from '../../constants/imagePath';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';

export default function UserSettings() {
    const router = useRouter();

    return (
        <SafeAreaProvider style={styles.container}>
            <View style={styles.header}>
                <Image source={imagePath.userLogo} style={styles.userHeaderIcon} />
                <Text style={{fontSize: 28}}>
                    Detalles de la cuenta
                </Text>
            </View>

            <View style={styles.body}>
                <Text style={{fontSize: 28}}>
                    Detalles de la cuenta
                </Text>
            </View>

        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#feb",
        paddingVertical: moderateVerticalScale(30),
    },
    header:{
        alignItems: "center",
        marginTop: moderateVerticalScale(10),
        marginBottom: moderateVerticalScale(15)
    },
    body: {
        flexGrow: 1,
        marginHorizontal: moderateScale(25),
        backgroundColor: "#fed",
        borderWidth: 1,
        borderRadius: 16,
        width: "85%",
        
        borderColor: '#d7d7d7',
    },
    userHeaderIcon:{
        resizeMode: "contain",
        width: moderateScale(25),
        height: moderateScale(25),
    },
})