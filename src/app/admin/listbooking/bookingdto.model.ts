export interface  BookingDTO {
    bookingId: number;
  
    // Thông tin cá nhân khách hàng
    name: string;
    age: number;
    phone: string;
    email: string;
  
    // Thông tin đặt chỗ
    seatNumber: number;
    bookingDate: Date;
    totalAmount: number;
    status: string;
  
    // Thông tin chuyến đi
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
  
  