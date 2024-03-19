import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Checkbox from 'expo-checkbox';


interface Props {
    applyFilters: (selectedCategories: string[]) => void;
}
  
// Контейнер с чекбоксами для фильтра категорий ТС в шапке приложения
const FiltersBar: React.FC<Props> = ({ applyFilters }) => {
    
  // Состояние для хранения выбранных категорий
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);


  // Обработчик переключения выбора категории
  const handleCategoryToggle = (category: string) => {

    // Если категория уже выбрана, убираем ее из списка выбранных
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(item => item !== category));
    } else {
      // Если категория не выбрана, добавляем ее в список выбранных
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  // Обработчик применения выбранных фильтров
  const handleApplyFilters = () => {
    applyFilters(selectedCategories);
  };

  return (
    <View style={styles.container}>

      {/* Дабавляем Грузовые ТС в фильтры */}
      <TouchableOpacity style={styles.section} onPress={() => handleCategoryToggle('Грузовой')}>
        <Checkbox
          value={selectedCategories.includes('Грузовой')}
          onValueChange={() => handleCategoryToggle('Грузовой')}
        />
        <Text style={styles.paragraph}>Грузовые</Text>
      </TouchableOpacity>

      {/* Дабавляем Пассажирские ТС в фильтры */}
      <TouchableOpacity style={styles.section} onPress={() => handleCategoryToggle('Пассажирский')}>
        <Checkbox
          value={selectedCategories.includes('Пассажирский')}
          onValueChange={() => handleCategoryToggle('Пассажирский')}
        />
        <Text style={styles.paragraph}>Пассажир.</Text>
      </TouchableOpacity>

      {/* Дабавляем Специализированные ТС в фильтры */}
      <TouchableOpacity style={styles.section} onPress={() => handleCategoryToggle('Спецтранспорт')}>
        <Checkbox
          value={selectedCategories.includes('Спецтранспорт')}
          onValueChange={() => handleCategoryToggle('Спецтранспорт')}
        />
        <Text style={styles.paragraph}>Спец.</Text>
      </TouchableOpacity>


      {/* Кнопка "Применить" для применения выбранных фильтров */}
      <TouchableOpacity style={styles.applyButton} onPress={handleApplyFilters}>
        <Text style={styles.paragraph}>Применить</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 40,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
    borderTopColor: 'lightgrey',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '25%'
  },
  paragraph: {
    fontSize: 13,
    marginLeft: 5
  },
  applyButton: {
    width: '25%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightgreen',
    marginVertical: 0.5 
    
  }
});

export default FiltersBar