import { View, Text, Image } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import { Colors } from '../../constants/Colors';
import { TouchableOpacity } from 'react-native';

export default function profile() {
  const router=useRouter();
  const navigation=useNavigation();

  useEffect(()=>{
    navigation.setOptions({
      headerShown:true,
      headerTransparent:true,
      headerTitle:''
    });
  },[]);

  return (
    <View style={{
      padding:25,
      paddingTop:55,
      backgroundColor:Colors.WHITE,
      height:'100%'

  }}>
    <View style={{
      display:'flex',
      flexDirection:'row',
      alignContent:'center',
      justifyContent:'space-between'
    }}>
      <Text style={{
        fontFamily:'outfit-bold',
        fontSize:35,
      }}> User Profile</Text>
    </View>
<View style={{
  marginTop:550
}}>
  <TouchableOpacity 
  onPress={()=>router.push('/auth/sign-in')}
  style={{
            backgroundColor:Colors.PRIMARY,
            padding:15,
            borderRadius:15,
            marginTop:10
        }}
        >
    <Text style={{
      fontSize:15,
      fontFamily:'outfit-medium',
      color:Colors.WHITE,
      textAlign:'center'
    }}>Log Out</Text>
  </TouchableOpacity>
</View>
    </View>
  )
}