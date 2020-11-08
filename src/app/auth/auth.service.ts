import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable, throwError as  observableThrowError} from 'rxjs';
import { Role } from './role.enum';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { catchError, map } from 'rxjs/operators';
import jwt_decode from 'jwt-decode';
import {transformError} from '../common/common';
//import * as jwt_decode from 'jwt-decode'; //versiones 2.* 


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  


  private readonly authProvider: ( email: string, password: string ) => Observable<IServerAuthResponse>;
  authStatus = new BehaviorSubject<IAuthStatus>(defaltAuthStatus);
  
  constructor(private httpClient : HttpClient)
  {
    this.authProvider = this.userAuthProvider;
  }

  private userAuthProvider( email: string, password: string ): Observable<IServerAuthResponse> {
    return this.httpClient.post<IServerAuthResponse>(`${environment.urlService}/token`, {email: email, password: password});
  }

  

  login(email: string, password: string): Observable<IAuthStatus>
  {
    this.logout();
    
    const loginResponse = this.authProvider(email, password).pipe(
      map(value => {
        const result = jwt_decode(value.access_Token);
     
        return result as IAuthStatus;
     
      }),
      catchError(transformError)
      
      );
      loginResponse.subscribe(
        res => {
          this.authStatus.next(res);
        },
        err => {
          this.logout;
          return observableThrowError(err);
        }
      );
      return loginResponse;
    /*  if(loginResponse != null)
        console.log("Error")
      return loginResponse;
    */
  }
  
  logout()
  {
    this.authStatus.next(defaltAuthStatus);
  }
}


export interface IAuthStatus{
  role: Role;
  primarysid: number;
  unique_name: string;
}

//Capturar la propiedad del response
interface IServerAuthResponse {
  access_Token: string;
}

const defaltAuthStatus: IAuthStatus = { role: Role.None, primarysid: null, unique_name: null }