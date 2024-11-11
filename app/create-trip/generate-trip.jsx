import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '../../constants/Colors'
import { Image } from 'react-native'
import { useContext } from 'react'
import { CreateTripContext } from '../../context/CreateTripContext'
import { AI_PROMPT } from '../../constants/Options'
import { chatSession } from '../../configs/AiModal'
import { useRouter } from 'expo-router'
import {auth,db} from './../../configs/FirebaseConfig'
import { doc, setDoc } from 'firebase/firestore'

export default function GenerateTrip() {

    const {tripData,setTripdata}=useContext(CreateTripContext);
    const [loading,setLoading]=useState(false);
    const router=useRouter();
    const user=auth.currentUser;

useEffect(()=>{
    GenerateAiTrip()
},[])
    const GenerateAiTrip=async()=>{
        try {
        setLoading(true);
        const FINAL_PROMPT=AI_PROMPT
        .replace('{location}',tripData?.locationInfo?.name)
        .replace('{totalDays}',tripData?.totalNoOfDays)
        .replace('{totalNight}',tripData.totalNoOfDays-1)
        .replace('{traveler}',tripData.traveler?.title)
        .replace('{budget}',tripData.budget)
        .replace('{totalDays}',tripData?.totalNoOfDays)
        .replace('{totalNight}',tripData.totalNoOfDays-1)
        console.log(FINAL_PROMPT);

        const result = await chatSession.sendMessage(FINAL_PROMPT);
    console.log(result.response.text());
    const tripResp=JSON.parse(await result.response.text());

    const docId=(Date.now()).toString();
    const result_=await setDoc(doc(db,"UserTrips",docId),{
        userEmail: user.email,
        tripPlan: tripResp,//AI Result
        tripData:JSON.stringify(tripData),//User Selection Data
        docId:docId
       
        
    });
    setLoading(false);
    
    router.push('(tabs)/mytrip');
    
    }

    catch (error) {
        setLoading(false);
        console.error("Error generating trip or saving data: ", error);
      }
    };

  return (
    <View style={{
        padding:25,
        paddingTop:75,
        backgroundColor:Colors.WHITE,
        height:'100%'

    }}>
      <Text style={{
        fontFamily:'outfit-bold',
        fontSize:35,
        textAlign:'center'
      }}>Please Wait...</Text>

<Text style={{
        fontFamily:'outfit-medium',
        fontSize:20,
        textAlign:'center',
        marginTop:40
      }}>We are working to generate your dream trip</Text>

      <Image source={require('./../../assets/images/travel-5360_512.gif')}
      style={{
      width:'100%',
      height:250,
      objectFit:'contain'
      }}
      />

      <Text style={{fontFamily:'outfit',fontSize:20,color:Colors.GRAY,textAlign:'center'}}>Do not Go back</Text>
    </View>
  )
}