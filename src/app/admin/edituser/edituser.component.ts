import { Component, OnInit } from '@angular/core';
import { UserDTO } from '../listuser/user.model';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../service/user.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edituser',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edituser.component.html',
  styleUrl: './edituser.component.css'
})
export class EdituserComponent implements OnInit {
  user: UserDTO = {
    id: 1,
    username: '',
    address: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    idCard: '',
    password: '',
    roleId: 0,
    name: '',     
    roleName: ''   
  };
  errorMessage: string = '';
  successMessage: string = '';
  loading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const userId = Number(this.route.snapshot.paramMap.get('id'));
    if (userId) {
      this.userService.getUserById(userId).subscribe(
        (data) => {
          this.user = data; // Điền thông tin người dùng vào form
        },
        (error) => {
          this.errorMessage = 'Failed to load user details';
        }
      );
    }
  }

  onSubmit(): void {
    this.loading = true;
    this.userService.updateUser(this.user.id, this.user).subscribe(
      (data) => {
        this.loading = false;
        this.successMessage = 'User updated successfully!';
        setTimeout(() => {
          this.router.navigate(['/admin/listuser']); // Điều hướng lại trang danh sách sau khi cập nhật
        }, 2000);
      },
      (error) => {
        this.loading = false;
        this.errorMessage = 'Failed to update user';
      }
    );
  }

  onCancel(): void {
    this.router.navigate(['/admin/listuser']);
  }
}