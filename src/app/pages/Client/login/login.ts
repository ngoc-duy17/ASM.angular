import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/server';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  email = '';
  password = '';

  constructor(private auth: AuthService, private router: Router) { }

  onLogin() {
    this.auth.login(this.email, this.password).subscribe(success => {
      if (success) {
        alert('Đăng nhập thành công');
        const user = this.auth.getCurrentUser();
        if (user?.role === 'admin') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/']);
        }
      } else {
        alert('Email hoặc mật khẩu không đúng');
      }
    });
  }

}
