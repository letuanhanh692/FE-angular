import { Component, OnInit } from '@angular/core';
import { Cancellation, CancellationService } from '../../../service/cancelltion.service';
import { Router, RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cancel',
  standalone: true,
  imports: [HttpClientModule,FormsModule,CommonModule,RouterModule],
  templateUrl: './cancel.component.html',
  styleUrl: './cancel.component.css'
})
export class CancelComponent implements OnInit {
  cancellations: any[] = [];
  currentPage: number = 1;
  totalPages: number = 0;
  loading: boolean = false;
  errorMessage: string = '';
  pageSize: number = 4; 

  constructor(private http: HttpClient, private router: Router,private cancelService : CancellationService) {}
  ngOnInit() {
    this.loadCancellations();
  }
  
 
  loadCancellations() {
    this.loading = true;
    this.cancelService.getAllCancellations(this.currentPage,this.pageSize).subscribe({
      next: (data) => {
        this.cancellations = data.cancellations;  
        this.totalPages = data.totalPages; 
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load cancellations';
        this.loading = false;
      }
    });
  }
  

  viewCancellation(id: number) {
    this.router.navigate(['/admin/canceldetail', id]);
  }

  editCancellation(id: number) {
    this.router.navigate(['/admin/editcancel', id]);
  }

  deleteCancellation(id: number) {
    if (confirm('Are you sure you want to delete this cancellation?')) {
      this.cancelService.deleteCancellation(id).subscribe({
        next: () => {
          this.cancellations = this.cancellations.filter(c => c.id !== id);
          alert('Cancellation deleted successfully.');
        },
        error: () => {
          alert('Failed to delete the cancellation.');
        }
      });
    }
  }

  changePage(newPage: number) {
    if (newPage > 0 && newPage <= this.totalPages) {
      this.currentPage = newPage;
      this.loadCancellations();
    }
  }
}
