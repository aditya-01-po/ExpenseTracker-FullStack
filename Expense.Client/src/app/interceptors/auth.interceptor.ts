import { HttpErrorResponse, HttpInterceptor, HttpInterceptorFn, HttpResponse } from "@angular/common/http";
import { Auth } from "../services/auth";
import { inject } from "@angular/core";
import { catchError, throwError } from "rxjs";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const authService = inject(Auth);
    const token = authService.getToken();
    if (token) {
        req = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
    }
    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {
            if (error.status === 401) {
                authService.logout();
            }
            return throwError(() => error);
        })
    );
}