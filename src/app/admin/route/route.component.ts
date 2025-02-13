import { Component, OnInit } from '@angular/core';
import { RouteDTO, RouteService } from '../../../service/route.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router'

@Component({
  selector: 'app-route',
  standalone: true,
  imports: [HttpClientModule, CommonModule, FormsModule, RouterModule],
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.css']
})
export class RouteComponent implements OnInit {
  routes: RouteDTO[] = [];
  newRoute: RouteDTO = {
    id: 0,
    startingPlace: '',
    destinationPlace: '',
    distance: 0,
    priceRoute: 0,
    staffId: 0,
    staffName: '',
    staffEmail: ''
  };
  selectedRoute: RouteDTO | null = null;
  searchQuery: string = '';
  currentPage: number = 1;
  totalPages: number = 10; 
  pageSize: number = 4;

  loading: boolean = false;  
  errorMessage: string = ''; 

  constructor(private routeService: RouteService , private router:Router) {}


  ngOnInit(): void {
    this.loadRoutes();
  }

  loadRoutes(): void {
    this.loading = true; 
    this.routeService.getRoutes(this.currentPage, this.pageSize, this.searchQuery).subscribe(
      (data) => {
        this.routes = data.routes;  
        this.totalPages = Math.ceil(data.totalItems / this.pageSize); 
        this.loading = false; 
      },
      (error) => {
        this.errorMessage = 'Failed to load routes. Please try again later.';  
      }
    );
  }

  viewRoute(id: number): void {
    this.routeService.getRoute(id).subscribe((data) => {
      this.selectedRoute = data;
      this.router.navigate(['/admin/routedetail', id]);
    });
  }

  createRoute(): void {
    this.routeService.createRoute(this.newRoute).subscribe(() => {
      this.loadRoutes();  
      this.newRoute = {
        id: 0,
        startingPlace: '',
        destinationPlace: '',
        distance: 0,
        priceRoute: 0,
        staffId: 0,
        staffName: '',
        staffEmail: ''
      }; 
    });
  }

  updateRoute(): void {
    if (this.selectedRoute) {
      this.routeService.updateRoute(this.selectedRoute.id, this.selectedRoute).subscribe(() => {
        this.loadRoutes();
        this.selectedRoute = null;
      });
    }
  }

  deleteRoute(id: number): void {
    this.routeService.deleteRoute(id).subscribe(() => {
      this.loadRoutes();  
    });
  }

  editRoute(route: RouteDTO): void {
    this.selectedRoute = { ...route }; 
    this.router.navigate(['/admin/editroute', route.id]);
  }

  searchRoutes(): void {
    this.currentPage = 1;  
    this.loadRoutes();     
  }
  
  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.loadRoutes();  // Tải lại danh sách tuyến đường cho trang mới
  }

  detailRoute(id: number): void {
    this.viewRoute(id); 
  }
}
