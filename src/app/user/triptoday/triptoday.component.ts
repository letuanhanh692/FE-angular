import { TripService } from './../../../service/trip.service';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-triptoday',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './triptoday.component.html',
  styleUrls: ['./triptoday.component.css']
})
export class TripTodayComponent implements OnInit {
  trips: any[] = [];
  errorMessage: string = '';

  constructor(
    private TripService: TripService,
    private route: Router // Thêm Router vào constructor
  ) {}

  ngOnInit(): void {
    this.loadTripsForToday();
  }

  loadTripsForToday(): void {
    this.TripService.getTripForToday().subscribe({
      next: (data) => {
        console.log(data); // Kiểm tra dữ liệu trả về từ API
        this.trips = data;
      },
      error: (err) => {
        this.errorMessage = 'Không có chuyến đi nào trong ngày hôm nay';
        console.error(err);
      }
    });
  }


  viewTripDetail(tripId: number): void {
    this.route.navigate([`/user/tripdetail/${tripId}`]); // Điều hướng đến trang chi tiết chuyến đi
  }
}
