import { View, Text, TextInput, ViewStyle, StyleProp, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import Colors from '@/app/utils/colors';

interface EditTextProps {
    userName: string;
    value: string;
    onChangeText: (text: string) => void;
    containerStyle?: StyleProp<ViewStyle>;
    secureTextEntry?: boolean;
}

const EditText = ({ userName, value, onChangeText, containerStyle, secureTextEntry }: EditTextProps) => {
    const [passwordVisible, setPasswordVisible] = useState(false);

    return (
        <View style={[styles.container, containerStyle]}>
            <Text style={styles.label}>{userName}</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    value={value}
                    style={styles.textInput}
                    onChangeText={onChangeText}
                    secureTextEntry={secureTextEntry ? !passwordVisible : false}
                />
                {secureTextEntry && (
                    <Text
                        style={styles.toggleText}
                        onPress={() => setPasswordVisible(!passwordVisible)}
                    >
                        {passwordVisible ? 'Hide' : 'Show'}
                    </Text>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    label: {
        color: Colors.colorPrimaryDark,
        marginBottom: 5,
        fontFamily: 'mont-semi-bold',
    },
    inputContainer: {
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
    },
    textInput: {
        flex: 1,
        borderColor: Colors.colorPrimaryDark,
        borderWidth: 1,
        padding: 8,
        borderRadius: 5,
        fontFamily:'mont-semi-bold',
        fontSize: 16,
        color: Colors.colorPrimaryDark,
        marginTop: 5,
        paddingRight: 50, // Add padding to make space for "Show/Hide" text
    },
    toggleText: {
        position: 'absolute',
        right: 10, // Position the text inside the TextInput
        top: 15, // Adjust to align vertically
        fontSize: 12,
        color: Colors.colorPrimaryDark,
        fontFamily:'mont-semi-bold',
    },
});

export default EditText;