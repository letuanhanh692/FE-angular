import { Component, OnInit } from '@angular/core';
import { RouteService } from '../../../service/route.service';
import { UserService } from '../../../service/user.service';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
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
    id: 0,  
    startingPlace: '',
    destinationPlace: '',
    distance: 0,
    priceRoute: 0,
    staffId: 0,
    staffName: '', 
    staffEmail: '' 
  };

  staffList: User[] = [];
  errorMessage = '';  

  constructor(
    private routeService: RouteService,
    private userService: UserService,
    private router: Router ,
    private http : HttpClient
  ) {}

  ngOnInit(): void {
    this.loadStaff();  
  }

  loadStaff(): void {
    this.http.get<any>('https://localhost:44311/api/UserDTO?page=0&limit=0').subscribe(
      (response) => {
        console.log('Response:', response);  // Kiểm tra dữ liệu trả về
  
        if (Array.isArray(response)) {
          this.staffList = response.filter((user: User) => user.roleId === 2);
        } 
        else if (response.items && Array.isArray(response.items)) {
          this.staffList = response.items.filter((user: User) => user.roleId === 2);
        }
      },
      (error) => {
        console.error('Error:', error);
        this.errorMessage = 'Không thể tải danh sách người dùng';
      }
    );
  }
  

  onSubmit(): void {
    if (!this.route.startingPlace || !this.route.destinationPlace || this.route.distance <= 0 || this.route.priceRoute <= 0) {
      this.errorMessage = 'Please fill in all fields correctly'; 
      return;
    }

    this.http.post('https://localhost:44311/api/Route', this.route)
      .subscribe(
        () => {
          alert('Route added successfully!');  
          this.router.navigate(['/admin/route']);  
        },
        (error: any) => {
          this.errorMessage = 'Failed to add route';  
        }
      );
  }

  onCancel(): void {
    this.resetForm();
  }

  private resetForm(): void {
    this.route = { id: 0, startingPlace: '', destinationPlace: '', distance: 0, priceRoute: 0, staffId: 0, staffName: '', staffEmail: '' };
    this.errorMessage = '';  
  }
}