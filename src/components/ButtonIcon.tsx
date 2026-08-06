import React from 'react'
import { TouchableOpacity, TouchableOpacityProps } from 'react-native'

type Props = TouchableOpacityProps & {
    text:string,
    icon?: React.ReactNode
}

export function ButtonIcon({icon,...rest}: Props) {;
    return(
            <TouchableOpacity {...rest}>            
                {icon} 
            </TouchableOpacity>
    )
  }

