import { IVehicle } from "@/Interfaces/IVehicle";
import {useQuery} from "@tanstack/react-query"


// создаем хук useGetPosts для получения списка транспортных средств
const useGetPosts = () => {

    // Функция для загрузки данных о ТС
    const fetchPosts = async () => {
                 
        // Имитируем асинхронный запрос с базы данных
        const data = await new Promise<IVehicle[]>((resolve, reject) => {
            try {
                const fileData = require('./VehicleData.json');
                resolve(fileData);
            } catch (error) {
                reject(error); 
            }
        })
        .then(data => data)
        .catch(e => {
            console.error(e.message);
            return [];
        })

        // Возвращаем полученные данные
        return data
    }

    // Используем useQuery хук (библиотеки tanstack/react-query) для возвращенния данных и работы со стейтом QueryClient 
    return useQuery({
        queryKey: ['Vehicles'],
        queryFn: () => fetchPosts(),
    })
}

export default useGetPosts
