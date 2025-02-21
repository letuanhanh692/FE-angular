import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-addschedules',
  standalone: true,
  imports: [FormsModule,HttpClientModule,CommonModule,RouterModule],
  templateUrl: './addschedules.component.html',
  styleUrl: './addschedules.component.css'
})
export class AddschedulesComponent implements OnInit {
  schedule: any = {
    busId: 0,
    routeId: 0,
    departureTime: '',
    arrivalTime: '',
    date: ''
  };

  buses: any[] = [];
  routes: any[] = [];
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.http.get<any>('https://localhost:44311/api/Buses?page=0&pageSize=0').subscribe(
      (response) => {
        console.log('Buses:', response.buses);  
        this.buses = response.buses;
      },
      (error) => {
        this.errorMessage = 'Không thể tải danh sách buses';
      }
    );
  
    this.http.get<any>('https://localhost:44311/api/Routes').subscribe(
      (response) => {
        console.log('Routes:', response); 
        this.routes = response;  
      },
      (error) => {
        this.errorMessage = 'Không thể tải danh sách routes';
      }
    );
  }
  

  onSubmit(): void {
    this.http.post<any>('https://localhost:44311/api/Schedules', this.schedule).subscribe(
      (response) => {
        alert('Shedules added successfully!');
        this.router.navigate(['/admin/schedules']); 
      },
      (error) => {
        this.errorMessage = 'An error occurred while adding the calendar.';
      }
    );
  }

  onCancel(): void {
    this.router.navigate(['/schedules']); 
  }
}
