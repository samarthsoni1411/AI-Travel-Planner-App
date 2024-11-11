import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Dimensions, ToastAndroid } from 'react-native';
import moment from 'moment';
import { useNavigation, useRouter } from 'expo-router';
import { CreateTripContext } from '../../context/CreateTripContext';

const Colors = {
    PRIMARY: '#000000',
    WHITE: '#FFFFFF',
    GREY: '#F3F3F3',
    LIGHT_BLACK: '#222222',
};

const windowWidth = Dimensions.get('window').width;

export default function SelectDates() {
    const navigation = useNavigation();
    const [currentMonth, setCurrentMonth] = useState(moment());
    const [selectedStartDate, setSelectedStartDate] = useState();
    const [selectedEndDate, setSelectedEndDate] = useState();
    const { tripData, setTripData } = useContext(CreateTripContext);
    const router=useRouter();

   

    const OnDateSelectionContinue=()=>{
if(!selectedStartDate&&!selectedEndDate)
{
    ToastAndroid.show('Please select start and end date',ToastAndroid.LONG)
    return;
}
const totalNoOfDays=selectedEndDate.diff(selectedStartDate,'days');
console.log(totalNoOfDays+1);
setTripData({
    ...tripData,
    selectedStartDate:selectedStartDate,
    selectedEndDate:selectedEndDate,
    totalNoOfDays:totalNoOfDays+1
});

router.push('/create-trip/select-budget')

    }

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTransparent: true,
            headerTitle: '',
        });
    }, []);

    const renderDayNames = () => {
        const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        return (
            <View style={styles.dayNamesContainer}>
                {dayNames.map((day) => (
                    <Text key={day} style={styles.dayNameText}>
                        {day}
                    </Text>
                ))}
            </View>
        );
    };

    const renderDates = () => {
        const daysInMonth = currentMonth.daysInMonth();
        const startOfMonth = moment(currentMonth).startOf('month').day();
        const datesArray = [];

        // Fill in empty slots for days before the first day of the month
        for (let i = 0; i < startOfMonth; i++) {
            datesArray.push(null);
        }

        // Fill in actual dates of the month
        for (let i = 1; i <= daysInMonth; i++) {
            datesArray.push(i);
        }

        return (
            <FlatList
                numColumns={7}
                data={datesArray}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => renderDateItem(item)}
                columnWrapperStyle={styles.columnWrapperStyle}
            />
        );
    };

    const renderDateItem = (day) => {
        if (day === null) {
            return <View style={styles.emptyDate} />;
        }

        const dayDate = moment(currentMonth).date(day);
        const isStartDate = selectedStartDate && dayDate.isSame(selectedStartDate, 'day');
        const isEndDate = selectedEndDate && dayDate.isSame(selectedEndDate, 'day');
        const isInRange = selectedStartDate && selectedEndDate && dayDate.isBetween(selectedStartDate, selectedEndDate, null, '[]');

        let backgroundColor = Colors.WHITE;
        let textColor = Colors.LIGHT_BLACK;

        if (isStartDate || isEndDate) {
            backgroundColor = Colors.PRIMARY;
            textColor = Colors.WHITE;
        } else if (isInRange) {
            backgroundColor = Colors.GREY;
            textColor = Colors.LIGHT_BLACK;
        }

        return (
            <TouchableOpacity
                onPress={() => handleDateSelect(dayDate)}
                style={[styles.dateItem, { backgroundColor }]}
            >
                <Text style={{ color: textColor }}>{day}</Text>
            </TouchableOpacity>
        );
    };

    const handleDateSelect = (dayDate) => {
        // If no start date is selected, set it
        if (!selectedStartDate) {
            setSelectedStartDate(dayDate);
            setSelectedEndDate(null);
        } else if (selectedStartDate && !selectedEndDate && dayDate.isAfter(selectedStartDate)) {
            // If a start date is selected but no end date, and the new date is after the start date, set it as the end date
            setSelectedEndDate(dayDate);
        } else {
            // If both start and end dates are selected, reset the range and set new start date
            setSelectedStartDate(dayDate);
            setSelectedEndDate(null);
        }
    };

    const goToNextMonth = () => {
        setCurrentMonth(moment(currentMonth).add(1, 'months'));
    };

    const goToPrevMonth = () => {
        setCurrentMonth(moment(currentMonth).subtract(1, 'months'));
    };

    return (
        <View style={{ padding: 25, paddingTop: 75, backgroundColor: Colors.WHITE, height: '100%' }}>
            <Text style={{ fontFamily: 'outfit-bold', fontSize: 35, marginTop: 20 }}>
                Travel Dates
            </Text>

            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={goToPrevMonth}>
                        <Text style={styles.navigationText}>Previous</Text>
                    </TouchableOpacity>
                    <Text style={styles.monthText}>{currentMonth.format('MMMM YYYY')}</Text>
                    <TouchableOpacity onPress={goToNextMonth}>
                        <Text style={styles.navigationText}>Next</Text>
                    </TouchableOpacity>
                </View>
                {renderDayNames()}
                {renderDates()}
                <TouchableOpacity 
                onPress={OnDateSelectionContinue}
                style={styles.continueButton}>
                    <Text style={styles.continueButtonText}>Continue</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5,
        backgroundColor: Colors.WHITE,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    navigationText: {
        fontSize: 18,
        color: Colors.PRIMARY,
    },
    monthText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: Colors.LIGHT_BLACK,
    },
    dayNamesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 30,
    },
    dayNameText: {
        width: windowWidth / 10, // Dynamically adjust width to fit screen
        textAlign: 'center',
        fontWeight: 'bold',
        color: Colors.LIGHT_BLACK,
    },
    columnWrapperStyle: {
        justifyContent: 'space-between',
        flex: 1, // Make sure the columns take full width
    },
    emptyDate: {
        width: windowWidth / 11, // Dynamically adjust width to fit screen
        height: 30,
    },
    dateItem: {
        width: windowWidth / 14, // Dynamically adjust width to fit screen
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        margin: 2,
        borderWidth: 1,
        borderColor: Colors.GREY,
    },
    continueButton: {
        marginTop: 20,
        paddingVertical: 15,
        backgroundColor: Colors.PRIMARY,
        alignItems: 'center',
        borderRadius: 8,
    },
    continueButtonText: {
        color: Colors.WHITE,
        fontSize: 18,
        fontWeight: 'bold',
    },
});
