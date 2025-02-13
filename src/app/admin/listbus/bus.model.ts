export interface Bus {
    id: number;
    busNumber: string;
    busTypeId: number;
    totalSeats: number;
    imageBus?: string; 
    busType :BusType;
  }
  export interface BusType {
    id: number;
    typeName: string;
    description: string;
  }