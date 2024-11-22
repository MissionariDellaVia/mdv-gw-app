import React, {useEffect, useState} from 'react';
import {ActivityIndicator, ScrollView, StyleSheet, Text, View,} from 'react-native';
import {loadGospelWay} from '../services/MdvService'
import RenderHtml from 'react-native-render-html'

import moment from "moment";
import 'moment/locale/it'

const GospelWayScreen = ({navigation}) => {
    const {
        indicatorWithLoader,
        homeViewContainer,
        cardContainer,
        currentDate,
        normalText,
        title,
        subtitle
    } = styles;

    const [gospelWay, setGospelWay] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const today = () => {
        return moment().format('YYYY-MM-DD');
    };

    const textDate = () => {
        let now = moment().locale('it');
        return now.format('dddd DD MMMM YYYY');
    };

    useEffect(() => {

        const fetchData = async () => {
            const data = await loadGospelWay(today())
            setGospelWay(data)
            setIsLoading(false)
        }
        console.log(gospelWay)
        fetchData().then(r => console.debug(r));
    }, []);

    return (
        <View style={homeViewContainer}>
            {isLoading &&
                <View style={indicatorWithLoader}>
                    <ActivityIndicator size="large" color="#fff" />
                </View>
            }

            <View style={cardContainer}>
                <Text style={subtitle}>{gospelWay?.today?.sacred_texts}</Text>
                <Text style={subtitle}>{gospelWay?.today?.text_ref}</Text>
                <Text style={subtitle}>{gospelWay?.today?.evangelist}</Text>
                <ScrollView>
                    <RenderHtml source={{ html: gospelWay?.today?.text}}></RenderHtml>
                    <RenderHtml source={{ html: gospelWay?.today?.comment}}></RenderHtml>
                </ScrollView>
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
        flex: 1,
        backgroundColor: '#6E4F3A'
    },
    cardContainer: {
        padding: 20,
        backgroundColor: '#E6DECA'
    },
    normalText: {
        textAlign: "justify",
        fontSize: 15,
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
        marginVertical: 5,
        color: '#d3b282',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 20,
    },
    subtitle: {
        marginVertical: 5,
        color: '#A67D51',
        textAlign: 'center',
        fontSize: 20,
    },
    headerSection: {
    }
});

export default GospelWayScreen;
