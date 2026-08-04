import { Image, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export function Header() {
    return (
        <SafeAreaView>
        <View style={style.container}>
            <Image 
                source={require("../assets/pixel-ball-icon.png")}
                style={style.icon}
            />

            <Text style={style.title}>
                PRODUTOS{"\n"}EM DESTAQUE
            </Text>

            <Image 
                source={require("../assets/pixel-ball-icon.png")}
                style={style.icon}
            />
        </View>
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 20,
    },
    icon: {
        width: 35,
        height: 35
    },
    title: {
        fontSize: 24,
        fontWeight: '900',
        textAlign: 'center',
    }
})