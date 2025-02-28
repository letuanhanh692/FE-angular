import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PaymentService } from '../../../service/payment.service';

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

  constructor(private router: Router, private paymentService: PaymentService) {}

  ngOnInit(): void {
    this.router.routerState.root.queryParams.subscribe(params => {
      if (params['transactionId']) {
        this.handlePaymentCallback(params);
      }
    });

    if (typeof (window as any).timer === "undefined") {
      (window as any).timer = null;
    }

    const navigation = this.router.getCurrentNavigation();
    console.log('Navigation state:', navigation?.extras.state);

    if (navigation?.extras.state) {
      this.bookingData = navigation.extras.state as any;
    } else {
      this.bookingData = history.state;
    }

    console.log('Dữ liệu booking nhận được:', this.bookingData);

    if (!this.bookingData || Object.keys(this.bookingData).length === 0) {
      this.error = 'Không tìm thấy thông tin booking.';
      setTimeout(() => this.router.navigate(['user/searchtrip']), 3000);
    }
  }

  prepareBookingData(): any {
    if (!this.bookingData?.bookingId || !this.bookingData?.scheduleId || !this.bookingData?.userId) {
      alert('Dữ liệu đặt vé không hợp lệ, vui lòng thử lại!');
      return null;
    }

    return {
      bookingId: this.bookingData.bookingId,
      userId: this.bookingData.userId,
      scheduleId: this.bookingData.scheduleId,
      seatNumber: this.bookingData.seatNumber || '',
      age: this.bookingData.age || 0,
      bookingDate: new Date().toISOString(),
      totalAmount: this.bookingData.totalAmount || 0,
      bookingStatus: 'Booked',
      userName: this.bookingData.name || '',
      email: this.bookingData.email || '',
      phone: this.bookingData.phone || '',
      address: this.bookingData.address || '',
      idCard: this.bookingData.idCard || '',
      paymentId: this.bookingData.paymentId || 0,
      paymentAmount: this.bookingData.totalAmount || 0,
      paymentMethod: 'Transfer',
      paymentStatus: 'Pending',
      paymentCode: '',
      paymentDate: new Date().toISOString()
    };
  }

  handlePayment(): void {
    const requestData = this.prepareBookingData();
    if (!requestData) return;

    console.log('Dữ liệu gửi đi:', requestData);

    this.paymentService.createPayment(requestData).subscribe({
      next: (response: any) => {
        console.log('Phản hồi từ API:', response);
        if (response.paymentUrl) {
          window.location.href = response.paymentUrl;
        } else {
          alert('Không thể tạo thanh toán, vui lòng thử lại.');
        }
      },
      error: (error) => {
        console.error('Lỗi khi tạo thanh toán:', error);
        alert(error.status === 400 ? 'Dữ liệu không hợp lệ, vui lòng kiểm tra lại.' : 'Lỗi hệ thống, vui lòng thử lại sau!');
      }
    });
  }

  handlePaymentCallback(queryParams: any): void {
    this.paymentService.handlePaymentCallback(queryParams).subscribe({
      next: (response: any) => {
        console.log('Kết quả callback:', response);
        if (response.paymentStatus === 'Success') {
          alert('Thanh toán thành công!');
          this.router.navigate(['/user/success'], { state: response });
        } else {
          alert('Thanh toán thất bại, vui lòng thử lại.');
        }
      },
      error: (error) => {
        console.error('Lỗi callback thanh toán:', error);
        alert('Lỗi khi xác nhận thanh toán, vui lòng thử lại.');
      }
    });
  }
}
