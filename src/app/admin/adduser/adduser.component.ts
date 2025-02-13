import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../../../service/user.service';
import { Router } from '@angular/router';
import { UserDTO } from '../listuser/user.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-adduser',
  standalone: true,
  imports: [FormsModule, HttpClientModule,CommonModule],
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent {
  user: UserDTO = {
    id: 0,           
    username: '',
    address: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    idCard: '',
    password: '',
    roleId: 0,         
    roleName: '',      
    avatar: '',       
    name: ''           
  };

  errorMessage: string = ''; 
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {}

  onSubmit(): void {
    this.user.name = this.user.username;

    if (this.user.username && this.user.address && this.user.email && this.user.phone && this.user.dateOfBirth && this.user.idCard && this.user.password && this.user.roleId) {
      this.userService.addUser(this.user).subscribe({
        next: () => {
          console.log('Người dùng đã được thêm thành công!');
          this.onCancel();
          this.router.navigate(['/admin/listuser']);
        },
        error: (err) => {
          console.error('Lỗi khi thêm người dùng:', err);
          if (err.status === 400) {
            if (err.error?.message === "Email đã tồn tại.") {
              this.errorMessage = 'Email đã tồn tại. Vui lòng sử dụng email khác.';
            } else if (err.error?.message === "ID Card đã tồn tại.") {
              this.errorMessage = 'ID Card đã tồn tại. Vui lòng sử dụng ID Card khác.';
            } else {
              this.errorMessage = 'Email hoặc ID Card đã tồn tại. Vui lòng sử dụng thông tin khác.';
            }
          } else {
            this.errorMessage = 'Đã có lỗi xảy ra. Vui lòng thử lại.';
          }
        }
      });
    } else {
      console.log("Thông tin không đầy đủ.");
    }
  }

  onCancel() {
    this.user = {
      id: 0,
      username: '',
      address: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      idCard: '',
      password: '',
      roleId: 0,
      roleName: '',
      avatar: '',
      name: ''
    };
    console.log("Form đã được reset!");
  }
}
