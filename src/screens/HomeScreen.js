import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View,} from 'react-native';
import {getInfoByDate} from '../services/MdvService'
import { ActivityIndicator } from "react-native";
import moment from "moment";
import 'moment/locale/it'
import {GlobalStyles} from "../constants/styles";
import {useFonts} from "expo-font";
import {
    Quicksand_300Light,
    Quicksand_400Regular,
    Quicksand_500Medium
} from "@expo-google-fonts/quicksand";
import {BarlowSemiCondensed_300Light, BarlowSemiCondensed_400Regular} from '@expo-google-fonts/barlow-semi-condensed'
function HeaderTitle() {
    return (
        <Image
            style={{ width: 200, height: 200, marginTop: 40, marginBottom: 35, alignSelf: 'center' }}
            source={require('../../assets/homeImg.png')}
        />
    );
}

const HomeScreen = () => {
    const {
        indicatorWithLoader,
        homeViewContainer,
        cardContainer,
        normalText,
        subtitle
    } = styles;

    const [info, setInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [fontsLoaded] = useFonts({
        Quicksand_300Light, Quicksand_400Regular, Quicksand_500Medium, BarlowSemiCondensed_300Light
    });

    const today = () => {
        return moment().format('YYYY-MM-DD');
    };
    useEffect(() => {

        const fetchData = async () => {
            const data = await getInfoByDate(today())
            setInfo(data)
            setIsLoading(false)
        }
        console.log(info)
        fetchData().then(r => console.debug(r));
    }, []);

    if (!fontsLoaded) {
        return <Text>Loading fonts...</Text>;
    }

    return (
        <View style={homeViewContainer}>
            {isLoading &&
                <View style={indicatorWithLoader}>
                <ActivityIndicator size="large" color="#fff" />
                </View>
            }

            <HeaderTitle />

            <View style={cardContainer}>
                <Text style={subtitle}>Caro Fratello e sorella <Text style={{fontWeight: "bold", color: GlobalStyles.colors.text250}}> benvenuto/a!</Text></Text>
                <Text style={normalText}>Questa app contiene il diario spirituale della Comunità sul Vangelo del giorno. L'abbiamo realizzata perchè potesse servire anche a te!
                    {"\n"}Questo commento è un aiuto per meditare e costudire almeno una parola del Vangelo, perchè possa portare frutto nel cammino quotidiano alla sequela di Gesù e per vivere il carisma della comunità più intensamente!
                </Text>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    indicatorWithLoader: {
        position: "absolute",
        zIndex: 1,
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

    },
    homeViewContainer: {
        paddingTop: 30,
        flex: 1,
        backgroundColor: GlobalStyles.colors.principal350,
    },
    cardContainer: {
        borderRadius: 10,
        padding: 20,
    },
    normalText: {
        textAlign: "center",
        fontSize: 20,
        fontWeight: 50,
        marginVertical: 10,
        fontFamily: "Quicksand_300Light",
        color: GlobalStyles.colors.text50
    },
    currentDate: {
        color: '#A67D51',
        marginTop: 5,
        marginBottom: 25,
        textAlign: 'center',
        fontSize: 26,
        textTransform: 'capitalize',
    },
    title: {
        marginVertical: 5,
        color: '#d3b282',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 20,
    },
    subtitle: {
        fontFamily: "BarlowSemiCondensed_300Light",
        marginVertical: 5,
        color: GlobalStyles.colors.text50,
        textAlign: 'center',
        fontSize: 25,
    },
    headerSection: {
    }
});

export default HomeScreen;
