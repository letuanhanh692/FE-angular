import { Component, OnInit } from '@angular/core';
import { RouteService } from '../../../service/route.service';
import { UserService } from '../../../service/user.service';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Interface cho User và RouteDTO
interface User {
  id: number;
  name: string;
  roleId: number;
}

interface RouteDTO {
  id: number;
  startingPlace: string;
  destinationPlace: string;
  distance: number;
  priceRoute: number;
  staffId: number;
  staffName: string;
  staffEmail: string;
}

@Component({
  selector: 'app-addroute',
  standalone: true,
  imports: [HttpClientModule, CommonModule, FormsModule],
  templateUrl: './addroute.component.html',
  styleUrls: ['./addroute.component.css']
})
export class AddrouteComponent implements OnInit {
  route: RouteDTO = {
    id: 0,  // Thêm id nếu cần thiết
    startingPlace: '',
    destinationPlace: '',
    distance: 0,
    priceRoute: 0,
    staffId: 0,
    staffName: '', // Thêm staffName
    staffEmail: '' // Thêm staffEmail
  };

  staffList: User[] = []; // Danh sách nhân viên có roleId = 2
  errorMessage = '';  // Biến lưu thông báo lỗi

  constructor(
    private routeService: RouteService,
    private userService: UserService,
    private router: Router // Inject Router
  ) {}

  ngOnInit(): void {
    this.loadStaff();  // Gọi loadStaff khi component được khởi tạo
  }

  loadStaff(): void {
    this.userService.getUsers().subscribe(
      (users: User[]) => {
        // Lọc danh sách nhân viên với roleId = 2
        this.staffList = users.filter((user: User) => user.roleId === 2);
      },
      (error: any) => {
        this.errorMessage = 'Failed to load staff list';  // Nếu có lỗi khi tải danh sách nhân viên
      }
    );
  }

  onSubmit(): void {
    // Kiểm tra dữ liệu form
    if (!this.route.startingPlace || !this.route.destinationPlace || this.route.distance <= 0 || this.route.priceRoute <= 0) {
      this.errorMessage = 'Please fill in all fields correctly';  // Hiển thị thông báo lỗi
      return;
    }

    // Gửi request để tạo tuyến đường mới
    this.routeService.createRoute(this.route).subscribe(
      () => {
        alert('Route added successfully!');  // Thông báo thành công
        this.router.navigate(['/admin/route']);  // Điều hướng về trang chính (trang quản lý tuyến đường)
      },
      (error: any) => {
        this.errorMessage = 'Failed to add route';  // Thông báo lỗi nếu không thể thêm tuyến đường
      }
    );
  }

  onCancel(): void {
    this.resetForm();
  }

  private resetForm(): void {
    this.route = { id: 0, startingPlace: '', destinationPlace: '', distance: 0, priceRoute: 0, staffId: 0, staffName: '', staffEmail: '' };
    this.errorMessage = '';  // Xóa thông báo lỗi
  }
}
