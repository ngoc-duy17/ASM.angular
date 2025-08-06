import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/server';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  email = '';
  password = '';
  error = '';

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit() {
    this.authService.login(this.email, this.password).subscribe({
      next: (response: any) => {
        if (response && response.accessToken) {
          localStorage.setItem('client_token', response.accessToken);
          this.router.navigate(['/']);
        } else {
          this.error = 'Đăng nhập thất bại!';
        }
      },
      error: (err) => {
        this.error = 'Sai tài khoản hoặc mật khẩu!';
        console.error(err);
      }
    });
  }
}
