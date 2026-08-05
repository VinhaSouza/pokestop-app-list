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
        width: '80%',
        height: 60,
        backgroundColor: '#c22525',
        borderRadius: 30,
        shadowColor: "#000",
        shadowOffset: {
	        width: 0,
	        height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 8,   
    },
    buttonTitle: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
    }
})