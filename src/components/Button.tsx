import { ActivityIndicator, StyleSheet, Text, TouchableHighlightProps, TouchableOpacity } from 'react-native'

type Props = TouchableHighlightProps & {
    text:string,
    loading?:boolean
}

export function Button({...rest}:Props){
    return(
        <TouchableOpacity
            style={style.button}
            {...rest}
            activeOpacity={0.6}
        >
            {rest.loading?<ActivityIndicator/>:<Text style={style.buttonTitle}>{rest.text}</Text>}
        </TouchableOpacity>
    )
}

const style = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 200,
        height: 50,
        backgroundColor: '#f35959',
        borderRadius: 40,
    },
    buttonTitle: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
    }
})