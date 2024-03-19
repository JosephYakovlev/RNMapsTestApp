
import FontAwesome from '@expo/vector-icons/FontAwesome';



interface TabBarIconProps {
  category: string;
  color: string;
}

// Получаем иконку из FontAwesome по переданному имени и цвету
const TabBarIcon: React.FC<TabBarIconProps> = (props) => {

  // Функция для преобразования имен
  const translateName = (category: string) => {
    switch (category) {
      case 'Грузовой':
        return 'truck';
      case 'Пассажирский':
        return 'bus';
      case 'Спецтранспорт':
        return 'ambulance';
      default:
        return 'truck';
    }
  };

  // Возвращаем иконку из FontAwesome
  return (
    <FontAwesome
      size={28}
      style={{ marginBottom: -3 }}
      name={translateName(props.category)}
      color={props.color} 
    />
  )
}


export default TabBarIcon;