import React, {useEffect, useState} from 'react';
import {ActivityIndicator, ScrollView, StyleSheet, Text, View,} from 'react-native';
import {loadGospelWay} from '../services/MdvService'
import {Quicksand_300Light, Quicksand_500Medium, Quicksand_600SemiBold} from "@expo-google-fonts/quicksand";
import {
    BarlowSemiCondensed_300Light,
    BarlowSemiCondensed_400Regular,
    BarlowSemiCondensed_500Medium
} from "@expo-google-fonts/barlow-semi-condensed";

import moment from "moment";
import 'moment/locale/it'
import Calendar from "../components/Calendar";
import {GlobalStyles} from "../constants/styles";
import {useFonts} from "expo-font";
import Divider from "../components/Divider";

const decodeHtmlEntities = (str) => {
    return str?.replace(/&[a-zA-Z0-9#]+;/g, (match) => GlobalStyles.specialChar[match] || match);
};

const GospelWayScreen = ({navigation}) => {
    const {
        indicatorWithLoader,
        homeViewContainer,
        headerSection,
        headingText,
        cardContainer,
        normalText,
        subtitle,
        headerSubtitle,
        title
    } = styles;

    const [gospelWay, setGospelWay] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [fontsLoaded] = useFonts({
        Quicksand_300Light, Quicksand_500Medium, Quicksand_600SemiBold,
        BarlowSemiCondensed_300Light, BarlowSemiCondensed_400Regular, BarlowSemiCondensed_500Medium
    });

    const today = () => {
        return moment().format('YYYY-MM-DD');
    };

    const [selectedDate, setSelectedDate] = useState(today());

    const fetchData = async (date) => {
        setSelectedDate(date)
        const data = await loadGospelWay(date)
        setGospelWay(data)
        setIsLoading(false)
    }
    useEffect(() => {
        console.log(gospelWay)
        fetchData(today()).then(r => console.debug(r));
    }, []);

    if (!fontsLoaded) {
        return <Text>Loading fonts...</Text>;
    }

    return (


        <View style={homeViewContainer}>
            {isLoading &&
                <View style={indicatorWithLoader}>
                    <ActivityIndicator size="large" color="#fff"/>
                </View>
            }

            <View style={headerSection}>
                <Text style={title}>Vangelo del Giorno</Text>
                <View style={headingText}>
                    <Text style={headerSubtitle}>{gospelWay?.today?.saints}</Text>
                    <Text style={headerSubtitle}>{gospelWay?.today?.sacred_texts}</Text>
                </View>
            </View>

            <ScrollView>

                <Calendar onSelectDate={fetchData} selected={selectedDate}/>
                <Divider></Divider>

                <View style={cardContainer}>

                    <Text style={subtitle}>Dal Vangelo secondo {gospelWay?.today?.evangelist}</Text>
                    <Text style={normalText}>{decodeHtmlEntities(gospelWay?.today?.stripped_text)}</Text>

                    <Divider></Divider>

                    <Text style={subtitle}>Commento al Vangelo</Text>
                    <Text style={normalText}>{decodeHtmlEntities(gospelWay?.today?.stripped_comment)}</Text>

                    <Divider></Divider>

                    <Text style={subtitle}>Altri Commenti</Text>

                </View>
            </ScrollView>

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
        flex: 1,
        backgroundColor: '#efdcc7'
    },
    headerSection: {
        backgroundColor: GlobalStyles.colors.principal50,
        paddingTop: 50,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,

    },
    cardContainer: {
        flex: 1,
        padding: 20,
    },
    scrollStyle: {
        height: 20,
    },
    normalText: {
        fontFamily: "Quicksand_300Light",
        lineHeight: 24,
        textAlign: "justify",
        fontSize: 18,
        marginVertical: 10
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
        fontFamily: "BarlowSemiCondensed_400Regular",
        color: '#efdcc7',
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 10,
        fontSize: 36,
    },
    subtitle: {
        fontFamily: "BarlowSemiCondensed_400Regular",
        marginVertical: 5,
        color: '#A67D51',
        textAlign: 'center',
        fontSize: 22,
    },
    headerSubtitle: {
        fontFamily: "BarlowSemiCondensed_400Regular",
        marginVertical: 5,
        color: '#bd9f5c',
        textAlign: 'center',
        fontSize: 22,
    },
    headingText: {
        paddingVertical: 15,
        paddingHorizontal: 25,
    },
});

export default GospelWayScreen;
