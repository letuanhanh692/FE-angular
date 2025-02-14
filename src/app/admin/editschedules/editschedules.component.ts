import { Component, OnInit } from '@angular/core';
import { ScheduleService } from '../../../service/schedule.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Bus, Route } from '../schedules/schedules.model';

@Component({
  selector: 'app-editschedules',
  standalone: true,
  imports: [HttpClientModule,FormsModule,CommonModule,RouterModule],
  templateUrl: './editschedules.component.html',
  styleUrl: './editschedules.component.css'
})
export class EditschedulesComponent implements OnInit {
  
  schedule = { id :0, busId: 0, routeId: 0, departureTime: '', arrivalTime: '', date: '' };
  buses: Bus[] = [];
  routes: Route[] = [];
  errorMessage: string = '';

  constructor(
    private http: HttpClient,
    private scheduleService: ScheduleService,
      private activatedRoute: ActivatedRoute,
      private router: Router
  ) {}

  ngOnInit(): void {
    const scheduleId = this.activatedRoute.snapshot.paramMap.get('id');
    if (scheduleId) {
      this.loadSchedule(Number(scheduleId)); 
    }

    this.http.get<any>('https://localhost:44311/api/Buses?page=0&pageSize=0').subscribe(
      (response) => {
        console.log('Buses:', response.buses);  
        this.buses = response.buses;  
      },
      (error) => {
        this.errorMessage = 'Unable to load buses list';
      }
    );

    this.http.get<any>('https://localhost:44311/api/Routes').subscribe(
      (response) => {
        console.log('Routes:', response);  
        this.routes = response; 
      },
      (error) => {
        this.errorMessage = 'Unable to load routes list';
      }
    );
  }

  loadSchedule(id: number) {
    this.http.get<any>(`https://localhost:44311/api/Schedules/${id}`).subscribe(
      (response) => {
        this.schedule = response; 
      },
      (error) => {
        this.errorMessage = 'Unable to load schedules list';
      }
    );
  }

  onSubmit(): void {
    this.http.put<any>(`https://localhost:44311/api/Schedules/${this.schedule.id}`, this.schedule).subscribe(
      (response) => {
        alert('Schedule has been updated successfully!');
        this.router.navigate(['/schedules']);
      },
      (error) => {
        this.errorMessage = 'An error occurred while updating the schedule.';
      }
    );
  }

  onCancel(): void {
    this.router.navigate(['/admin/schedules']);
  }
}