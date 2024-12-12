import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../UserService/user.service';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'; // Import FormsModule

@Component({
  selector: 'app-addedit-user',
  standalone: true,
  imports: [FormsModule , CommonModule,ReactiveFormsModule],
  templateUrl: './addedit-user.component.html',
  styleUrl: './addedit-user.component.css'
})
export class AddeditUserComponent {
  isViewMode : boolean=false; 
  contactPersonsList: any[] = [];
  contactForm!: FormGroup;
  isEditMode: boolean = false;
  userId: any; // Store the ID from the route
  userData: any ; // Store fetched user data
  successMessage: string = '';
  constructor(
    private route: ActivatedRoute, private router:Router, private fb: FormBuilder,
    
    private userService: UserService // Service to fetch user data
  ) {
    this.contactForm = this.fb.group({
      contactPersons: this.fb.array([]) // Initialize an empty FormArray
    });
  }

 // Getter for the contactPersons FormArray
 get contactPersons(): FormArray {
  return this.contactForm.get('contactPersons') as FormArray;
}

// Add a new contact person to the FormArray
addContactPerson(): void {
  const contactGroup = this.fb.group({
    personName: ['', Validators.required],
    mobile: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    department: ['', Validators.required],
    designation: ['', Validators.required]
  });

  this.contactPersons.push(contactGroup); // Push the new FormGroup into the FormArray
}

// Remove a contact person from the FormArray
removeContactPerson(index: number): void {
  this.contactPersons.removeAt(index);
}

 // Submit the form and display data in a table
 onSubmit(): void {
  if (this.editingIndex !== null) {
    // Edit the existing contact
    this.contactPersonsList[this.editingIndex] = this.contactPersons.value[0];
    this.editingIndex = null;
  } else {
    // Add new contact to the table
    this.contactPersonsList.push(this.contactPersons.value[0]);
  }

  // Optionally, clear the form after submission if needed
  this.contactForm.reset();
  // this.addContactPerson(); 
}

isFormAdded: boolean = false;  // Flag to check if form is already added
editingIndex: number | null = null; // Track which contact is being edited
// Edit an existing contact
editContact(index: number): void {
  const contact = this.contactPersonsList[index];
  this.editingIndex = index;
  this.contactPersons.at(0).patchValue(contact); // Populate the form with the selected contact data
}

// Delete an existing contact
deleteContact(index: number): void {
  this.contactPersonsList.splice(index, 1); // Remove from the list
}
 
  ngOnInit(): void {
  
    this.userId = this.route.snapshot.paramMap.get('id');
    
    // Check if the ID is not '0' and set isEditMode accordingly
    if (this.userId && this.userId !== '0') {
      this.isEditMode = true;
      this.fetchUserData(this.userId);
    } else {
      this.isEditMode = false;
      this.initializeUserData();
    }
  }

  // Initialize user data for Add mode
  initializeUserData(): void {
    this.userData = {
      gstNo: '',
      panNo: '',
      name: '',
      address: '',
      code: '',
      country: '',
      pincode: '',
      latitude: '',
      longitude: '',
      mobile: '',
      email: '',
      currency: '',
    };
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
 

  Cancel()
  {
    this.router.navigate(['/Userlist']);
  }

  // Save or Update user based on mode
  onSave(): void {
    if (this.isEditMode) {
      // Update user if in Edit mode
      this.userService.UpdateUser(this.userId, this.userData).subscribe({
        next: (response:any) => {
          console.log('User updated successfully:', response);
          this.successMessage = 'User updated successfully';
          alert("User updated successfully ")
          this.router.navigate(['/Userlist']); // Navigate to the user list or another view
        },
        error: (error:any) => {
          console.error('Error updating user:', error);
        }
      });
    } else {
      // Save new user if in Save mode
      this.userService.postuserAPI(this.userData).subscribe({
        next: (response) => {
          console.log('User saved successfully added:', response);
          this.successMessage = 'User saved successfully';  // Success message
          alert("User saved successfully");
          this.router.navigate(['/Userlist']); // Navigate to the user list or another view
        },
        error: (error) => {
          console.error('Error saving user:', error);
        }
      });
    }
  }

 


}

  