import React from 'react'
import { StyleSheet, Text, View, SafeAreaView, Image } from 'react-native'
import tw from 'tailwind-react-native-classnames'
import NavOptions from '../components/NavOptions'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import {GOOGLE_MAPS_APIKEY} from '@env'
import { setDestination, setOrigin } from '../slices/navSlice'
import { useDispatch } from 'react-redux'
import NavFavorites from '../components/NavFavorites'

const HomeScreen = () => {
    const dispatch = useDispatch();

    return (
        <SafeAreaView style={tw`bg-white h-full`}>
            <View style={tw`p-5`}>
                <Image 
                    style={{
                        width: 100, height:100, resizeMode:'contain'
                    }}
                    source={{uri: "https://links.papareact.com/gzs"}}
                />
                <GooglePlacesAutocomplete 
                    textInputProps={{
                        autoCorrect:false
                    }}
                    styles={{
                        container:{
                            flex:0
                        },
                        textInput:{
                            fontSize:18
                        }
                    }}
                    currentLocation={true}
                    onFail={(e) => {
                        console.log(e)
                    }}
                    
                    minLength={3}
                    enablePoweredByContainer={false}
                    placeholder='Where From?'
                    nearbyPlacesAPI='GooglePlacesSearch'
                    debounce={400}
                    fetchDetails={true}
                    onPress={(data, details = null) => {
                        dispatch(setOrigin({
                            location: details.geometry.location,
                            description:data.description
                        }))
                        dispatch(setDestination(null));
                    }}
                    query={{
                        key: GOOGLE_MAPS_APIKEY,
                        language: 'en'
                    }}
                />
                <NavOptions/>
                <NavFavorites />
            </View>
            
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})
