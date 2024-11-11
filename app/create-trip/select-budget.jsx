import { View, Text, FlatList, ToastAndroid } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import { SelectBudgetOptions } from '../../constants/Options';
import OptionCard from './../../components/CreateTrip/OptionCard';
import { Colors } from '../../constants/Colors';
import { TouchableOpacity } from 'react-native';
import { CreateTripContext } from '../../context/CreateTripContext';
export default function SelectBudget() {

    const navigation=useNavigation();
    const [selectedOption,setSelectedOption]=useState();
    const { tripData, setTripData } = useContext(CreateTripContext);
    const router=useRouter();
    useEffect(()=>{
        navigation.setOptions({
            headerShown:true,
            headerTransparent:true,
            headerTitle:''
        })

    },[]);

    useEffect(()=>{
selectedOption&&setTripData({
    ...tripData,
    budget:selectedOption?.title
})
    },[selectedOption])

    const onClickContinue=()=>{
        if(!selectedOption){
            ToastAndroid.show('select your budget',ToastAndroid.LONG)
            return;
        }
        router.push('/create-trip/review-trip');

    }
  return (
    <View style={{
        paddingTop:75,
        padding:25,
        backgroundColor:Colors.WHITE,
        height:'100%'
    }}>
      <Text style={{
        fontFamily:'outfit-bold',
        marginTop:20,
        fontSize:35
      }}>
        Budget
        </Text>

        <View style={{
            marginTop:20
        }}>

            <Text style={{
                fontFamily:'outfit-bold',
                fontSize:20

            }}>
                Choose spending habits for your trip
            </Text>

            <FlatList
            data={SelectBudgetOptions}
            renderItem={({item,index})=>(
                <TouchableOpacity style={{
                    marginVertical:10
                }}
                onPress={()=>setSelectedOption(item)}
                >
                    <OptionCard option={item} selectedOption={selectedOption}/>
                </TouchableOpacity>
            )}
            />
        </View>

        <TouchableOpacity
onPress={()=>onClickContinue()}
style={{
  padding:15,
  backgroundColor:Colors.LIGHT_GRAY,
  borderRadius:15,
  marginTop:20
}}>
  <Text style={{
    textAlign:'center',
    color:Colors.PRIMARY,
    fontFamily:'outfit-medium',
    fontSize:20
  }}>
    Continue
  </Text>
</TouchableOpacity>
    </View>
  )
}