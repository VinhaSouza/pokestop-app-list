import { StyleSheet, TextInput, View, TextInputProps } from "react-native";

type InputProps = TextInputProps & { 
    icon?: React.ReactNode
}

export function Input({icon, ...rest}: InputProps){
    return(
        <View style={style.formBox}>
            <TextInput style={style.input} {...rest}/>
            {icon}
        </View>
    )
}
    
const style = StyleSheet.create({
    formBox: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderRadius: 40,
        flexDirection: 'row',
        marginTop: 10,
        borderColor: '#d97c7c',
        backgroundColor: '#eeeded',
        alignItems: 'center',  
    },
    input: {
        width:'85%',
        height: '100%',
        paddingHorizontal: 20,
    },
})