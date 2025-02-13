import { Component, OnInit } from '@angular/core';
import { RouteDTO, RouteService } from '../../../service/route.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-routedetail',
  standalone: true,
  imports: [FormsModule,HttpClientModule,CommonModule],
  templateUrl: './routedetail.component.html',
  styleUrl: './routedetail.component.css'
})
export class RoutedetailComponent  implements OnInit{
  route: RouteDTO = {
    id: 0,
    startingPlace: '',
    destinationPlace: '',
    distance: 0,
    priceRoute: 0,
    staffId: 0,
    staffName: '',
    staffEmail:''
  };

  errorMessage = '';

  constructor(
    private routeService: RouteService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const routeId = this.activatedRoute.snapshot.paramMap.get('id');
    if (routeId) {
      this.loadRouteDetails(routeId);
    }
  }

  loadRouteDetails(id: string): void {
    this.routeService.getRoute(Number(id)).subscribe(
      (route: RouteDTO) => {
        this.route = route;
      },
      (error) => {
        this.errorMessage = 'Failed to load route details';
      }
    );
  }

  onCancel(): void {
    this.router.navigate(['/admin/route']);
  }
}
