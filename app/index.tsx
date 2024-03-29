import { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, useCallback } from 'react-native';
import MapView from 'react-native-maps';
import useGetPosts from '@/api/useGetPosts';
import VehicleComponent from '@/components/VehicleComponent';
import ViewModeBar from '@/components/ViewModeBar';
import FiltersBar from '@/components/FiltersBar';
import BigMapMarker from '@/components/BigMapMarkerComponent';
import FlatListFooterContainer from '@/components/FlatListFooterContainer';


export default function HomePage() {

  const {data, isLoading, refetch} = useGetPosts() // получаем данные из мок бд с помощью useQuery 
  const [filteredData, setFilteredData] = useState(data); // отфильтрованные данные из мок базы данных
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');  //  выбираем режим отображения полученных ТС (список или карта)
  
  const flatListRef = useRef<FlatList>(null)
  const goToFlatlistTop = () => {
    flatListRef.current?.scrollToIndex({
      index: 0,
      animated: true,
    })
  }

  // Устанавливаем состояние фильтров filteredData для списка ТС
  const applyFilters = (selectedCategories: string[]) => {
   
    // Если не выбрана ни одна категория, это можно считать как если выбраны все категории
    if (selectedCategories.length === 0) {
      return setFilteredData(data);
    }
    // Фильтруем по категориям
    const newData = data?.filter(vehicle => selectedCategories.includes(vehicle.category));
    return setFilteredData(newData);
  };


  // Устанавливается каким будет режим отображения (список или карта)
  const handleViewModeChange = (mode: 'list' | 'map') => {
    setViewMode(mode);
  };


  if(isLoading){
    return <ActivityIndicator size="large" color="#0000ff" />
  }

  if(!data && !filteredData){
    return (
      <View style={{flex: 1}}>
        <Text>
          Данные не обнаружены
        </Text>
      </View>
    )
  }


  const renderingVehicleComponent = useCallback(({ item }: { item: IVehicle }) => (
      <VehicleComponent vehicle={item} />
  ), []);

  
  
  return (
    <View style={styles.container}>

      {/* Компонент для переключения режима просмотра */}
      <ViewModeBar viewMode={viewMode} onViewModeChange={handleViewModeChange} /> 

      {/* Компонент для применения фильтров */}
      <FiltersBar applyFilters={applyFilters} />
    
      {/* Если выбран режим списка, отображаем FlatList с транспортными средствами */}
      {viewMode === 'list' &&
          <FlatList 
            ref={flatListRef}
            data={filteredData ?? data}
            keyExtractor={(vehicle) => vehicle.id.toString()}
            numColumns={1}
            onRefresh={refetch}
            refreshing={isLoading}
            contentContainerStyle={{ gap: 5, padding: 5, paddingBottom: 40 }}
            renderItem={renderingVehicleComponent}
            ListFooterComponent={()=> <FlatListFooterContainer goToFlatlistTop={goToFlatlistTop}/>}
            onScrollToIndexFailed={(e) => alert(`Ошибка возврата, index: ${e.index}`)}
          />
      } 

      {/* Если выбран режим карты, отображаем MapView с маркерами транспортных средств */} 
      {viewMode === 'map' &&  
        <MapView 
          style={{flex: 1}} 
          initialRegion={{
            latitude: 45.1,
            longitude: 34.3,
            latitudeDelta: 2.5,
            longitudeDelta: 2.5,
          }}
        >
          {(filteredData ?? data)?.map(vehicle => 
            <BigMapMarker 
              key={vehicle.id}
              vehicle={vehicle} 
            />
          )}
        </MapView>
      }

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
