import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { FC, useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View,  ActivityIndicator,  TouchableOpacity } from 'react-native';

type ThrottleProps = {
  callbacks: (() => void)[];
  delay: number;
};

// хук useThrottle который принимает в себя массив функций, которые нужно вызвать и задержку
const useThrottle = ({ callbacks, delay }: ThrottleProps) => {
  const [lastCallTime, setLastCallTime] = useState(0);

  const throttledCallbacks = useCallback(
    () => {
      const currentTime = Date.now();
      if (currentTime - lastCallTime >= delay) {
        callbacks.forEach((callback) => callback());
        setLastCallTime(currentTime);
      }
    },
    [callbacks, delay, lastCallTime]
  );

  return throttledCallbacks;
};


const URL = "https://jsonplaceholder.typicode.com/users";

type Company = {
  bs: string;
  catchPhrase: string;
  name: string;
};

type User = {
  id: number;
  email: string;
  name: string;
  phone: string;
  username: string;
  website: string;
  company: Company;
  address: any;
};

type UserPromiseResult = {
  status: 'fulfilled';
  value: User;
}

type userContainerProps = {
  user: User
}

type ButtonProps = {
  handleNextUser: () => void;
}

const UserCard: FC<userContainerProps> = ({user}) => {
  return (
    <View style={styles.card}>
      <Text style={styles.text}>Name: {user.name}</Text>
      <Text style={styles.text}>Username: {user.username}</Text>
      <Text style={styles.text}>Email: {user.email}</Text>
      <Text style={styles.text}>Phone number: {user.phone}</Text>
    </View>
  );
}


const NextUserButton: FC<ButtonProps> = ({handleNextUser}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={handleNextUser}>
      <Text style={styles.buttonText}>Next user</Text>
    </TouchableOpacity>
  );
}


export default function TestTask() {


  // для кеша я бы использовал TanStack Query или ReduxToolKit, костыли лепить не особо хочется
  const [users, setUsers] = useState<User[]>(); 
  const [counter, setCounter] = useState(0);
  const [lastPressTime, setLastPressTime] = useState(0);


  // Функция для кнопки 
  const handleNextUser = () => {
    if (users && counter >= users.length - 1) {
      setUsers(undefined);
      setCounter(0);
      fetchRandomUsersWithPromisses();
    } else {
      setCounter(counter + 1);
    }
  }

  const handlePress = useThrottle({
    callbacks: [handleNextUser],
    delay: 1500,
  });
  
  // загружаем пользователей при первом рендере
  useEffect(() => {
    fetchRandomUsersWithPromisses();
  }, []);


  // Идеальное решение с кешем, с плейсхолдером и c возможностью отслеживания состояния запроса и т. д.

    const useGetUsers = () => {
      const fetchUserPosts = async () => {
          try {
              const randomIds = Array.from({ length: 10 }, () => Math.floor(Math.random() * (10 - 1)) + 1);
              const response = await axios.post(URL, { ids: randomIds });

              if (!response.data) {
                  throw new Error('No data received from the server');
              }

              return response.data;
          } catch (error:any) {
              console.error(error.message);
              return [];
          }
      }
      return useQuery({
          queryKey: ['users'], // по этому ключу сохранится кеш
          queryFn: fetchUserPosts,
          placeholderData: [{user: 'наш пользователь'}]
      });
    };

    const {data, isLoading, refetch } = useGetUsers()
  

 
// в случае если можно отправить в body список id

const fetchRandomUsersWithBody = useCallback(async () => {
  const randomIds = Array.from({ length: 10 }, () => Math.floor(Math.random() * (10 - 1)) + 1);

  try {
    const response = await fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ids: randomIds }),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch users. Status: ${response.status}`);
    }

    const users: User[] = await response.json();
    setUsers(users);
  } catch (error) {
    console.error('Error fetching users:', error);
  }
}, []);


// в случае если можно запрашивать только по 1 id

const fetchRandomUsersWithPromisses = useCallback(() => {

  const randomIds = Array.from({ length: 10 }, () => Math.floor(Math.random() * (10 - 1)) + 1);

  const fetchPromises = randomIds.map(async id => {
    try {
      const response = await fetch(`${URL}/${id}`);
      if (!response.ok) {
        throw new Error(`Ошибка запроса пользователя с id:${id}`);
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      return null;
    }
  });

  Promise.allSettled(fetchPromises)
  .then((results) => {
    const users: User[] = results
      .filter(result => result.status === 'fulfilled' && result.value !== undefined) 
      .map(result => (result as UserPromiseResult).value); 

      setUsers(users)
    });
  
  },[])


  // Placeholder на время загрузки пользователей

  if(!users){
    return (
      <View style={styles.container}> 
        <Text style={styles.textTitle}> 
          Загружаем пользователей
        </Text> 
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    )
  }

  
 

  return (
    <View style={styles.container}>
      <Text style={styles.textTitle}>Random user #{counter+1} from 10</Text>

      <UserCard user={users[counter]}/>

      <NextUserButton handleNextUser={handlePress} />
    </View>
  );
}
  


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10, 
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  text: {
    fontSize: 16,
    marginBottom: 8,
  },  
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  textTitle: {
    color: 'grey',
    fontSize: 16,
    marginBottom: 10,
    alignSelf: 'center'
  }
});
