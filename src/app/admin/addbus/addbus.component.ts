import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
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
   constructor( private router: Router) { }
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.bus.busImage = file;
    }
  }

  onSubmit() {
    if (!this.bus.busNumber || !this.bus.totalSeats || !this.bus.busImage || this.bus.busTypeId === null) {
      this.errorMessage = 'Vui lòng điền đầy đủ thông tin!';
      return;
    }

    console.log('Form Submitted:', this.bus);

    this.bus = {
      busNumber: '',
      busTypeId: null,
      totalSeats: null,
      busImage: null
    };

    alert('Bus added successfully!');
    this.router.navigate(['/admin/listbus']); 
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