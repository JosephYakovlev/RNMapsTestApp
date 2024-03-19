import TabBarIcon from '@/components/ExpoIcon';
import { IVehicle } from '@/Interfaces/IVehicle';
import { useQueryClient} from '@tanstack/react-query';
import { useLocalSearchParams } from 'expo-router'
import { StyleSheet, Text, View, TouchableOpacity, Linking } from 'react-native'
import MapView, { Marker } from 'react-native-maps';


const vehicle = () => {

  // Извлекаем переданное ID конкретного ТС
  const vehicleId = useLocalSearchParams<{vehicle: string}>()

  // Достаем стейт клиента tanstack query
  const queryClient = useQueryClient()

  // Достаем данные о ТС из стейта клиента
  const queryData: IVehicle[] | undefined = queryClient.getQueryData<IVehicle[]>(['Vehicles'])

  // Находим контретное ТС по id переданному в компонент
  const currentVehicle: IVehicle | undefined = queryData?.find((vehicle: IVehicle )=> vehicle.id === +vehicleId.vehicle)

  console.log(currentVehicle);
  

  // Если не нашли переданное конкретное ТС
  if(!currentVehicle) {
    return(
      <View style={{flex:1}}>
        <Text>
          ТС не найдено
        </Text>
      </View>
    )
  }



  // Звоним водителю
  const handleCall = () => {
    Linking.openURL(`tel:${currentVehicle.driverPhoneNumber}`).catch(e => alert(e))
  };




  // Отправляем сообщение в WhatsApp
  const handleWhatsApp = () => {

    // Сообщение которое будем отправлять
    let sendingMessage = "Добрый день, подскажите пожалуйста, какой номер заказа у вас сейчас в работе";

    // Составляем ссылку для перехода в WhaatsApp из сообщения для отправки и номера водителя из переданного ТС
    let url = "whatsapp://send?text=" + sendingMessage + "&phone=" + currentVehicle.driverPhoneNumber;

    // Открываем WhatsApp
    Linking.openURL(url).catch(e => alert(e))

  };

  
  return (
    <View style={{flex:1}}>

      {/* Контейнер с информацией о ТС и водителе, с кнопками позвонить и написать в WhatSapp */}
      <View style={styles.container}>
        <Text style={styles.vehicleIdText}>TC #{currentVehicle.id}</Text>
        <Text style={styles.сategoryText}>{currentVehicle.category}</Text>
        <Text style={styles.licensePlate}>{currentVehicle.licensePlateNumber}</Text>
        <Text style={styles.driverName}>{currentVehicle.driverName} {currentVehicle.driverSurname}</Text>
        

        <TouchableOpacity style={styles.button} onPress={handleCall}>
          <Text style={styles.buttonText}>Позвонить на телефон</Text>
        </TouchableOpacity>
        

        <TouchableOpacity style={[styles.button, { backgroundColor: '#25D366' }]} onPress={handleWhatsApp}>
          <Text style={[styles.buttonText, { color: '#fff' }]}>Написать в WhatsApp</Text>
        </TouchableOpacity>
      </View>
      

      {/* Компонент карты с маркером на карте в месте нахождения ТС по его геопозиции */}
      <MapView
          style={{flex: 1}}
          initialRegion={{
          ...currentVehicle.geoLocation,
          latitudeDelta: 0.2,
          longitudeDelta: 0.2,
          }}
      >    
          <Marker
            coordinate={currentVehicle.geoLocation}
            title={`#${currentVehicle.id}`}
            description={currentVehicle.driverName + ' ' + currentVehicle.driverSurname}
          >
            <TabBarIcon category={currentVehicle.category} color={'black'} />
          </Marker>
      </MapView>
    </View>
  )
}

export default vehicle

const styles = StyleSheet.create({
  container: {
    width:'100%',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginBottom: 5,
  },
  vehicleIdText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  сategoryText: {
    fontWeight: 'bold',
    fontSize: 12,
  },
  driverName: {
    fontSize: 16,
    marginTop: 5,
  },
  licensePlate: {
    fontSize: 12,
    color: '#888',
    marginTop: 5,
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
})



