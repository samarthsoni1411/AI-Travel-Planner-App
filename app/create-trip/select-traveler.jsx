// import { View, Text, FlatList, TouchableOpacity } from 'react-native';
// import React, { useContext, useEffect, useState } from 'react';
// import { useNavigation } from '@react-navigation/native';  // React Navigation's hook
// import { Colors } from '../../constants/Colors';
// import { selectTravelesList } from './../../constants/Options';
// import { CreateTripContext } from '../../context/CreateTripContext';
// import OptionCard from '../../components/CreateTrip/OptionCard';

// export default function SelectTraveler() {
//   const navigation = useNavigation();
//   const [selectedTraveler, setSelectedTraveler] = useState();
//   const { tripData, setTripData } = useContext(CreateTripContext);

//   useEffect(() => {
//     navigation.setOptions({
//       headerShown: true,
//       headerTransparent: true,
//       headerTitle: '',
//     });
//   }, []);

//   useEffect(() => {
//     setTripData({
//       ...tripData,
//       traveler: selectedTraveler,
//     });
//   }, [selectedTraveler]);

//   return (
//     <View
//       style={{
//         flex: 1, // To ensure the button is fixed at the bottom
//         backgroundColor: Colors.WHITE,
//         paddingHorizontal: 30,
//       }}
//     >
//       <Text
//         style={{
//           fontSize: 30,
//           fontFamily: 'outfit-bold',
//           marginBottom: 15,
//           marginTop: 20,
//         }}
//       >
//         Who's Traveling
//       </Text>

//       <Text
//         style={{
//           fontSize: 20,
//           fontFamily: 'outfit-bold',
//           marginBottom: 20,
//         }}
//       >
//         Choose Your Traveler
//       </Text>

//       <FlatList
//         data={selectTravelesList}
//         renderItem={({ item }) => (
//           <TouchableOpacity onPress={() => setSelectedTraveler(item)}>
//             <OptionCard option={item} selectedTraveler={selectedTraveler} />
//           </TouchableOpacity>
//         )}
//         keyExtractor={(item) => item.id}
//         contentContainerStyle={{ paddingBottom: 100 }} // Padding to avoid overlap with the button
//       />

//       {/* Continue Button fixed at the bottom */}
//       <TouchableOpacity
//         style={{
//           position: 'absolute',
//           bottom: 20,
//           left: 25,
//           right: 25,
//           padding: 15,
//           backgroundColor: 'black', // Black background
//           borderRadius: 15,
//         }}
//         onPress={() => navigation.navigate('SelectDates')} // Updated navigation to use React Navigation
//       >
//         <Text
//           style={{
//             textAlign: 'center',
//             color: 'white', // White text
//             fontFamily: 'outfit-medium',
//             fontSize: 20,
//           }}
//         >
//           Continue
//         </Text>
//       </TouchableOpacity>
//     </View>
//   );
// }
import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router, useNavigation } from 'expo-router'
import { Colors } from '../../constants/Colors';
import { selectTravelesList } from './../../constants/Options';
import { TouchableOpacity } from 'react-native';
import { useContext } from 'react';
import { CreateTripContext } from '../../context/CreateTripContext';
import OptionCard from './../../components/CreateTrip/OptionCard';



export default function SelectTraveler() {


  const navigation=useNavigation();
  const [selectedTraveler,setSelectedTraveler]=useState();
  const { tripData, setTripData } = useContext(CreateTripContext);




  useEffect(()=>{
    navigation.setOptions({
      headerShown:true,
      headerTransparent:true,
      headerTitle:''
    })
  },[])

  useEffect(()=>{
setTripData({...tripData,
  traveler:selectedTraveler
})
  },[selectedTraveler]);

  useEffect(()=>{
console.log(tripData);
  },[tripData])
  return (
    <View style={{
      padding:25,
      paddingTop:75,
      backgroundColor:Colors.WHITE,
      height:'100%'
    }}>
      <Text style={{
        fontSize:35,
        fontFamily:'outfit-bold',
        marginTop:20
      }}>Who's Traveling</Text>

      <View style={{
        marginTop:20
      }}>
        <Text style={{
          fontFamily:'outfit-bold',
          fontSize:23
        }}>Choose your traveles</Text>

        <FlatList
        data={selectTravelesList}
        renderItem={({item,index})=>(
          <TouchableOpacity
          onPress={()=>setSelectedTraveler(item)}
          style={{
            marginVertical:10
          }}>
            <OptionCard option={item} selectedOption={selectedTraveler}/>

          </TouchableOpacity>
        )}
        
        />
      </View>
<TouchableOpacity
onPress={()=>router.push('/create-trip/select-dates')}
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
