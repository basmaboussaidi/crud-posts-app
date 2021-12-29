import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import{ UserService} from '../api/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  toastr: any;
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router , private http: HttpClient, private userService: UserService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      fullName:['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
      });
  }
  get fval() { return this.loginForm.controls; }


  signIn() {
    this.submitted = true;
  // return for here if form is invalid
  if (this.loginForm.invalid) {
    return;
  }
  this.loading = true;
  this.userService.addUser(this.loginForm.value).subscribe(
  (data)=>{
  alert(' successfully logged in!!');
  this.router.navigate(['']);
  },
  (error)=>{
  this.toastr.error(error.error.message, 'Error');
  this.loading = false;
}
)
 
}

 
}



