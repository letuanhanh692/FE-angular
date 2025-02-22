import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-editbooking',
  standalone: true,
  imports: [HttpClientModule, CommonModule, FormsModule, RouterModule],
  templateUrl: './editbooking.component.html',
  styleUrl: './editbooking.component.css'
})
export class EditbookingComponent implements OnInit {
  booking: any = {
    bookingId: 0,
    userId: 0,
    scheduleId: 0,
    name: '',
    age: 0,
    phone: '',
    email: '',
    status: '',
    seatNumber: 0
  };

  usersList: any[] = [];  
  schedulesList: any[] = []; 
  errorMessage: string | null = null;
  isEdit: boolean = false;

  constructor(
    private router: Router,
    private http: HttpClient,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadUsers();
    this.loadSchedules();

    const bookingId = this.activatedRoute.snapshot.paramMap.get('id');
    if (bookingId) {
      this.isEdit = true;
      this.loadBookingData(bookingId);
    }
  }

  loadUsers() {
    this.http.get<any>('https://localhost:44311/api/UserDTO?page=0&limit=0').subscribe(
      (response) => {
        this.usersList = response;
      },
      (error) => {
        this.errorMessage = 'Không thể tải danh sách người dùng';
      }
    );
  }

  loadSchedules() {
    this.http.get<any>('https://localhost:44311/api/Schedules?page=0&pageSize=0').subscribe(
      (response) => {
        this.schedulesList = response.schedules;  
  
        const routeIds = this.schedulesList.map((schedule: any) => schedule.routeId);
  
        const uniqueRouteIds = Array.from(new Set(routeIds));
  
        const routeDetails: any = {};
  
        uniqueRouteIds.forEach((routeId: number) => {
          this.http.get<any>(`https://localhost:44311/api/Routes/${routeId}`).subscribe(
            (route) => {
              routeDetails[routeId] = {
                startingPlace: route.startingPlace,
                destinationPlace: route.destinationPlace
              };
  
              this.schedulesList.forEach((schedule: any) => {
                if (schedule.routeId === routeId) {
                  schedule.routeName = `${route.startingPlace} - ${route.destinationPlace}`;
                }
              });
            },
            (error) => {
              console.error('Không thể tải thông tin Route', error);
            }
          );
        });
      },
      (error) => {
        this.errorMessage = 'Không thể tải danh sách lịch trình';
      }
    );
  }

  loadBookingData(id: string) {
    this.http.get<any>(`https://localhost:44311/api/Bookings/${id}`).subscribe(
      (response) => {
        this.booking = response;
      },
      (error) => {
        this.errorMessage = 'Unable to load booking information';
      }
    );
  }

  onSubmit() {
    if (!this.isValid()) {
      this.errorMessage = 'Please fill all required fields correctly';
      return;
    }
    const bookingId = this.booking?.bookingId;
    if (!bookingId) {
      this.errorMessage = 'Booking ID is missing!';
      return;
    }

    this.http.put(`https://localhost:44311/api/Bookings/${this.booking.bookingId}`, this.booking).subscribe(
      () => {
        alert('Cập nhật đặt chỗ thành công!');
        this.router.navigate(['/admin/listbooking']);
      },
      (error) => {
        this.errorMessage = 'Lỗi khi cập nhật đặt chỗ!';
      }
    );
  }

  onCancel() {
    this.router.navigate(['/admin/listbooking']);  
  }

  private isValid() {
    return this.booking.userId > 0 && this.booking.scheduleId > 0 && this.booking.name && this.booking.age > 0;
  }
}
