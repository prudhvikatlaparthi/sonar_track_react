import { Text, TouchableOpacity, StyleProp, ViewStyle, ActivityIndicator } from 'react-native'
import React from 'react'
import Colors from '@/app/utils/colors';

const MyButton = ({ text, onPress, containerStyle, isLoading }: { text: string; onPress: () => void; containerStyle?: StyleProp<ViewStyle>, isLoading?: boolean }) => {
    return (
        <TouchableOpacity disabled={isLoading} style={[{ alignSelf: 'center', backgroundColor: Colors.colorPrimary, width: 150, padding: 10, borderRadius: 5 }, containerStyle]} onPress={onPress}>
            {isLoading === true ? <ActivityIndicator size="small" color={Colors.colorWhite} style={{ alignSelf: 'center' }} /> : <Text style={{ color: Colors.colorWhite, textAlign: 'center', fontSize: 16, fontFamily: 'mont-semi-bold' }}>{text.split('').join(" ")}</Text>}
        </TouchableOpacity>

    )
}

export default MyButton