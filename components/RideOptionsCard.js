import React, {useState} from 'react'
import { FlatList,Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import tw from 'tailwind-react-native-classnames'
import { Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { selectTravelTimeInformation } from '../slices/navSlice'
import { useSelector } from 'react-redux'

const data = [
    {
        id: 'Uber-X-123',
        title: 'UberX',
        multiplier:1,
        image: 'https://links.papareact.com/3pn',
    },
    {
        id: 'Uber-XL-456',
        title: 'Uber XL',
        multiplier:1.2,
        image: 'https://links.papareact.com/5w8',
    },
    {
        id: 'Uber-LUX-789',
        title: 'Uber LUX',
        multiplier:1.75,
        image: 'https://links.papareact.com/7pf',
    },

]

//SURGE PRICING
const SURGE_CHARGE_RATE = 1.5

const RideOptionsCard = () => {
    const navigation = useNavigation()
    const [selected, setSelected] = useState(null)
    const travelTimeInformation = useSelector(selectTravelTimeInformation)

    return (
        <View edges={['bottom']} style={tw`bg-white flex-grow`}>
            <View>
                <TouchableOpacity 
                    onPress={()=>navigation.navigate('NavigateCard')}
                    style={tw`absolute top-3 left-5 p-3 rounded-full z-10`}
                >
                    <Icon name='chevron-left' type='fontawesome'/>
                </TouchableOpacity>
                <Text style={tw`text-center py-5 text-xl`}>Select a Ride - {travelTimeInformation?.distance?.text}</Text>
            </View>
            <FlatList 
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={({item: {id, title, multiplier, image}, item}) => (
                    <TouchableOpacity
                        onPress={()=>setSelected(item)}
                        style={tw`flex-row justify-between items-center px-10 ${id === selected?.id && 'bg-gray-200'}`}
                    >
                        <Image
                            style={{
                                width:100,
                                height:100,
                                resizeMode:'contain'
                            }}
                            source={{uri:image}}
                        />
                        <View style={tw`-ml-6`}>
                            <Text style={tw`text-xl font-bold`}>{title}</Text>
                            <Text>{travelTimeInformation?.duration?.text} Travel Time</Text>
                        </View>
                        <Text style={tw`text-xl`}>
                            {new Intl.NumberFormat('en-gb', {
                                style: 'currency',
                                currency: 'SGD',
                                currencyDisplay: 'narrowSymbol'
                                
                            }).format(
                                (travelTimeInformation?.duration.value * SURGE_CHARGE_RATE * multiplier)/100
                            )}

                        </Text>
                    </TouchableOpacity>
                )}
                ListFooterComponent={()=> (
                    <SafeAreaView edges={['bottom']}  style={[tw`mt-auto border-t border-gray-200`, {paddingBottom:50}]}>
                        <TouchableOpacity disabled={!selected} style={tw`bg-black py-3 m-3 ${!selected && 'bg-gray-300'}`}>
                            <Text style={tw`text-center text-white text-xl`}>Choose {selected?.title}</Text>
                        </TouchableOpacity>
                    </SafeAreaView>
                )}
            />
            

        </View>
    )
}

export default RideOptionsCard

const styles = StyleSheet.create({})
