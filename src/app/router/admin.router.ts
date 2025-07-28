import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/server';

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) { }

  canActivate(): boolean {
    const user = this.auth.getCurrentUser();
    if (user?.role === 'admin') {
      return true;
    }
    // Không phải admin → chuyển về client
    this.router.navigate(['/']);
    return false;
  }
}
