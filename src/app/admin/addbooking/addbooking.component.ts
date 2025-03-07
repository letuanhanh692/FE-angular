import { Schedule } from './../schedules/schedules.model';
import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-addbooking',
  standalone: true,
  imports: [HttpClientModule, FormsModule, CommonModule, RouterModule],
  templateUrl: './addbooking.component.html',
  styleUrl: './addbooking.component.css'
})
export class AddbookingComponent {
  booking = {
    userId: 0,
    scheduleId: 0,
    name: '',
    age: 0,
    phone: '',
    email: '',
    seatNumber: 0
  };

  usersList: any[] = [];  
  schedulesList: any[] = []; 

  errorMessage: string | null = null;

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any>('https://localhost:44311/api/UserDTO?page=0&limit=0').subscribe(
      (response) => {
        console.log('Users:', response);  
        this.usersList = response;  
      },
      (error) => {
        this.errorMessage = 'Không thể tải danh sách người dùng';
      }
    );

    this.http.get<any>('https://localhost:44311/api/Schedules?page=0&pageSize=0').subscribe(
      (response) => {
        console.log('Schedules:', response);  
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

  onSubmit() {
    if (this.isValid()) {
      this.http.post<any>('https://localhost:44311/api/Bookings', this.booking).subscribe(
        (response) => {
          alert('Reservation successful!');
          this.router.navigate(['/admin/listbooking']); 
        },
        (error) => {
          this.errorMessage = 'Có lỗi xảy ra khi đặt chỗ';
        }
      );
    } else {
      this.errorMessage = 'Vui lòng điền đầy đủ thông tin';
    }
  }

  onCancel() {
    this.booking = {
      userId: 0,
      scheduleId: 0,
      name: '',
      age: 0,
      phone: '',
      email: '',
      seatNumber: 0
    };
    this.errorMessage = null;
    this.router.navigate(['admin/listbooking'])
  }

  private isValid() {
    return this.booking.userId > 0 && this.booking.scheduleId > 0 && this.booking.name && this.booking.age > 0;
  }
}
