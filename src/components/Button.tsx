import { ActivityIndicator, StyleSheet, Text, View, TouchableOpacityProps, TouchableOpacity } from 'react-native';
import { colors } from '../themes/colors';
import { iconSizes } from '../themes/iconSizes';

type Props = TouchableOpacityProps & {
    text:string,
    loading?:boolean
}

export function Button({loading,...rest}:Props){
    return(
        <TouchableOpacity
            {...rest}
            activeOpacity={0.6}
            disabled={loading}
        >
            {loading ? ( 
                <View style={style.loading}>
                <ActivityIndicator size={iconSizes.small}/>
                <Text style={style.buttonTitle}>Entrando...</Text>    
                </View>
            ) : 
            (<Text style={style.buttonTitle}>{rest.text}</Text>)}
        </TouchableOpacity>
    )
}

const style = StyleSheet.create({
    buttonTitle: {
        fontSize: 16,
        color: colors.white,
        fontWeight: '600',
    },
    loading: {
        flexDirection: 'row',
    }
})