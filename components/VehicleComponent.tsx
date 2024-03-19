import {  StyleSheet, Dimensions, Button, TouchableOpacity, Text, View, Pressable, FlatList} from 'react-native';
import { memo } from 'react';
import MapView, { Marker, Callout} from 'react-native-maps';
import TabBarIcon from '@/components/ExpoIcon';
import { router } from 'expo-router';
import { IVehicle } from '@/Interfaces/IVehicle';



interface Props {
  vehicle: IVehicle
}

// Я понимаю что отображать карту справа в каждом контенере убивает производительность,
// но выглядит красиво, и, возможно, стоило бы рассмотреть добавление функционала 
// отображения только скриншота карты, полученного с бэкенда, например.




// Компонент с информацией о ТС, его водителе и картой с его настоящим нахождением в правой половине контейнера
const VehicleComponent: React.FC<Props> = ({vehicle}) => {

    return(
    <TouchableOpacity 
        style={{ flex: 1, borderWidth: 1, flexDirection: 'row'}} 
        onPress={()=> 
            router.push({
              pathname: "/vehicles/[vehicle]",
              params: {vehicle: vehicle.id.toString()} 
            })  
        }
    >

        {/* Левая половина компонента с информацией о ТС */}
        <View style={{flex: 1, marginVertical: 10, paddingLeft: 10}}>
            <Text style={{fontWeight: 'bold'}}>TC #{vehicle.id}</Text>
            <Text style={{fontWeight: 'bold', fontSize: 11}}>{vehicle.category}</Text>
            <Text style={{fontSize: 11}}>{vehicle.licensePlateNumber}</Text>
            <Text>{vehicle?.driverName} {vehicle.driverSurname}</Text>
        </View>

        {/* Правая половина компонента с картой и местоположением ТС на ней */}
        <View style={{flex: 1}}>
            <MapView
                style={{flex: 1}}
                initialRegion={{
                ...vehicle.geoLocation,
                latitudeDelta: 0.2,
                longitudeDelta: 0.2,
                }}
                
            >    
                <Marker
                    coordinate={vehicle.geoLocation}
                    title={`#${vehicle.id}`}
                    description={vehicle?.driverName + ' ' + vehicle?.driverSurname}
                >
                    <TabBarIcon category={vehicle.category} color={'black'} />
                </Marker>
            </MapView>
        </View>

        
    </TouchableOpacity>
  )}

export default memo(VehicleComponent)


