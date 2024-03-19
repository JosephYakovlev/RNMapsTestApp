// Интейрфейс Транспортного Средства из базы данных

export interface IVehicle {
    id: number;
    category: string;
    driverName: string;
    driverSurname: string;
    driverPhoneNumber: number;
    licensePlateNumber: string;
    geoLocation: {
        latitude: number, 
        longitude: number
    }
  }