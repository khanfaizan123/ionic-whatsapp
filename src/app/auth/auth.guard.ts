import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { catchError, map, Observable, of, switchMap, take } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth:AuthService,private router:Router){

  }

  canActivate(): Observable<boolean> {
    return this.auth.isLoggedIn().pipe(
      take(1),
      switchMap(isLoggedIn => {
        if (isLoggedIn) {
          return of(true);
        } else {
          this.router.navigate(['/login']);
          return of(false);
        }
      }),
      catchError(() => {
        this.router.navigate(['/login']);
        return of(false);
      })
    );
  }
  
}
