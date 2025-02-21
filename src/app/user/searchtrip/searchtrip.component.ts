import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TripService } from '../../../service/trip.service';

@Component({
  selector: 'app-searchtrip',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './searchtrip.component.html',
  styleUrls: ['./searchtrip.component.css']
})
export class SearchtripComponent {
  searchForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private tripService: TripService,
    private router: Router
  ) {
    this.searchForm = this.fb.group({
      startingPlace: ['', Validators.required],
      destinationPlace: ['', Validators.required],
      departureDateTime: ['']
    });
  }

  // Hàm chuẩn hóa dữ liệu: bỏ dấu, chữ thường và bỏ khoảng trắng thừa
  normalizeText(text: string): string {
    return text.normalize('NFD') // Tách dấu
      .replace(/[\u0300-\u036f]/g, '') // Xóa dấu
      .replace(/đ/g, 'd').replace(/Đ/g, 'D') // Thay đ -> d
      .replace(/\s+/g, ' ') // Bỏ khoảng trắng thừa
      .trim()
      .toLowerCase(); // Chữ thường
  }

  // Xử lý khi nhấn nút tìm kiếm
  onSubmit() {
    if (this.searchForm.valid) {
      const searchData = {
        startingPlace: this.normalizeText(this.searchForm.value.startingPlace),
        destinationPlace: this.normalizeText(this.searchForm.value.destinationPlace),
        departureDateTime: this.searchForm.value.departureDateTime
      };

      this.tripService.searchTrips(searchData).subscribe(
        (response) => {
          this.router.navigate(['user/triplist'], { queryParams: searchData });
        },
        (error) => {
          console.error('Error fetching trips', error);
        }
      );
    }
  }
}
