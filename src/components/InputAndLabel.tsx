import { StyleSheet, Text, View } from 'react-native'
import { Control, Controller } from 'react-hook-form'
import InputX, { PropsInputX } from './InputX'
import { moderateScale } from 'react-native-size-matters'

type PropsParam ={
    stylesContainer?: any;
    styleLabel?: any;
    titleLabel: string;
    control?: Control<any>;
    name?: string;
}

// Combinás ambos tipos en uno solo
type Props = PropsParam & PropsInputX;

export default function InputAndLabelX(props : Props ) {

    return (
        <View style={[props.stylesContainer, styles.container]}>
            <Text style={[styles.label, props.styleLabel]}>{props.titleLabel}</Text>

            {  // condicional para cuando se necesita para un useForm o default
            props.control && props.name ? (
                <Controller control={props.control} name={props.name}
                    render={ ({field: {onChange, value}}) => (
                        <InputX 
                            value={value}
                            onChangeText={onChange} 

                            placeholder={props.placeholder}
                            tipoTeclado={props.tipoTeclado}
                            passwordInput={props.passwordInput}
                            editable={props.editable}
                            bgColorInput={props.bgColorInput}
                            />
                    )}
                />
            ) :             
                <InputX 
                value={props.value}
                onChangeText={props.onChangeText} 

                placeholder={props.placeholder}
                tipoTeclado={props.tipoTeclado}
                passwordInput={props.passwordInput}
                editable={props.editable}
                bgColorInput={props.bgColorInput}
                colorTexto={props.colorTexto}
                />
            }
            
        </View>
    )
}


const styles = StyleSheet.create({
    container: {

    },
    label: {
        fontSize: moderateScale(25), 
        marginTop: moderateScale(15),
        marginBottom: 2,
        alignSelf: 'flex-start',
    }
})