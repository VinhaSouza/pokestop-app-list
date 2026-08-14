import { StyleSheet, TextInput, View, TextInputProps } from 'react-native';

type InputProps = TextInputProps & {
    icon?: React.ReactNode;
};

export function Input({ icon, ...rest }: InputProps) {
    return (
        <View style={style.formBox}>
            <TextInput {...rest} />
            {icon}
        </View>
    );
}

const style = StyleSheet.create({
    formBox: {
        flexDirection: 'row',
        marginTop: 10,
        alignItems: 'center',
    },
});
