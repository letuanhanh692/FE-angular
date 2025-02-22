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
          alert('User added successfully!');
          this.router.navigate(['/admin/listuser']);
          this.onCancel();
        },
        error: (err) => {
          console.error('Error adding user:', err);
          if (err.status === 400) {
            if (err.error?.message === "Email đã tồn tại.") {
              this.errorMessage = 'Email already exists. Please use another email.';
            } else if (err.error?.message === "ID Card đã tồn tại.") {
              this.errorMessage = 'ID Card already exists. Please use another ID Card.';
            } else {
              this.errorMessage = 'ID Card already exists. Please use another ID Card.';
            }
          } else {
            this.errorMessage = 'Đã có lỗi xảy ra. Vui lòng thử lại.';
          }
        }
      });
    } else {
      console.log("Incomplete information.");
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
    console.log("Form has been reset!");
  }
}
