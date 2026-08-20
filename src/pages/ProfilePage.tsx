import { StyleSheet, Text, View } from 'react-native';

export default function ProfilePage() {
    return (
        <View style={style.container}>
            <Text>Aqui é a Tela de Perfil</Text>
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
