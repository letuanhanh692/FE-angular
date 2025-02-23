import { TripService } from './../../../service/trip.service';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-triplist',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './triplist.component.html',
  styleUrls: ['./triplist.component.css']
})
export class TripListComponent {
  trips: any[] = [];
  filteredTrips: any[] = [];
  searchData: any = {};

  busTypes = [
    { id: 1, typeName: "Express" },
    { id: 2, typeName: "Luxury" },
    { id: 3, typeName: "Volvo Non A/C" },
    { id: 4, typeName: "Volvo A/C" }
  ];
  selectedBusType: string = '';
  sortCriteria: string = 'timeAsc';

  constructor(
    private TripService: TripService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.searchData = params;
      this.loadTrips();
    });
  }

  loadTrips() {
    if (this.searchData.startingPlace && this.searchData.destinationPlace) {
      this.TripService.searchTrips(this.searchData).subscribe(
        (response) => {
          console.log('Dữ liệu chuyến đi:', response);
          if (Array.isArray(response) && response.length > 0) {
            const currentTime = new Date(); // Lấy thời gian hiện tại

            // Lọc chỉ lấy các chuyến có thời gian khởi hành từ hiện tại trở về sau
            this.trips = response
            .filter(trip => new Date(trip.departureTime) >= currentTime)
            .map(trip => ({
              ...trip,
              departureTime: new Date(trip.departureTime), // 👉 Chuyển sang Date object
              imageBus: trip.imageBus || 'assets/default-bus.jpg'
            }));


            this.filteredTrips = [...this.trips];
            this.applyFilters();
          } else {
            this.trips = [];
            this.filteredTrips = [];
          }
        },
        (error) => {
          console.error('Lỗi khi lấy dữ liệu chuyến đi', error);
        }
      );
    }
  }


  applyFilters(): void {
    this.filteredTrips = this.trips.filter(trip =>
      this.selectedBusType ? trip.busType === this.selectedBusType : true
    );
    this.sortTrips();
  }

  sortTrips(): void {
    this.filteredTrips.sort((a, b) => {
      switch (this.sortCriteria) {
        case 'timeAsc':
          return new Date(a.departureTime).getTime() - new Date(b.departureTime).getTime();
        case 'timeDesc':
          return new Date(b.departureTime).getTime() - new Date(a.departureTime).getTime();
        case 'priceAsc':
          return a.price - b.price;
        case 'priceDesc':
          return b.price - a.price;
        default:
          return 0;
      }
    });
  }


  viewTripDetail(tripId: number) {
    this.router.navigate([`/user/tripdetail/${tripId}`]);
  }
}
