import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, pipe, tap } from 'rxjs';
import { AuthResponse } from '../models/authresponse';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})  

export class Auth {
    private apiUrl = 'https://localhost:7193/api/Auth';

    private currentUserSubject = new BehaviorSubject<string | null>(null); //BehaviorSubject to hold the current user state and notify the subscriber when the user state changes
    currentUser$ = this.currentUserSubject.asObservable();

    constructor(private http: HttpClient, private router: Router) {
        //const token=localStorage.getItem('token');
        if(this.isAuthenticated()){
            this.currentUserSubject.next('user'); // You can replace 'user' with actual user info if available
        }
     }

  login(credentials: User): Observable<AuthResponse>//An Observable represents a value that may arrive later.
  {
        return this.http.post<AuthResponse>(this.apiUrl+'/Login', credentials)
          .pipe( //pipe is used to combine multiple operations on the observable stream. In this case, we are using the tap operator to perform a side effect when the observable emits a value.(A side effect is work performed in addition to returning the response, such as)
          //pipe() gives you a chance to do something with the response before it reaches the subscriber see below.
          //normal flow: API call -> response -> subscriber/component.
          //pipe() flow: API call -> response -> pipe() -> subscriber/component.
            tap((response)=>{
                localStorage.setItem('token', response.token);
                this.currentUserSubject.next('user'); // You can replace 'user' with actual user info if available
            })
        )
    }

    register(user: User): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(this.apiUrl+'/Register', user)
        .pipe(
            tap((response)=>{
                localStorage.setItem('token', response.token);
                this.currentUserSubject.next('user'); // You can replace 'user' with actual user info if available
            })
        )
    }

    logout(): void {
        localStorage.removeItem('token');
        this.currentUserSubject.next(null);
        this.router.navigate(['/login']);
    }

    isAuthenticated(): boolean {
        const token = localStorage.getItem('token');
        if(!token){
            return false;
        }
        try{
            const decodedToken: any = jwtDecode(token);
            const currentTime = Date.now() / 1000; // Convert to seconds
            if(decodedToken.exp<=currentTime){
                this.logout();
                return false;
            }
            return decodedToken.exp > currentTime;
        }
        catch{
            this.logout();
            return false;
        }
    }

    getToken(): string | null {
        return localStorage.getItem('token');
    }
}
