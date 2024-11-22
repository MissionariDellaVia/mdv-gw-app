import React from 'react';
import { Text, StyleSheet, TouchableOpacity  } from 'react-native';

export default function ActionButton(props) {
    const { onPress, title = 'Save', color = "brown" } = props;
    return (
        <TouchableOpacity  style={ "brown" === color ? [styles.button, styles.brownColor] : [styles.button, styles.lightColor]  } onPress={onPress}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity >
    );
}

const styles = StyleSheet.create({
    button: {
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
        paddingHorizontal: 25,
        borderRadius: 10,
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    brownColor: {
        backgroundColor: '#855d42',
    },
    lightColor: {
        backgroundColor: '#ad8b4a',
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
});
