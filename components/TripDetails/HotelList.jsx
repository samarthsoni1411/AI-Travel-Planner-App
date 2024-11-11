import { View, Text, FlatList, Image } from 'react-native'
import React from 'react'

export default function HotelList({hotelList}) {
  return (
    <View style={{
        marginTop:25
    }}>
      <Text style={{
        fontFamily:'outfit-bold',
        fontSize:20
      }}>🏨 Hotel Recommendation</Text>

      <FlatList 
      style={{
        marginTop:8
      }}
      data={hotelList}
      showsHorizontalScrollIndicator={false}
      horizontal={true}
      renderItem={({item,index})=>(
        <View style={{
            marginRight:20,
            width:180,
            borderRadius:15
            
        }}>
            <Image source={require('./../../assets/images/hotel.jpg')}
            style={{
                width:180,
                height:120,
                borderRadius:15
            }}
            />
            <View style={{
             padding:5   
            }}>
<Text style={{
    fontFamily:'outfit-medium',
    fontSize:17
}}>{item.name}</Text>
<View style={{
    display:'flex'
}}>
    <Text style={{
        fontFamily:'outfit'
    }}>
    🌟 {item.rating}
    </Text>
    <Text style={{
        fontFamily:'outfit'
    }}>
    💰 {item.price}
    </Text>
</View>
            </View>
        </View>
      )}
      />
    </View>
  )
}