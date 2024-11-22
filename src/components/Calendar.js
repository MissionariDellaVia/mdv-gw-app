import { useState, useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import moment from 'moment'
import Date from './Date'
import {GlobalStyles} from "../constants/styles";
import {useFonts} from "expo-font";
import {Quicksand_500Medium} from "@expo-google-fonts/quicksand";

const Calendar = ({ onSelectDate, selected }) => {
    const [dates, setDates] = useState([])
    const [scrollPosition, setScrollPosition] = useState(0)
    const [currentMonth, setCurrentMonth] = useState()
    const [fontsLoaded] = useFonts({
        Quicksand_500Medium
    });
    const formatDateToReadable = (dateString) => {
        const dateParts = dateString.split('-');

        const mesi = [
            'Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno',
            'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'
        ];

        return `${dateParts[2]} ${mesi[dateParts[1]-1]} ${dateParts[0]}`;
    };

    const getDates = () => {
        const _dates = []
        for (let i = -10; i < 10; i++) {
            const date = moment().add(i, 'days')
            _dates.push(date)
        }
        setDates(_dates)
    }

    useEffect(() => {
        getDates()
    }, [])

    /**
     * scrollPosition is the number of pixels the user has scrolled
     * we divide it by 60 because each date is 80 pixels wide and we want to get the number of dates
     * we add the number of dates to today to get the current month
     * we format it as a string and set it as the currentMonth
     */
    const getCurrentDate = () => {
        const month = moment(dates[0]).locale('it').add(scrollPosition / 45, 'days').format('dddd DD MMMM')
        let result = month.split(' ').map(word => {
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        }).join(' ');
        setCurrentMonth(result)
    }


    useEffect(() => {
        getCurrentDate()
    }, [scrollPosition])

    return (
        <>
            <View style={styles.dateSection}>
                <Text style={styles.title}>{formatDateToReadable(selected)}</Text>
                <View style={styles.scroll}>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        // onScroll is a native event that returns the number of pixels the user has scrolled
                        onScroll={(e) => setScrollPosition(e.nativeEvent.contentOffset.x)}
                        scrollEventThrottle={16}
                    >
                        {dates.map((date, index) => (
                            <Date
                                key={index}
                                date={date}
                                onSelectDate={onSelectDate}
                                selected={selected}
                            />
                        ))}
                    </ScrollView>
                    <Text style={styles.smallTDate}>{currentMonth}</Text>
                </View>
            </View>
        </>
    )
}

export default Calendar

const styles = StyleSheet.create({
    title: {
        fontFamily: 'Quicksand_500Medium',
        textAlign: 'center',
        marginBottom: 10,
        fontSize: 20,
        fontWeight: 'bold',
        color: GlobalStyles.colors.text250
    },
    smallTDate: {
        fontFamily: 'Quicksand_500Medium',
        fontSize: 15,
        fontWeight: 'bold',
        color: GlobalStyles.colors.text250,
        textAlign: 'center',
    },
    dateSection: {
        width: '100%',
        padding: 20,
    }
})
