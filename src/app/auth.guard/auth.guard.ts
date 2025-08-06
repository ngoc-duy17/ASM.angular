import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/server'; // Đường dẫn có thể là '../services/auth.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): boolean {
    // Nếu người dùng đã đăng nhập (authenticated), cho phép truy cập
    if (this.authService.isAdminLoggedIn()) {
      return true;
    } else {
      // Ngược lại, điều hướng về trang "access-denied"
      this.router.navigate(['/access-denied']);
      return false;
    }
  }
}
