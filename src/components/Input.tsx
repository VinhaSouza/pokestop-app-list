import { StyleSheet, TextInput, Text, View, TextInputProps, Image } from "react-native";

export function Input({...rest}: TextInputProps){
    return(
        <View style={style.formBox}>
            <TextInput style={style.input} {...rest}/>
            <Image
                source={require('../assets/pixel-ball-icon.png')}
                style={style.icon}
                resizeMode='contain'
            />
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
    icon: {
        width: 30,
        height: 30,
        marginRight: 10,
    }

})