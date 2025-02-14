import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-bookingdetail',
  standalone: true,
  imports: [HttpClientModule,FormsModule,CommonModule,RouterModule],
  templateUrl: './bookingdetail.component.html',
  styleUrl: './bookingdetail.component.css'
})
export class BookingdetailComponent implements OnInit {
  booking: any = {
    userId: 0,
    scheduleId: 0,
    name: '',
    age: 0,
    phone: '',
    email: '',
    seatNumber: 0,
    bookingDate: null,
    totalAmount: 0,
    status: '',
    busNumber: '',
    startingPlace: '',
    destinationPlace: '',
    departureTime: null,
    arrivalTime: null
  };

  errorMessage: string | null = null;

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const bookingId = this.route.snapshot.paramMap.get('id');
    if (bookingId) {
      this.fetchBookingDetails(bookingId);
    } else {
      this.errorMessage = 'No booking information found.';
    }
  }

  fetchBookingDetails(bookingId: string): void {
    this.http.get<any>(`https://localhost:44311/api/Bookings/${bookingId}`).subscribe(
      (response) => {
        this.booking = response;
      },
      (error) => {
        this.errorMessage = 'No booking information found.';
      }
    );
  }

  onCancel(): void {
    this.router.navigate(['/admin/listbooking']); 
  }
}
