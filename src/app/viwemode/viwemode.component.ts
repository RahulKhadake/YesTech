import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../UserService/user.service';

@Component({
  selector: 'app-viwemode',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './viwemode.component.html',
  styleUrl: './viwemode.component.css'
})
export class ViwemodeComponent {
  userId: any; // Store the ID from the route
  userData: any 





  constructor(
    private route: ActivatedRoute,
    private router:Router,
    private userService: UserService // Assuming you have a service for user data
  ) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');
    this.fetchUserData(this.userId);
  }

  fetchUserData(id: number): void {
    this.userService.getUserById(id).subscribe({
      next: (data:any) => {
        this.userData = data; // Assign fetched data to `userData`
        console.log('Fetched user data:', this.userData);
      },
      error: (error:any) => {
        console.error('Error fetching user data:', error);
      },
    });
  }
  cancelView()
  {
       this.router.navigateByUrl("Userlist");
  }
}
