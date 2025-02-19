import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { BusService } from '../../../service/bus.service';

@Component({
  selector: 'app-listbus',
  standalone: true,
  imports: [HttpClientModule, FormsModule, CommonModule, RouterModule],
  templateUrl: './listbus.component.html',
  styleUrls: ['./listbus.component.css']
})
export class ListbusComponent implements OnInit {
  buses: any[] = []; 
  searchQuery: string = '';
  loading: boolean = false; 
  errorMessage: string = ''; 
  successMessage: string = ''; 
  currentPage: number = 1; 
  totalPages: number = 10; 

  constructor(private busService: BusService, private router: Router) {}

  ngOnInit(): void {
    this.loadBuses();
  }

  loadBuses(): void {
    this.loading = true;
    this.errorMessage = ''; 
    this.successMessage = '';
    this.busService.getBuses(this.currentPage, this.searchQuery).subscribe(
      (response: any) => {
        this.buses = response.buses;
        this.totalPages = response.totalPages;
        this.loading = false;
      },
      (error) => {
        this.errorMessage = 'Không thể tải dữ liệu xe'; 
        this.loading = false;
      }
    );
  }

  searchBuses(): void {
    this.loading = true;
    this.errorMessage = ''; 
    this.successMessage = '';
    this.busService.searchBuses(this.searchQuery).subscribe(
      (response: any) => {
        console.log('Search Response:', response);  
        this.buses = response.buses;
        this.totalPages = response.totalPages;
        this.loading = false;
      },
      (error) => {
        this.errorMessage = 'Tìm kiếm thất bại'; 
        this.loading = false;
      }
    );
  }
  

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadBuses();
    }
  }

  detailBus(busId: number): void {
    this.router.navigate(['/admin/busdetail', busId]); 
  }

  updateBus(busId: number): void {
    this.router.navigate(['/admin/editbus', busId]); 
  }

  deleteBus(busId: number): void {
    if (confirm('Are you sure you want to delete this bus?')) {
      this.busService.deleteBus(busId).subscribe(
        (response) => {
          this.successMessage = 'Delete bus successfully'; 
          this.loadBuses(); 
        },
        (error) => {
          this.errorMessage = 'Delete bus failed'; 
        }
      );
    }
  }
}
