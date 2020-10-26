import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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
  

  constructor(private fb: FormBuilder) { }

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
    debugger;
  }

  //validacion del formulario
  buildLoginForm(): void{
    this.loginForm = this.fb.group({
      correo: ['',[Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]]
    }) ;
  }

}
