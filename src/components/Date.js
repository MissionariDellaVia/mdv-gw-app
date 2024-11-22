import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import moment from 'moment'
import {GlobalStyles} from "../constants/styles";

const Date = ({ date, onSelectDate, selected }) => {
    /**
     * use moment to compare the date to today
     * if today, show 'Today'
     * if not today, show day of the week e.g 'Mon', 'Tue', 'Wed'
     */
    const day = moment(date).format('YYYY-MM-DD') === moment().format('YYYY-MM-DD') ? 'Today' : moment(date).format('ddd')
    // get the day number e.g 1, 2, 3, 4, 5, 6, 7
    const dayNumber = moment(date).format('D')

    // get the full date e.g 2021-01-01 - we'll use this to compare the date to the selected date
    const fullDate = moment(date).format('YYYY-MM-DD')
    return (
        <TouchableOpacity
            onPress={() => onSelectDate(fullDate)}
            style={[styles.card, selected === fullDate && { backgroundColor: GlobalStyles.colors.principal50 }]}
        >
            <View style={{ height: 10 }} />
            <Text
                style={[
                    styles.medium,
                    selected === fullDate && { color: "#fff", fontWeight: 'bold', fontSize: 16 },
                ]}
            >
                {dayNumber}
            </Text>
        </TouchableOpacity>
    )
}

export default Date

const styles = StyleSheet.create({
    card: {
        backgroundColor: GlobalStyles.colors.principal250,
        borderRadius: 10,
        padding: 5,
        marginVertical: 10,
        alignItems: 'center',
        height: 50,
        width: 50,
        marginHorizontal: 5,
    },
    medium: {
        color: "white",
        fontSize: 16,
    },
})
