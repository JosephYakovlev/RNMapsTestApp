import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

type Props = {
  viewMode: 'list' | 'map';
  onViewModeChange: (mode: 'list' | 'map') => void;
};

// Контейнер с кнопками переключения режима отображения ТС со списка на карту в шапке приложения
const ViewModeBar = (props: Props) => {
  return (
    <View style={styles.container}>

      {/* Переключение на режим списка */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => props.onViewModeChange('list')}
      >
        <Text style={{ 
            color: props.viewMode === 'list' ? 'blue' : 'grey' 
        }}>
            Список
        </Text>
      </TouchableOpacity>

      {/* Переключение на режим карты */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => props.onViewModeChange('map')}
      >
        <Text style={{ 
            color: props.viewMode === 'map' ? 'blue' : 'grey' 
        }}>
            Карта
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white'
  },
  button: {
    width: '50%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ViewModeBar;
