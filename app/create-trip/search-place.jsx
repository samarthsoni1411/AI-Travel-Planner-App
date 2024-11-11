// import { View, Text } from 'react-native';
// import React, { useContext, useEffect } from 'react';
// import { useNavigation, useRouter } from 'expo-router';
// import { Colors } from '../../constants/Colors';
// import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
// import { CreateTripContext } from './../../context/CreateTripContext';

// export default function SearchPlace() {
//     const navigation = useNavigation();
//     const { tripData, setTripData } = useContext(CreateTripContext);
//     const router = useRouter();

//     // Set up navigation options
//     useEffect(() => {
//         navigation.setOptions({
//             headerShown: true,
//             headerTransparent: true,
//             headerTitle: 'Search',
//         });
//     }, [navigation]); // Added navigation to dependency array

//     // Log tripData whenever it changes
//     useEffect(() => {
//         console.log("Trip Data:", tripData);
//     }, [tripData]);

//     return (
//         <View 
//             style={{
//                 padding: 25,
//                 paddingTop: 75,
//                 backgroundColor: Colors.WHITE,
//                 height: '100%',
//             }}
//         >
//             <GooglePlacesAutocomplete
//                 placeholder='Search Place'
//                 fetchDetails={true}
//                 onPress={(data, details = null) => {
//                     // 'details' is provided when fetchDetails = true
//                     const locationInfo = {
//                         name: data.description,
//                         coordinates: details?.geometry.location,
//                         photoRef: details?.photos ? details.photos[0]?.photo_reference : null,
//                         url: details?.url || null,
//                     };

//                     // Update the trip data context
//                     setTripData(prevData => ({
//                         ...prevData, // Maintain existing tripData
//                         locationInfo,
//                     }));

//                     // Navigate to the next screen
//                     router.push('/create-trip/select-traveler');
//                 }}
//                 query={{
//                     key: process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY,
//                     language: 'en',
//                 }}
//                 styles={{
//                     textInputContainer: {
//                         borderWidth: 1,
//                         borderRadius: 5,
//                         marginTop: 25,
//                     },
//                 }}
//             />
//         </View>
//     );
// }

// import { View, Text } from 'react-native'
// import React, { useEffect } from 'react'
// import { useNavigation, useRouter } from 'expo-router'
// import { Colors } from '../../constants/Colors';
// import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
// import { useContext } from 'react';
// import { CreateTripContext } from '../../context/CreateTripContext';


// export default function SearchPlace() {

//   const navigation=useNavigation();
//   const {tripData,setTripData}=useContext(CreateTripContext);
//   const router=useRouter();
//   useEffect(()=>{
//     navigation.setOptions({
//       headerShown:true,
//       headerTransparent:true,
//       headerTitle:'Search'
//     })
//   },[]);

// useEffect(()=>{
// console.log(tripData);
// }),[tripData]

//   return (
//     <View 
//     style={{
//       padding:25,
//       paddingTop:75,
//       backgroundColor:Colors.WHITE,
//       height:'100%'
//     }}
//     >

    
//        <GooglePlacesAutocomplete
      
//       placeholder='Search Place'
//       fetchDetails={true}
//       onPress={(data, details = null) => {
//         // 'details' is provided when fetchDetails = true
//         console.log(data.description);
//         console.log(details?.geometry.location);
//         console.log(details?.photos[0]?.photo_reference);
//         console.log(details?.url);
//         setTripData({
//           locationInfo:{
//             name:data.description,
//             coordinates:details?.geometry.location,
//             photoRef:details?.photos[0]?.photo_reference,
//             url:details?.url
//           }
//         });

// router.push('/create-trip/select-traveler')

//       }}
//       query={{
//         key: process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY,
//         language: 'en',
//       }}
//       styles={{
//         textInputContainer:{
//           borderWidth:1,
//           borderRadius:5,
//           marginTop:25
//         }
//       }}
      
//     />
//     </View>
//   )
// }


// import { View } from 'react-native';
// import React, { useEffect } from 'react';
// import { useNavigation } from 'expo-router';
// import { Colors } from '../../constants/Colors';
// import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
// import { useContext } from 'react';
// import { CreateTripContext } from '../../context/CreateTripContext';

// export default function SearchPlace() {
//   const navigation = useNavigation();
//   const { tripData, setTripData } = useContext(CreateTripContext);

//   useEffect(() => {
//     navigation.setOptions({
//       headerShown: true,
//       headerTransparent: true,
//       headerTitle: 'Search'
//     });
//   }, []);

//   useEffect(() => {
//     console.log(tripData);
//   }, [tripData]);

//   return (
//     <View
//       style={{
//         padding: 25,
//         paddingTop: 75,
//         backgroundColor: Colors.WHITE,
//         height: '100%'
//       }}
//     >
//       <GooglePlacesAutocomplete
//         placeholder="Search Place"
//         fetchDetails={true}
//         onPress={(data, details = null) => {
//           console.log('Place Data:', data.description);
//           console.log('Coordinates:', details?.geometry.location);
//           console.log('Photo Reference:', details?.photos?.[0]?.photo_reference);
//           console.log('Place URL:', details?.url);

//           // Update tripData state with location info
//           setTripData({
//             locationInfo: {
//               name: data.description,
//               coordinates: details?.geometry.location,
//               photoRef: details?.photos?.[0]?.photo_reference,
//               url: details?.url
//             }
//           });
//         }}
//         query={{
//           key: process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY, // Ensure API key is set correctly
//           language: 'en',
//         }}
//         styles={{
//           container: {
//             flex: 0,
//           },
//           textInputContainer: {
//             borderWidth: 1,
//             borderRadius: 5,
//             marginTop: 25,
//           },
//           textInput: {
//             height: 38,
//             color: '#5d5d5d',
//             fontSize: 16,
//           },
//           listView: {
//             backgroundColor: 'white',
//           },
//         }}
//         enablePoweredByContainer={false} // Optionally disable the powered-by Google logo
//         debounce={200} // Debounce the requests to optimize API calls
//         nearbyPlacesAPI="GooglePlacesSearch" // Optional: Add Nearby Places API
//       />
//     </View>
//   );
// }
import { View, Text, TextInput, Button } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation, useRouter } from 'expo-router';
import { Colors } from '../../constants/Colors';
import { useContext } from 'react';
import { CreateTripContext } from '../../context/CreateTripContext';

export default function SearchPlace() {
  const navigation = useNavigation();
  const { tripData, setTripData } = useContext(CreateTripContext);
  const [location, setLocation] = useState('');
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: 'Search',
    });
  }, []);

  const handleLocationSubmit = () => {
    // Manually setting location info based on the input
    setTripData({
      locationInfo: {
        name: location,
        coordinates: null, // No coordinates available without Google API
        photoRef: null,     // No photo reference without Google API
        url: null,          // No URL without Google API
      },
    });

    // Navigate to the next screen
    router.push('/create-trip/select-traveler');
  };

  return (
    <View
      style={{
        padding: 25,
        paddingTop: 75,
        backgroundColor: Colors.WHITE,
        height: '100%',
      }}
    >
      <TextInput
        placeholder='Enter Place Name'
        value={location}
        onChangeText={setLocation}
        style={{
          borderWidth: 1,
          borderRadius: 5,
          padding: 10,
          marginTop: 25,
        }}
      />

      {/* Wrap the button label text inside <Text> */}
      <View style={{ marginTop: 20 }}>
        <Button
          title="Next"  // Ensure that this string is valid
          onPress={handleLocationSubmit}
          disabled={!location} // Disable button if no location is entered
        />
      </View>
    </View>
  );
}
