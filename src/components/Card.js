import React from 'react';

import {View, Image, StyleSheet, Button, Text} from 'react-native';

const Card = () => {
    const {
        homeViewContainer,
    } = styles;

    return (
        <View style={homeViewContainer}>
            <Button title={"Chi siamo"}/>
            <Button title={"Via del Vangelo"}/>

            <Text>Caro Fratello e sorella benvenuto/a!</Text>
            <Text>Questo sito contiene il diario spirituale della Comunità sul Vangelo del giorno. L'abbiamo realizzata perchè potesse servire anche a te!
                Questo commento è un aiuto per meditare e costudire almeno una parola del Vangelo, perchè possa portare frutto nel cammino quotidiano alla sequela di Gesù e per vivere il carisma della comunità più intensamente!
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    homeViewContainer: {
        paddingTop: 220,
        flex: 1,
        backgroundColor: '#6E4F3A'
    },
    containerDate: {
        marginBottom: 30,
    },
    currentDate: {
        fontSize: 22,
        textTransform: 'capitalize',
    },
    homeButton: {
        minWidth: 200,
        padding: 10,
    },
    textButton: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
        textTransform: 'uppercase',
    },
});
