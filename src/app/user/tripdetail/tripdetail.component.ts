import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TripService } from '../../../service/trip.service';  // Đảm bảo sử dụng TripService
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { switchMap } from 'rxjs/operators';  // Thêm để sử dụng switchMap

@Component({
  selector: 'app-tripdetail',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],  // Thêm các module cần thiết nếu có (ví dụ: CommonModule)
  templateUrl: './tripdetail.component.html',
  styleUrls: ['./tripdetail.component.css']
})
export class TripdetailComponent implements OnInit {
  tripDetails: any = {};  // Chi tiết chuyến đi
  tripId: number = 0;  // ID chuyến đi từ URL
  loading: boolean = false;  // Biến kiểm tra trạng thái tải dữ liệu
  error: string = '';  // Biến lưu lỗi nếu có

  constructor(
    private route: ActivatedRoute,  // Để nhận id từ URL
    private tripService: TripService // Dùng TripService để lấy thông tin chuyến đi
  ) {}

  ngOnInit(): void {
    // Sử dụng switchMap để gọi API khi thay đổi id trong URL
    this.route.params.pipe(
      switchMap(params => {
        this.tripId = +params['id'];  // Chuyển id thành số
        this.loading = true;  // Đánh dấu trạng thái là đang tải
        this.error = '';  // Xóa lỗi cũ khi thực hiện lại việc tải
        return this.tripService.getTripDetails(this.tripId);  // Gọi API lấy thông tin chi tiết chuyến đi
      })
    ).subscribe(
      (response) => {
        this.loading = false;  // Đánh dấu tải xong
        this.tripDetails = response;  // Lưu chi tiết chuyến đi vào tripDetails
      },
      (error) => {
        this.loading = false;  // Đánh dấu tải xong
        this.error = 'Không thể tải thông tin chuyến đi.';  // Lưu lỗi nếu có
        console.error('Error fetching trip details', error);
      }
    );
  }
}
