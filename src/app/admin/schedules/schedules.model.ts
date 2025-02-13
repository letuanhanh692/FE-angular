export interface Schedule {
    id: number;
    routeId: string;
    departureTime: string; 
    arrivalTime: string;   
    availableSeats: number;
  }
  export interface Bus {
    id: number;
    busNumber: string;
  }
  
  export interface Route {
    id: number;
    startingPlace: string;
    destinationPlace: string;
  }