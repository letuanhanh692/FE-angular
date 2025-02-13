import { UserService } from './../../../service/user.service';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserDTO } from '../listuser/user.model';
@Component({
  selector: 'app-userdetail',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './userdetail.component.html',
  styleUrl: './userdetail.component.css'
})
export class UserdetailComponent {
  user: UserDTO | null = null;
  loading: boolean = true;
  error: string = '';

  constructor(private userService: UserService, private activatedRoute: ActivatedRoute,private router: Router) {}

  ngOnInit(): void {
    const userId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    if (userId) {
      this.userService.getUserById(userId).subscribe(
        (data) => {
          this.user = data;
          this.loading = false;
        },
        (error) => {
          this.error = 'Failed to load user details';
          this.loading = false;
        }
      );
    } else {
      this.error = 'Invalid user ID';
      this.loading = false;
    }
    
  }
  onCancel(): void {
    this.router.navigate(['/admin/route']);
  }
}
