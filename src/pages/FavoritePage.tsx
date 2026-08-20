import { StyleSheet, Text, View } from 'react-native';

export default function FavoritePage() {
    return (
        <View style={style.container}>
            <Text>Aqui é a Tela de Favoritos</Text>
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
