import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../service/user.service';
import { AuthService } from '../../../service/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-userinfor',
  standalone: true, // Thêm dòng này
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './userinfor.component.html',
  styleUrls: ['./userinfor.component.css']
})
export class UserinforComponent implements OnInit {
  userForm: FormGroup;
  userId: number;
  isEditing = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthService
  ) {
    this.userForm = this.fb.group({

      email: [{ value: '', disabled: true }],
      name: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      address: [''],
      idCard: ['', Validators.required],
      dateOfBirth: ['', Validators.required]
    });
    this.userId = parseInt(this.authService.getUserId() ?? '0', 10);

  }

  ngOnInit(): void {
    this.loadUserInfo();
  }

  loadUserInfo() {
    this.userService.getUserById(this.userId).subscribe(user => {
      console.log('User data:', user); // Kiểm tra dữ liệu user nhận về
      this.userForm.patchValue(user);
    });
  }


  enableEditing() {
    this.isEditing = true;
    this.userForm.enable();
    this.userForm.controls['email'].disable(); // Chỉ disable email
  }


  saveChanges() {
    if (this.userForm.valid) {
      console.log('Dữ liệu gửi đi:', this.userForm.value); // Kiểm tra dữ liệu

      this.userService.updateUser(this.userId, this.userForm.value).subscribe(
        () => {
          this.isEditing = false;
          this.loadUserInfo();
          alert('Cập nhật thông tin thành công!');
        },
        (error) => {
          console.error('Lỗi API:', error); // Kiểm tra lỗi từ API
          alert('Cập nhật thất bại!');
        }
      );
    } else {
      alert('Vui lòng nhập đầy đủ thông tin hợp lệ!');
    }
  }

}
