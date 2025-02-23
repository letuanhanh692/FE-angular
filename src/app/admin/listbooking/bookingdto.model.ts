export interface  BookingDTO {
    bookingId: number;
  
    name: string;
    age: number;
    phone: string;
    email: string;
  
    seatNumber: number;
    bookingDate: Date;
    totalAmount: number;
    status: string;
  
    busNumber: string;
    busType: string;
    departTime: Date;
    arrivalTime: Date;
    startingPlace: string;
    destinationPlace: string;
    distance: number;
    userId: number;
    scheduleId: number;
  
  }
  export interface Booking {
    id: number;
    name: string;
  }
  
  