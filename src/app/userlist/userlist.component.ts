import { Component } from '@angular/core';
import { UserService } from '../UserService/user.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';







@Component({
  selector: 'app-userlist',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './userlist.component.html',
  styleUrl: './userlist.component.css'
})
export class UserlistComponent {


  constructor(private userService :UserService,private router:Router){}

 UserListData: any = [];
 ngOnInit(): void {
  this.GetUserData();
 }
 
GetUserData(): void {
  this.userService.GetAllUserData().subscribe({
    next: (res: any) => {
      this.UserListData = res;
    },
    error: (err: any) => {
      console.error(err);
    },
    complete: () => {
      console.log("EveryThing is done");
    }
  });
}
trackById(index: number, user: any): any {
  return user.id || index; // Return a unique identifier if available; fallback to index.
}


viewUser(userId: any) {
  debugger
  this.router.navigate(['/view-user', userId]); // Pass user ID as a parameter
}


editUser(id: number): void {
  console.log('Editing user:', id);
  this.router.navigate(['AddEditUser', id]); // Pass the ID in the route
}




deleteUser(id: any, index: number) {
  const confirmation = confirm('Are you sure you want to delete this product?');
  if (confirmation) {
    this.userService.Deleteuserdata(id).subscribe({
      next: (res: any) => {
        console.log('Product deleted successfully', res);
        this.UserListData.splice(index, 1);
        this.GetUserData();
      },
      error: (err: any) => {
        console.log('Error while deleting product', err);
      },
      complete() {
        console.log('Product deleted successfully');
      },
    });
  }
}


}
