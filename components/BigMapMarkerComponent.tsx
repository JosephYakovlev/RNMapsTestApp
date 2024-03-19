import { StyleSheet, Text, TouchableOpacity, Dimensions } from 'react-native'
import React, {memo} from 'react'
import { Marker, Callout} from 'react-native-maps';
import TabBarIcon from './ExpoIcon';
import { router } from 'expo-router';
import { IVehicle } from '@/Interfaces/IVehicle';

interface Props {
  vehicle: IVehicle;
}


// Компонент - маркер для большой карты с главного экрана index.ts
const BigMapMarkerComponent: React.FC<Props> = ({vehicle}) => {

  return (
    <Marker
      key={vehicle.id}
      coordinate={vehicle.geoLocation}
    >
      <TabBarIcon category={vehicle.category} color={'black'} />
      <Callout>
        <TouchableOpacity 
          style={styles.vehicleCallout}
          onPress={()=> 
            router.push({
              pathname: "/vehicles/[vehicle]",
              params: {vehicle: '1'} 
            })  
          }
        >
            <Text style={styles.vehicleIdText}>#{vehicle.id}</Text>
            <Text style={styles.vehicleIdText}>{vehicle.category}</Text>
            <Text style={styles.driverName}>{vehicle.driverName} {vehicle.driverSurname}</Text>
        </TouchableOpacity>
      </Callout>
    </Marker>

  )
}

export default memo(BigMapMarkerComponent)

const styles = StyleSheet.create({
  vehicleCallout:{
    width: Dimensions.get('window').width/2,
    height: 70,
    justifyContent: 'center'
  },
  vehicleIdText:{
    fontSize: 13,
    fontWeight: 'bold'
  },
  driverName:{
    fontSize: 13,
  }
})