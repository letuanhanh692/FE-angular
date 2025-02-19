import { BusType } from './../listbus/bus.model';
import { Component, OnInit } from '@angular/core';
import { Bus } from '../listbus/bus.model';
import { ActivatedRoute, Router } from '@angular/router';
import { BusService } from '../../../service/bus.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-editbus',
  standalone: true,
  imports: [HttpClientModule,FormsModule,CommonModule],
  templateUrl: './editbus.component.html',
  styleUrl: './editbus.component.css'
})
export class EditbusComponent implements OnInit {
  bus: Bus = {
    id:0,
    busNumber: '',
    busTypeId: 0,
    totalSeats: 0,
    imageBus: '',
    busType: { id: 0, typeName: '', description: '' }
  };
  busTypes: BusType[] = []; 
  errorMessage: string = '';
  busId: string | null = null;  
  isEdit: boolean = true;  
  loading: boolean = false;
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private busService: BusService  
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.busId = params.get('id');  
      if (this.busId) {
        this.getBusDetails();  
      }
    });
  }

  getBusDetails() {
    if (this.busId) {
      this.busService.getBus(Number(this.busId)).subscribe(
        (data) => {
          this.bus = data;  
        },
        (error) => {
          this.errorMessage = 'Unable to load bus information';
        }
      );
    }
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.bus.imageBus = file;
    }
  }

  onSubmit() {
    // Kiểm tra xem các trường có hợp lệ không
    if (!this.bus.busNumber || !this.bus.totalSeats || this.bus.busTypeId === null || this.bus.busTypeId === 0) {
      this.errorMessage = 'Please fill in all information!';
      return;
    }
  
    this.updateBus();
  }
  
  updateBus() {
    if (this.busId) {
      const formData = new FormData();
      formData.append('busNumber', this.bus.busNumber);
      formData.append('busTypeId', this.bus.busTypeId.toString());
      formData.append('totalSeats', this.bus.totalSeats.toString());
  
      if (this.bus.imageBus ) {
        formData.append('file', this.bus.imageBus);
      }
  
      this.busService.putBus(Number(this.busId), formData).subscribe(
        () => {
          alert('Bus updated successfully!');
          this.router.navigate(['/admin/listbus']);
        },
        (error) => {
          this.errorMessage = 'An error occurred while updating the bus!';
        }
      );
    }
  }
  

  onCancel() {
    this.router.navigate(['/admin/listbus']);  
  }
}