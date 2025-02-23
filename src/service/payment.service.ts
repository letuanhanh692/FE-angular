import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl = 'https://localhost:44311/api/Payment'; 

  constructor(private http: HttpClient) {}

  // Gửi yêu cầu tạo thanh toán
  createPayment(paymentData: any): Observable<any> {
    return this.http.post(`https://localhost:44311/api/Payment/create-payment`, paymentData);
  }

  // Xử lý callback thanh toán
  handlePaymentCallback(queryParams: any): Observable<any> {
    return this.http.get(`https://localhost:44311/api/Payment/payment-callback`, { params: queryParams });
  }
}
