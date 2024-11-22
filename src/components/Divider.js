import React from 'react';
import { View, StyleSheet } from 'react-native';

const Divider = () => {
    return <View style={styles.divider} />;
};

const styles = StyleSheet.create({
    divider: {
        height: 0.5,               // Altezza del divisore
        width: '90%',
        marginHorizontal: "auto",
        backgroundColor: '#3f2a02', // Colore del divisore (grigio chiaro)
        marginVertical: 10,       // Spaziatura verticale (margine sopra e sotto)
    },
});

export default Divider;
