import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../service/user.service';
import { AuthService } from '../../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userinfor',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule,CommonModule],
  templateUrl: './userinfor.component.html',
  styleUrls: ['./userinfor.component.css']
})
export class UserinforComponent implements OnInit {
  userForm: FormGroup;
  userId: number;
  isEditing = false;
  originalData: any = {}; // Lưu dữ liệu ban đầu để khôi phục khi hủy chỉnh sửa
  errorMessage: string = '';
  successMessage: string = '';
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      name: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      address: [''],
      idCard: ['', [Validators.required]],
      dateOfBirth: ['', [Validators.required]]
    });

    // Lấy userId từ AuthService hoặc localStorage nếu cần
    this.userId = parseInt(this.authService.getUserId() ?? '0', 10);
  }

  ngOnInit(): void {
    this.loadUserInfo();
  }

  loadUserInfo() {
    // Nếu có thông tin người dùng trong localStorage, sử dụng nó, nếu không, gọi API
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      const user = JSON.parse(userInfo);
      console.log(user);  // Kiểm tra dữ liệu người dùng có đầy đủ thông tin không
      this.userForm.patchValue(user);  // Điền dữ liệu vào form
      this.originalData = { ...user };  // Lưu dữ liệu ban đầu
    } else {
      this.userService.getUserById(this.userId).subscribe(
        (data) => {
          this.userForm.patchValue(data);  // Điền dữ liệu vào form từ API
          this.originalData = { ...data };  // Lưu dữ liệu gốc
        },
        (error) => {
          this.errorMessage = 'Không thể tải thông tin người dùng.';
        }
      );
    }
  }

  enableEditing() {
    this.isEditing = true;
    this.userForm.enable();
    this.userForm.controls['email'].disable();  // Không cho phép sửa email
  }

  saveChanges() {
    if (this.userForm.valid) {
      this.loading = true;

      // Đảm bảo trường Username có giá trị từ originalData hoặc từ form nếu cần thiết
      const updatedUser = {
        id: this.originalData.id,  // Đảm bảo gửi id
        email: this.originalData.email,  // Đảm bảo gửi email (không sửa)
        roleId: this.originalData.roleId,  // Đảm bảo gửi roleId (nếu cần)
        username: this.originalData.username, // Lấy username từ originalData nếu cần
        ...this.userForm.value  // Lấy tất cả các trường từ form
      };

      this.userService.updateUser(this.userId, updatedUser).subscribe(
        () => {
          this.loading = false;
          this.successMessage = 'Information has been updated !';

          // Cập nhật lại thông tin trong localStorage
          localStorage.setItem('userInfo', JSON.stringify(updatedUser));

          // Chuyển lại chế độ hiển thị thông tin cá nhân sau 2 giây
          setTimeout(() => {
            this.isEditing = false;  // Tắt chế độ chỉnh sửa
            this.userForm.patchValue(updatedUser);  // Cập nhật lại form với dữ liệu mới
          }, 100);
        },
        (error) => {
          console.error('Validation Errors:', error.error.errors);
          this.errorMessage = 'Có lỗi trong dữ liệu bạn gửi.';
        }
      );
    } else {
      this.errorMessage = 'Vui lòng điền đầy đủ thông tin!';
    }
  }

  cancelEditing() {
    this.isEditing = false;
    this.userForm.patchValue(this.originalData);  // Khôi phục dữ liệu ban đầu
  }
  

}
