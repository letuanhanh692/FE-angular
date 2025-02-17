import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Cancellation, CancellationService } from '../../../service/cancelltion.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-editcancel',
  standalone: true,
  imports: [HttpClientModule,FormsModule,CommonModule,RouterModule],
  templateUrl: './editcancel.component.html',
  styleUrl: './editcancel.component.css'
})
export class EditcancelComponent  implements OnInit {
  cancellation: Cancellation = {
    id: 0,
    bookingId: 0,
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
    private route: ActivatedRoute,
    private router: Router,
    private cancellationService: CancellationService,
    private http : HttpClient
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    console.log(id);
    if (id) {
      this.cancellationService.getCancellationById(id).subscribe({
        next: (data) => {
          this.cancellation = data;
          if (data.cancellationId) {
            this.cancellation.id = data.cancellationId;
          }
        },
        error: (err) => {
          this.errorMessage = 'Error loading cancellation details';
          console.error(err);
        }
      });
    }
  }

  onSubmit(): void {
    console.log('Form submitted:', this.cancellation); 
    if (this.cancellation.id) {
        this.http.put(`https://localhost:44311/api/Cancellations/${this.cancellation.id}`, this.cancellation)
      .subscribe({
        next: (data) => {
          console.log('Response from server:', data); 
          alert('Cancellation updated successfully!');
          this.router.navigate(['/admin/cancel']);
        },
        error: (err) => {
          this.errorMessage = 'Error updating cancellation';
          console.error('Error occurred:', err);
        }
      });
    }
  }


  onCancel(): void {
    this.router.navigate(['/admin/cancel']);
  }
}
