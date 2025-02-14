import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { BookingService,  } from '../../../service/booking.service';
@Component({
  selector: 'app-listbooking',
  standalone: true,
  imports: [RouterModule,HttpClientModule,FormsModule,CommonModule],
  templateUrl: './listbooking.component.html',
  styleUrl: './listbooking.component.css'
})
export class ListbookingComponent implements OnInit {
  bookings: any[] = []; 
  searchQuery: string = ''; 
  loading: boolean = false; 
  errorMessage: string | null = null; 
  currentPage: number = 1; 
  totalPages: number = 0; 

  constructor(private bookingService : BookingService, private router: Router) {}

  ngOnInit(): void {
    this.loadBookings();
  }
  
  loadBookings(): void {
    this.loading = true;
    this.errorMessage = null;
    this.bookingService.getBookings(this.currentPage)
      .subscribe(
        (reponse: any) => {
          console.log(reponse);
          this.bookings = reponse.bookings;
          this.totalPages = reponse.totalPages;
          this.loading = false;
        },
        (error: any) => {
          this.errorMessage = 'There was an error loading data.';
          this.loading = false;
        }
      );
  }

  searchBookings(): void {
    this.loading = true;
    this.errorMessage = null;
    this.bookingService.searchBookings(this.searchQuery, this.currentPage, 4).subscribe(
      (response: any) => {
        this.bookings = response.bookings; 
        this.totalPages = response.totalPages;
        this.loading = false;
      },
      (error: any) => {
        this.errorMessage = 'Search failed'; 
        this.loading = false;
      }
    );
  }
  

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadBookings();
    }
  }

  detailBooking(bookingId: number): void {
    this.router.navigate([`/admin/bookingdetail/${bookingId}`]);
  }

  updateBooking(bookingId: number): void {
    this.router.navigate([`/admin/editbooking/${bookingId}`]);
  }

  deleteBooking(bookingId: number): void {
    if (confirm('Are you sure you want to delete this booking?')) {
      this.bookingService.deleteBooking(bookingId).subscribe(
        () => {
          this.loadBookings(); 
        },
        (error: any) => {
          this.errorMessage = 'There was an error deleting the booking.';
        }
      );
    }
  }
}
