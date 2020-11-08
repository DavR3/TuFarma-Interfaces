import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { AuthService } from '../auth/auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginError = '';
  hide = true;
  loginForm: FormGroup; 

  email = new FormControl('', [
   Validators.required,
   Validators.email
  ]);
  

  constructor(private fb: FormBuilder, private authService: AuthService, private router : Router) { }

  ngOnInit(): void {
    this.buildLoginForm();
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
  login(submittedForm: FormGroup){
    //debugger;
    //console.log("ok");
    this.authService.login(submittedForm.value.email , submittedForm.value.password ).
    subscribe(authResponse => {
      this.router.navigate(['/home']);
      //debugger;
    }, error => this.loginError = error);
  }

  //validacion del formulario
  buildLoginForm(): void{
    this.loginForm = this.fb.group({
      email: ['',[Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]]
    }) ;
  }

}
