import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/server';

@Injectable({ providedIn: 'root' })
export class ClientGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) { }

  canActivate(): boolean {
    const user = this.auth.getCurrentUser();
    if (user?.role === 'client') {
      return true;
    }
    // Không phải client → chuyển về admin hoặc login
    this.router.navigate(['/admin']);
    return false;
  }
}
