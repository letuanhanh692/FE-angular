import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { BusService } from '../../../service/bus.service';
@Component({
  selector: 'app-addbus',
  standalone: true,
  imports: [HttpClientModule,FormsModule,CommonModule,RouterModule],
  templateUrl: './addbus.component.html',
  styleUrl: './addbus.component.css'
})
export class AddbusComponent {
  bus: any = {
    busNumber: '',
    busTypeId: null,  
    totalSeats: null,  
    busImage: null  
  };

  errorMessage: string = '';

  constructor(private busService: BusService, private router: Router) { }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.bus.busImage = file;
    }
  }

  onSubmit() {
    if (!this.bus.busNumber || !this.bus.totalSeats || !this.bus.busImage || this.bus.busTypeId === null) {
      this.errorMessage = 'Please fill in all information!';
      return;
    }

    const formData = new FormData();
    formData.append('busNumber', this.bus.busNumber);
    formData.append('busTypeId', this.bus.busTypeId);
    formData.append('totalSeats', this.bus.totalSeats);
    formData.append('File', this.bus.busImage);

    this.busService.postBus(formData).subscribe({
      next: (response) => {
        alert('Bus added successfully!');
        this.router.navigate(['/admin/listbus']);
      },
      error: (error) => {
        console.error('Error:', error);
        this.errorMessage = 'An error occurred while adding the bus!';
      }
    });
  }

  onCancel() {
    this.bus = {
      busNumber: '',
      busTypeId: null,
      totalSeats: null,
      busImage: null
    };
  }
}