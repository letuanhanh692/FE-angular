import { Component, OnInit } from '@angular/core';
import { Cancellation, CancellationService } from '../../../service/cancelltion.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-canceldetail',
  standalone: true,
  imports: [HttpClientModule,FormsModule,CommonModule,RouterModule],
  templateUrl: './canceldetail.component.html',
  styleUrl: './canceldetail.component.css'
})
export class CanceldetailComponent implements OnInit {
  cancelDetails: Cancellation = {
    id:0,
    bookingId:0,
    startingPlace: '',
    destinationPlace: '',
    cancellationDate: '',
    refundAmount: 0,
    name: '',
    age: 0,
    email: '',
    seatNumber: 0,
    bookingDate: '',
    totalAmount: 0,
    status: '',
    busType: '',
    departTime: '',
    arrivalTime: ''
  };

  errorMessage: string = '';

  constructor(
    private route:ActivatedRoute,
    private router: Router,
    private cancellationService: CancellationService,
    private httpclient :HttpClient
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));  
    if (id) {
      this.getCancelDetails(id);
    }
  }

  getCancelDetails(id: number) {
    this.httpclient.get(`https://localhost:44311/api/Cancellations/${id}`)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.cancelDetails = res as Cancellation; 
        },
        error: (err) => {
          console.error('Error:', err);
          this.errorMessage = 'Không tìm thấy chi tiết hủy vé.';
        }
      });
  }


  onCancel(): void {
    this.router.navigate(['admin/cancel']);
  }
}