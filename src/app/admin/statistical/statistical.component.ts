import { Component, OnInit, ViewChild } from '@angular/core';
import { NgChartsModule, BaseChartDirective } from 'ng2-charts';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChartData, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-statistical',
  standalone: true,
  imports: [NgChartsModule, CommonModule, HttpClientModule, FormsModule],
  templateUrl: './statistical.component.html',
  styleUrls: ['./statistical.component.css']
})
export class StatisticalComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  pieChartData: ChartData<'pie'> = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#FF9F40'],
        hoverBackgroundColor: ['#FF3D6E', '#2188D9', '#FFB434', '#35B2B4', '#FF944D'],
      }
    ]
  };

  routeData: any[] = []; // Lưu trữ thông tin các tuyến đường
  bookingData: any[] = []; // Lưu trữ thông tin các đặt chỗ
  userBookingStats: Record<string, number> = {}; // Thống kê số lượng đặt cho từng người dùng

  chartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'left',
        labels: {
          usePointStyle: true,
          boxWidth: 10,
        }
      }
    }
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any>('https://localhost:44311/api/Routes').subscribe(routeResponse => {
      this.routeData = routeResponse || []; 

      this.http.get<any>('https://localhost:44311/api/Schedules?page=0&pageSize=0').subscribe(response => {
        const schedules = response.schedules || [];
        if (schedules.length === 0) {
          return;
        }

        const routeCounts: Record<string, number> = {};
        schedules.forEach((item: any) => {
          const route = item.routeId;
          routeCounts[route] = (routeCounts[route] || 0) + 1;
        });

        this.pieChartData.labels = Object.keys(routeCounts).map(routeId => {
          const route = this.routeData.find(r => r.id === +routeId);
          return route ? `${route.startingPlace} - ${route.destinationPlace}` : `Tuyến không xác định (${routeId})`;
        });

        this.pieChartData.datasets[0].data = Object.values(routeCounts);

        if (this.chart) {
          this.chart.update();
        }
      });

      
    this.http.get<any>('https://localhost:44311/api/Bookings?page=0&pageSize=0').subscribe(bookingResponse => {
      this.bookingData = bookingResponse.bookings || [];

     this.userBookingStats = this.bookingData.reduce((stats: Record<string, number>, booking: any) => {
      const userName = booking.name;
     stats[userName] = (stats[userName] || 0) + 1;
     return stats;
      }, {});

this.userBookingStats = Object.entries(this.userBookingStats)
  .sort((a, b) => b[1] - a[1]) // Sắp xếp giảm dần theo số lượng ghế đặt
  .slice(0, 3) // Lấy ba người đầu tiên
  .reduce((result: Record<string, number>, [name, count]) => {
    result[name] = count; // Gán giá trị cho đối tượng result
    return result;
  }, {} as Record<string, number>); // Khai báo kiểu cho đối tượng result

    });
  });
}

  get isPieChartDataValid(): boolean {
    return (
      this.pieChartData.labels!.length > 0 && 
      this.pieChartData?.datasets?.length > 0 && 
      this.pieChartData?.datasets[0]?.data?.length > 0
    ) ?? false;
  }

  // Thêm phương thức objectKeys
  objectKeys(obj: any): string[] {
    return Object.keys(obj);
  }
}
