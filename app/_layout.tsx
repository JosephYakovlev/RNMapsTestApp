import { Link, Stack } from "expo-router"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Text } from 'react-native';
const queryClient = new QueryClient()

const RootLayout = () => {

  return( 

    // Провайдер стейта QueryClient (библиотеки tanstack/react-query) 
    <QueryClientProvider client={queryClient}>

        <Stack>
            {/* Стартовый экран, со списком и картой ТС */}                     
            <Stack.Screen 
              name="index" 
              options={{
                headerShown: true, 
                headerTitle: 'Главная', 
                headerRight: () => (
                  <Link href="/settingsPage">
                    <Text style={{ color: 'black', fontSize: 12 }}>
                      Настройки
                    </Text>
                  </Link>
                )
              }} 
            />

            {/* Экран с информацией о конкретном ТС */}       
            <Stack.Screen 
              name="vehicles/[vehicle]" 
              options={{
                headerShown: true, 
                headerTitle: 'Информация о ТС',
                headerRight: () => (
                  <Link href="/settingsPage">
                    <Text style={{ color: 'black', fontSize: 12 }}>
                      Настройки
                    </Text>
                  </Link>
                )
              }}
            />

            {/* Экран с настройками */}     
            <Stack.Screen 
              name="settingsPage" 
              options={{
                headerShown: true, 
                headerTitle: 'Настройки'
              }}
            />        
        </Stack> 
    </QueryClientProvider>
  )
}

export default RootLayout