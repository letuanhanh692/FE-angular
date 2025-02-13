import { Component, OnInit } from '@angular/core';
import { RouteDTO, RouteService } from '../../../service/route.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../service/user.service';  // Import UserService để lấy nhân viên
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-editroute',
  standalone: true,
  imports: [HttpClientModule, FormsModule, CommonModule],
  templateUrl: './editroute.component.html',
  styleUrls: ['./editroute.component.css']
})
export class EditrouteComponent implements OnInit {
  route: RouteDTO = { 
    id: 0,
    startingPlace: '',
    destinationPlace: '',
    distance: 0,
    priceRoute: 0,
    staffId: 0,
    staffName: '',
    staffEmail: ''
  };
  staffList: any[] = [];  // Danh sách nhân viên có roleId = 2
  errorMessage: string = '';

  constructor(
    private routeService: RouteService,  // Inject RouteService
    private userService: UserService,  // Inject UserService để lấy danh sách nhân viên
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const routeId = this.activatedRoute.snapshot.paramMap.get('id');
    if (routeId) {
      this.loadRouteDetails(Number(routeId));  // Ép kiểu từ string sang number
      this.loadStaffList();  // Gọi phương thức tải danh sách nhân viên có roleId = 2
    }
  }

  // Phương thức tải thông tin tuyến đường
  loadRouteDetails(id: number): void {
    this.routeService.getRoute(id).subscribe(
      (data: RouteDTO) => {
        this.route = data;  // Gán dữ liệu tuyến đường vào đối tượng route
      },
      (error: any) => {
        this.errorMessage = 'Failed to load route details';  // Hiển thị lỗi nếu có
      }
    );
  }

  // Phương thức tải danh sách nhân viên có roleId = 2
  loadStaffList(): void {
    this.userService.getUsers().subscribe(
      (users: any[]) => {
        // Lọc danh sách nhân viên với roleId = 2
        this.staffList = users.filter(user => user.roleId === 2);
      },
      (error: any) => {
        this.errorMessage = 'Failed to load staff list';  // Hiển thị lỗi nếu có
      }
    );
  }

  // Phương thức xử lý khi người dùng nhấn Save
  onSubmit(): void {
    this.routeService.updateRoute(this.route.id, this.route).subscribe(
      (response) => {
        alert('Route updated successfully!');
        this.router.navigate(['/admin/route']);  
      },
      (error) => {
        this.errorMessage = 'Failed to update route';  
      }
    );
  }

  // Phương thức xử lý khi người dùng nhấn Cancel
  onCancel(): void {
    this.router.navigate(['/admin/route']);  // Quay lại trang danh sách tuyến đường
  }
}
