import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../../service/user.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { UserDTO } from './user.model';

@Component({
  selector: 'app-listuser',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule,RouterModule],
  templateUrl: './listuser.component.html',
  styleUrls: ['./listuser.component.css']
})
export class ListuserComponent implements OnInit {
  users: UserDTO[] = [];
  errorMessage: string = '';
  loading: boolean = false;
  searchQuery: string = '';
  currentPage: number = 1;
  totalPages: number = 10;
  limit: number = 4;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;
    this.userService.getUsers(this.currentPage, this.limit).subscribe({
      next: (data) => {
        this.users = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading user data:', err);
        this.errorMessage = 'An error occurred while loading user data.';
        this.loading = false;
      }
    });
  }

  searchUsers(): void {
    if (this.searchQuery.trim()) {
      this.loading = true;
      this.userService.searchUsers(this.searchQuery, this.currentPage, this.limit).subscribe({
        next: (data) => {
          this.users = data.users;
          this.totalPages = data.totalPages;
          this.loading = false;
        },
        error: (err) => {
          console.error('Error while searching for user:', err);
          this.loading = false;
        }
      });
    } else {
      this.loadUsers(); 
    }
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadUsers();
    } 
  }

  // Xem chi tiết người dùng
  detailUser(id: number): void {
    this.router.navigate([`/admin/userdetail/${id}`]); // Điều hướng đến trang chi tiết người dùng
  }

  // Cập nhật người dùng
  updateUser(id: number): void {
    this.router.navigate([`/admin/edituser/${id}`]); // Điều hướng đến trang cập nhật người dùng
  }

  // Xóa người dùng
  deleteUser(id: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(id).subscribe({
        next: () => {
          this.loadUsers(); 
        },
        error: (err) => {
          console.error('Error while deleting user:', err);
        }
      });
    }
  }

  // Thêm người dùng mới
  addUser(): void {
    this.router.navigate(['/admin/adduser']); 
  }
}
