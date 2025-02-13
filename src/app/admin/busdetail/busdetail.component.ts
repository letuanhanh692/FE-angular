import { Component, OnInit } from '@angular/core';
import { Bus } from '../listbus/bus.model';
import { ActivatedRoute, Router } from '@angular/router';
import { BusService } from '../../../service/bus.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-busdetail',
  standalone: true,
  imports: [HttpClientModule,FormsModule,CommonModule],
  templateUrl: './busdetail.component.html',
  styleUrl: './busdetail.component.css'
})
export class BusdetailComponent implements OnInit {
  bus: Bus | null = null;  // Khởi tạo bus là null
  loading: boolean = true; // Trạng thái tải
  errorMessage: string = ''; // Biến thông báo lỗi

  constructor(
     private activatedRoute: ActivatedRoute,
        private router: Router,
    private busService: BusService
  ) {}

  ngOnInit(): void {
    const busId = this.activatedRoute.snapshot.paramMap.get('id'); // Lấy id từ URL
    if (busId) {
      this.loadBusDetails(parseInt(busId)); // Gọi phương thức tải chi tiết bus
    }
  }

  loadBusDetails(id: number): void {
    this.busService.getBus(id).subscribe(
      (data) => {
        this.bus = data;  // Lưu dữ liệu bus
        this.loading = false; // Đặt lại trạng thái khi tải xong
      },
      (error) => {
        this.errorMessage = 'Không thể tải thông tin xe. Vui lòng thử lại!';
        this.loading = false;
      }
    );
  }
  onCancel(): void {
    this.router.navigate(['/admin/route']);
  }
}
