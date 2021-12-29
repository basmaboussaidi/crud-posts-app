import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

import{ UserService} from '../api/user.service';
import{ User} from '../models/User';
import { PostDialogComponent } from '../post-dialog/post-dialog.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  toastr: any;

 
  

  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService) {}

  registerForm: FormGroup;
  submitted = false;
  loading = false;

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      fullname: ['', Validators.required],
      email: ['', [Validators.required,Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
      });
  }

  get fval() { return this.registerForm.controls; }

  register() {
    this.submitted = true;
  // return for here if form is invalid
  if (this.registerForm.invalid) {
    return;
  }
  this.loading = true;
  this.userService.addUser(this.registerForm.value).subscribe(
  (data)=>{
  alert('User Registered successfully!!');
  this.router.navigate(['/login']);
  },
  (error)=>{
  this.toastr.error(error.error.message, 'Error');
  this.loading = false;
}
)
 
}
 
}

