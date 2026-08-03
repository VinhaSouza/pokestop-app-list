import { forwardRef, LegacyRef } from "react";
import { StyleSheet, TextInput, Text, View, Dimensions, TextInputProps } from "react-native";

export function Input({...rest}: TextInputProps){
    return(
        <View style={style.formBox}>
            <TextInput style={style.input} {...rest}/>
            <Text>Icon</Text>
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
        borderColor: 'gray',
        backgroundColor: 'lightgray',
        alignItems: 'center',  
    },
    input: {
        width:'85%',
        height: '100%',
        paddingHorizontal: 10,
    },

})