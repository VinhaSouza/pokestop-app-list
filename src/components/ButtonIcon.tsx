import React from 'react';
import { TouchableOpacity, TouchableOpacityProps, Text } from 'react-native';

type Props = TouchableOpacityProps & {
    text: string;
    icon?: React.ReactNode;
};

export function ButtonIcon({ icon, ...rest }: Props) {
    return (
        <TouchableOpacity {...rest}>
            <Text>{rest.text}</Text>
            {icon}
        </TouchableOpacity>
    );
}
