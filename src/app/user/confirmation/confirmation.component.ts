import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-confirmation',
  standalone: true, 
  imports: [CommonModule, FormsModule, HttpClientModule], 
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {
  bookingData: any = {}; 
  error: string = '';
  selectedPaymentMethod: string = ''; 

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    const navigation = this.router.getCurrentNavigation();
    console.log('Navigation state:', navigation?.extras.state); // Debug dữ liệu state

    if (navigation?.extras.state) {
      this.bookingData = navigation.extras.state as any;
    } else {
      this.bookingData = history.state;
      if (!this.bookingData || Object.keys(this.bookingData).length === 0) {
        this.error = 'Không tìm thấy thông tin booking.';
      }
    }
  }

  // ✅ Chuẩn bị dữ liệu đúng định dạng API yêu cầu
  prepareBookingData(): any {
    return {
      bookingId: this.bookingData.id || 0,
      userId: this.bookingData.userId || 0,
      scheduleId: this.bookingData.scheduleId || 0,
      seatNumber: this.bookingData.seatNumber || 0,
      age: this.bookingData.age || 0,
      bookingDate: new Date().toISOString(),
      totalAmount: this.bookingData.totalAmount || 0,
      bookingStatus: 'Pending', 
      userName: this.bookingData.name || '',
      email: this.bookingData.email || '',
      phone: this.bookingData.phone || '',
      address: this.bookingData.address || '',
      idCard: this.bookingData.idCard || '',
      paymentId: 0, 
      paymentAmount: this.bookingData.totalAmount || 0,
      paymentMethod: this.selectedPaymentMethod || '',
      paymentStatus: 'Pending',
      paymentCode: '',
      paymentDate: new Date().toISOString()
    };
  }

  handlePayment(): void {
    if (!this.selectedPaymentMethod) {
      alert('Vui lòng chọn phương thức thanh toán.');
      return;
    }

    const requestData = this.prepareBookingData();
    console.log('Dữ liệu gửi đi:', requestData); // Debug dữ liệu gửi đi

    if (this.selectedPaymentMethod === 'transfer') {
      this.http.post('https://localhost:44311/api/Payment/create-payment', requestData)
        .subscribe(
          (response: any) => {
            console.log('Phản hồi từ API:', response);
            if (response.paymentUrl) {
              window.location.href = response.paymentUrl; // Chuyển hướng VNPay
            } else {
              alert('Không thể tạo thanh toán, vui lòng thử lại.');
            }
          },
          (error) => {
            console.error('Lỗi khi tạo thanh toán:', error);
            alert('Lỗi hệ thống, vui lòng thử lại sau!');
          }
        );
    }
  }
}
